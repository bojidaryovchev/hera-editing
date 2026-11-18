import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import { BASE, E2E_PORTS } from "../tests/e2e/ports";

/**
 * The keyboard pass of the manual QA record (`pnpm qa:keyboard`, qa/keyboard.qa.ts). It runs against the same
 * servers as the end-to-end tests and reuses their builds, so run `pnpm test:e2e` first. Like the e2e tests, it
 * occupies ports 3200–3203 and 3299 while it runs.
 */
export default defineConfig({
  testDir: ".",
  testMatch: "keyboard.qa.ts",
  timeout: 1_200_000,
  workers: 1,
  reporter: [["list"]],
  use: { ...devices["Desktop Chrome"], baseURL: BASE, locale: "bg-BG", timezoneId: "Europe/Sofia" },
  webServer: {
    command: "pnpm exec tsx scripts/e2e-server.ts",
    cwd: path.resolve(import.meta.dirname, ".."),
    url: `http://127.0.0.1:${E2E_PORTS.ready}`,
    timeout: 600_000,
    reuseExistingServer: false,
    env: { E2E_SKIP_BUILD: "1" },
    stdout: "ignore",
    stderr: "pipe",
    gracefulShutdown: { signal: "SIGTERM", timeout: 10_000 },
  },
});
