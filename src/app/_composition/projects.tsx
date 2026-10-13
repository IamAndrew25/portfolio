import { notFound } from "next/navigation";
import { localProjectCatalog } from "@/modules/projects/infrastructure/local-project-catalog";
import { getProjectBySlug, getPublishedProjects } from "@/modules/projects/application/queries";
import { ProjectCaseStudy } from "@/modules/projects/presentation/ProjectCaseStudy";
import type { Locale } from "@/shared/i18n/locales";
import { pageMetadata } from "@/shared/seo/metadata";

export function publishedProjects() {
    return getPublishedProjects(localProjectCatalog);
}

export async function projectParams() {
    return (await publishedProjects()).map(({ slug }) => ({ slug }));
}

export async function caseMetadata(locale: Locale, slug: string) {
    const project = await getProjectBySlug(localProjectCatalog, slug);
    if (!project) notFound();
    return pageMetadata(locale, `/projects/${slug}/`, `${project.title[locale]} — Andres Obispo Calla`, project.description[locale], slug);
}

export async function CaseRoute({ locale, slug }: { locale: Locale; slug: string }) {
    const projects = await publishedProjects();
    const project = projects.find((item) => item.slug === slug);
    if (!project) notFound();
    // Resolve only an allowlisted, published slug. MDX remains a presentation concern.
    const { default: Story } = await import(`@/content/projects/${project.slug}/${locale}.mdx`);
    const index = projects.findIndex((item) => item.slug === slug);
    const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
    return <ProjectCaseStudy project={project} nextProject={next} locale={locale}><Story /></ProjectCaseStudy>;
}
