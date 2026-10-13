import { expect, test } from "@playwright/test";

const slugs = ["financial-rag", "code-review-agent", "opencode-voice-input", "synthetic-face-detector", "trilinea"];

test("home presents the agreed positioning and real project routes in both languages", async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [path, locale] of [["/", "en"], ["/es/", "es"]]) {
        await page.goto(path);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI Engineer.");
        await expect(page.locator(".project-card")).toHaveCount(3);
        await expect(page.locator(".project-card h3")).toHaveText(locale === "en"
            ? ["Financial RAG API", "Code Review Agent", "OpenCode Voice Input"]
            : ["API RAG financiera", "Code Review Agent", "OpenCode Voice Input"]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await expect(page.locator(".project-card a[href*='/projects/']").first()).toBeVisible();
        for (const image of await page.locator("main img").all()) {
            await image.scrollIntoViewIfNeeded();
            await expect(image).toBeVisible();
            await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
        }
        await page.locator("#about").screenshot({ path: testInfo.outputPath(`about-${locale}.png`) });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.screenshot({ path: testInfo.outputPath(`home-${locale}.png`), fullPage: true });
    }
    expect(errors).toEqual([]);
});

test("case studies survive direct visits and language switches preserve the project", async ({ page }, testInfo) => {
    for (const slug of slugs) {
        const response = await page.goto(`/projects/${slug}/`);
        expect(response?.status()).toBe(200);
        await expect(page.locator(".xyz-section > div")).toHaveCount(3);
        await expect(page.locator(".system-details details")).toHaveCount(4);
        await expect(page.locator("#problem")).toBeVisible();
        if (slug === "financial-rag" || slug === "code-review-agent") {
            await page.locator(".case-cover").screenshot({ path: testInfo.outputPath(`${slug}-visual.png`) });
        }
        await page.getByRole("link", { name: "Cambiar a español" }).click();
        await expect(page).toHaveURL(`/es/projects/${slug}/`);
        await expect(page.locator("html")).toHaveAttribute("lang", "es");
        await expect(page.locator("#problem")).toHaveText("El problema");
        await page.reload();
        await expect(page.locator(".case-header h1")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        if (slug === slugs[0]) await page.screenshot({ path: testInfo.outputPath("case-study.png"), fullPage: true });
        if (slug === "synthetic-face-detector") {
            await expect(page.getByText("Repositorio privado", { exact: true })).toBeVisible();
            await expect(page.locator(".case-links a")).toHaveCount(0);
        }
    }
});

test("new cases link to their real source repositories and the full catalog retains earlier work", async ({ page, request }, testInfo) => {
    const repositories = {
        "financial-rag": "https://github.com/IamAndrew25/ET-JAI-ORX-Andres-Obispo-Calla",
        "code-review-agent": "https://github.com/IamAndrew25/Code-review-agent",
    };
    for (const locale of ["en", "es"]) {
        const prefix = locale === "es" ? "/es" : "";
        await page.goto(`${prefix}/projects/`);
        await expect(page.locator(".project-card")).toHaveCount(5);
        for (const [slug, repo] of Object.entries(repositories)) {
            await page.goto(`${prefix}/projects/${slug}/`);
            await expect(page.locator(".case-links a")).toHaveCount(1);
            await expect(page.locator(".case-links a")).toHaveAttribute("href", repo);
            expect((await request.get(`/social/${slug}.png`)).status()).toBe(200);
            if (slug === "code-review-agent") {
                await expect(page.locator(".case-kicker .status")).toHaveText(locale === "es" ? "En progreso" : "In progress");
            }
        }
    }
    await page.goto("/projects/");
    await page.screenshot({ path: testInfo.outputPath("project-catalog.png"), fullPage: true });
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const slug of Object.keys(repositories)) expect(sitemap).toContain(`/es/projects/${slug}/`);
});

test("the architecture explorer works with keyboard and JavaScript disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3210/projects/opencode-voice-input/");
    const stages = page.locator(".system-details details");
    await expect(stages.nth(0)).toHaveAttribute("open", "");
    await stages.nth(2).locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(stages.nth(2)).toHaveAttribute("open", "");
    await expect(stages.nth(0)).not.toHaveAttribute("open");
    await expect(stages.nth(2).getByRole("link", { name: "See implementation" })).toHaveAttribute("href", /groq-stt.ts$/);
    await page.getByRole("link", { name: "Cambiar a español" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("#validation")).toBeVisible();
    await context.close();
});

test("résumé is printable and unknown routes have a real 404", async ({ page }, testInfo) => {
    for (const [path, locale] of [["/resume/", "en"], ["/es/resume/", "es"]]) {
        await page.goto(path);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Andrés Alexander Obispo Calla");
        await expect(page.getByRole("heading", { name: "Universidad Tecnológica del Perú" })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`resume-${locale}.png`), fullPage: true });
        await page.emulateMedia({ media: "print" });
        await expect(page.locator(".site-header")).not.toBeVisible();
        await expect(page.locator(".resume-sheet")).toBeVisible();
        if (testInfo.project.name === "desktop") await page.pdf({ path: testInfo.outputPath(`resume-${locale}.pdf`), format: "A4" });
        await page.emulateMedia({ media: "screen" });
    }
    const response = await page.goto("/projects/does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Back to home", exact: true })).toBeVisible();
});

test("language metadata, preview indexing and social assets are consistent", async ({ page, request }) => {
    await page.goto("/es/projects/opencode-voice-input/");
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/es\/projects\/opencode-voice-input\/$/);
    await expect(page.locator("link[hreflang='en']")).toHaveAttribute("href", /\/projects\/opencode-voice-input\/$/);
    await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", /noindex/);
    const image = await page.locator("meta[property='og:image']").getAttribute("content");
    expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(await sitemap.text()).toContain("/es/projects/trilinea/");
});
