import { expect, test } from "@playwright/test";

test("3D surfaces respond to a mouse, stay static on touch and preserve links", async ({ page, isMobile }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const scene = page.locator(".hero-depth");
    const surface = scene.locator(":scope > .depth-surface");
    await expect(scene).toHaveAttribute("data-depth-motion", isMobile ? "static" : "enabled");
    const initialTransform = await surface.evaluate((element) => getComputedStyle(element).transform);
    const bounds = (await scene.boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.25);

    if (isMobile) {
        await expect(scene).toHaveAttribute("data-depth-active", "false");
        expect(await surface.evaluate((element) => getComputedStyle(element).transform)).toBe(initialTransform);
    } else {
        await expect(scene).toHaveAttribute("data-depth-active", "true");
        await expect.poll(() => surface.evaluate((element) => getComputedStyle(element).transform)).not.toBe(initialTransform);
        await page.screenshot({ path: testInfo.outputPath("hero-3d-hover.png") });
        await page.mouse.move(5, 5);
        await expect(scene).toHaveAttribute("data-depth-active", "false");
        await expect.poll(() => surface.evaluate((element) => getComputedStyle(element).transform)).toBe(initialTransform);
    }

    const link = scene.getByRole("link", { name: /Financial RAG API/ });
    await link.focus();
    await expect(link).toBeFocused();
    await expect(scene).toHaveAttribute("data-depth-active", "false");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/projects/financial-rag/");
    await page.goto("/");
    await page.locator(".project-card").first().getByRole("link", { name: "Read case study" }).click();
    await expect(page).toHaveURL("/projects/financial-rag/");
});

test("reduced-motion changes cancel tilt immediately and keep content usable", async ({ page, isMobile }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const scene = page.locator(".hero-depth");
    const surface = scene.locator(":scope > .depth-surface");
    await expect(scene).toHaveAttribute("data-depth-motion", isMobile ? "static" : "enabled");
    const initialTransform = await surface.evaluate((element) => getComputedStyle(element).transform);
    const bounds = (await scene.boundingBox())!;
    await page.mouse.move(bounds.x + bounds.width * 0.7, bounds.y + bounds.height * 0.2);
    if (!isMobile) await expect(scene).toHaveAttribute("data-depth-active", "true");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(scene).toHaveAttribute("data-depth-motion", "static");
    await expect(scene).toHaveAttribute("data-depth-active", "false");
    await page.mouse.move(bounds.x + bounds.width * 0.25, bounds.y + bounds.height * 0.75);
    await expect.poll(() => surface.evaluate((element) => getComputedStyle(element).transform)).toBe(initialTransform);
    await expect(page.locator(".depth-hint")).not.toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("AI Engineer.");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("hero-3d-reduced-motion.png") });

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(scene).toHaveAttribute("data-depth-motion", isMobile ? "static" : "enabled");
});

test("layered cards remain navigable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3210/");
    await expect(page.locator(".hero-depth")).toHaveAttribute("data-depth-motion", "static");
    await expect(page.locator(".depth-hint")).not.toBeVisible();
    const card = page.locator(".project-card").first();
    await card.getByRole("link", { name: "Read case study" }).click();
    await expect(page).toHaveURL("http://127.0.0.1:3210/projects/financial-rag/");
    await expect(page.locator("#problem")).toBeVisible();
    await context.close();
});

test("3D layers fit narrow and tablet layouts even at the edge of a tilt", async ({ page, isMobile }, testInfo) => {
    for (const width of [320, 768, 1024]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/es/");
        const scene = page.locator(".hero-depth");
        await expect(scene).toHaveAttribute("data-depth-motion", isMobile ? "static" : "enabled");
        await scene.evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
        // Let the scroll event reset the surface before starting a new pointer interaction.
        await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        const bounds = (await scene.boundingBox())!;
        await page.mouse.move(bounds.x + bounds.width * 0.95, bounds.y + bounds.height * 0.1);
        await expect(scene).toHaveAttribute("data-depth-active", isMobile ? "false" : "true");
        await scene.locator(":scope > .depth-surface").evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.screenshot({ path: testInfo.outputPath(`depth-${width}px.png`) });
    }
});
