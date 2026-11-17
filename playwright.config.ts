import { defineConfig, devices } from "@playwright/test";
import { BASE, E2E_PORTS } from "./tests/e2e/ports";

/**
 * End-to-end and accessibility tests against a production build (scripts/e2e-server.ts builds it, starts a
 * disposable Postgres and serves the build three ways). Chromium at desktop and phone sizes.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE,
    trace: "retain-on-failure",
    locale: "bg-BG",
    timezoneId: "Europe/Sofia",
  },
  // Every test runs on desktop; tests tagged @phone also run on a phone, @phone-only only there.
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      grepInvert: /@phone-only/,
    },
    { name: "phone", use: { ...devices["Pixel 7"] }, grep: /@phone/ },
  ],
  webServer: {
    command: "pnpm exec tsx scripts/e2e-server.ts",
    url: `http://127.0.0.1:${E2E_PORTS.ready}`,
    timeout: 600_000,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
    gracefulShutdown: { signal: "SIGTERM", timeout: 10_000 },
  },
});
