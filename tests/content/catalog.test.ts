import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { test } from "node:test";
import { getProjectBySlug, getPublishedProjects } from "../../src/modules/projects/application/queries";
import { localProjectCatalog } from "../../src/modules/projects/infrastructure/local-project-catalog";
import { voiceProject } from "../../src/content/projects/opencode-voice-input/project";
import type { Project } from "../../src/modules/projects/domain/project";
import { locales, projectPath } from "../../src/shared/i18n/locales";

test("drafts stay out of the catalog and cannot be resolved by a direct slug", async () => {
    const entries: Project[] = [
        { ...voiceProject, slug: "second", order: 2 },
        { ...voiceProject, slug: "unannounced", publication: "draft", order: 0 },
        { ...voiceProject, slug: "first", order: 1, status: "in-progress" },
    ];
    const catalog = { list: async () => entries };
    assert.deepEqual((await getPublishedProjects(catalog)).map(({ slug }) => slug), ["first", "second"]);
    assert.equal(await getProjectBySlug(catalog, "unannounced"), undefined);
    assert.equal(await getProjectBySlug(catalog, "missing"), undefined);
    assert.equal(entries[0].slug, "second", "query must not reorder the source catalog");
    assert.equal((await getProjectBySlug(catalog, "first"))?.status, "in-progress");
});

test("published projects have complete bilingual stories, evidence and unique stable routes", async () => {
    const projects = await getPublishedProjects(localProjectCatalog);
    assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length);
    for (const project of projects) {
        assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert.ok(project.evidence.length > 0);
        assert.equal(new Set(project.stages.map(({ id }) => id)).size, project.stages.length);
        for (const locale of locales) {
            assert.ok(project.title[locale]);
            assert.ok(project.description[locale]);
            for (const value of Object.values(project.xyz)) assert.ok(value[locale]);
            await access(`src/content/projects/${project.slug}/${locale}.mdx`);
        }
        await access(`public/social/${project.slug}.png`);
    }
});

test("private and unpublished code are not exposed as public source URLs", async () => {
    for (const project of await localProjectCatalog.list()) {
        if (project.repository.visibility === "public") {
            assert.equal(new URL(project.repository.url).hostname, "github.com");
        } else {
            assert.ok(!("url" in project.repository));
        }
    }
});

test("localized project links keep the same project identity", () => {
    assert.equal(projectPath("en", "opencode-voice-input"), "/projects/opencode-voice-input/");
    assert.equal(projectPath("es", "opencode-voice-input"), "/es/projects/opencode-voice-input/");
});
