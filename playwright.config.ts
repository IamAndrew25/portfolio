import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: false,
    workers: 1,
    retries: 0,
    reporter: "list",
    use: {
        baseURL: "http://127.0.0.1:3210",
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
    },
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
        { name: "mobile", use: { ...devices["Pixel 7"], defaultBrowserType: "chromium" } },
    ],
    webServer: {
        command: "npm run start -- --hostname 127.0.0.1 --port 3210",
        url: "http://127.0.0.1:3210",
        reuseExistingServer: false,
        timeout: 30000,
    },
});
