/**
 * End-to-end environment for `pnpm test:e2e` (Playwright starts it as its web server):
 *
 *   1. builds the site once into .next-e2e with the test configuration: the clearly fictional portfolio fixtures
 *      (CONTENT_FIXTURES=1, APP_ENV=test) and Google Analytics with a test id behind consent (requests to Google are
 *      answered locally by the tests, nothing leaves the machine);
 *   2. starts a disposable Postgres (embedded, or TEST_DATABASE_URL in CI) and migrates it;
 *   3. serves that build three times with different runtime settings:
 *        :3200  normal: mail to a local outbox folder
 *        :3201  mail provider down (SMTP to a closed port): leads must still be stored, alerts retried later
 *        :3202  database down: the form must say so and never show success
 *   4. answers on :3299 once all three are ready, and writes the database URL to .data/e2e/env.json for the tests.
 *
 * Set E2E_SKIP_BUILD=1 to reuse an existing .next-e2e build.
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { E2E_ADMIN_ENV } from "../tests/e2e/admin-env";
import { E2E_PORTS } from "../tests/e2e/ports";
import { migrateTestDatabase, startTestDatabase } from "../tests/helpers/test-db";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = ".next-e2e";
const STATE = path.join(ROOT, ".data", "e2e");
const OUTBOX = path.join(STATE, "outbox");

const BUILD_ENV = {
  APP_ENV: "test",
  CONTENT_FIXTURES: "1",
  NEXT_DIST_DIR: DIST,
  NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${E2E_PORTS.main}`,
  ANALYTICS_MEASUREMENT_ID: "G-TEST1234",
  ANALYTICS_CONSENT_APPROVED: "true",
  NEXT_TELEMETRY_DISABLED: "1",
};

const children: ChildProcess[] = [];
let stopDatabase: (() => Promise<void>) | null = null;

function run(cmd: string, args: string[], env: Record<string, string>) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    env: { ...process.env, ...env },
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

function build() {
  if (process.env.E2E_SKIP_BUILD === "1" && existsSync(path.join(ROOT, DIST, "BUILD_ID"))) return;
  // One retry: the Next.js CLI may stop a first build to show a notice, and continues on the next run.
  for (let attempt = 1; attempt <= 2; attempt++) {
    if (run("pnpm", ["exec", "next", "build"], BUILD_ENV).status === 0) return;
  }
  throw new Error("The e2e build failed.");
}

function serve(port: number, env: Record<string, string>) {
  const child = spawn("pnpm", ["exec", "next", "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: ROOT,
    env: { ...process.env, ...BUILD_ENV, ...env },
    stdio: ["ignore", "inherit", "inherit"],
    shell: process.platform === "win32",
  });
  children.push(child);
}

async function waitFor(port: number, timeoutMs = 120_000) {
  const until = Date.now() + timeoutMs;
  while (Date.now() < until) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/robots.txt`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server on port ${port} did not start.`);
}

async function shutdown(code = 0) {
  for (const child of children) {
    if (child.pid && !child.killed) {
      if (process.platform === "win32")
        spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
      else child.kill("SIGTERM");
    }
  }
  await stopDatabase?.();
  process.exit(code);
}

async function main() {
  build();
  rmSync(STATE, { recursive: true, force: true });
  mkdirSync(OUTBOX, { recursive: true });

  const database = await startTestDatabase();
  stopDatabase = database.stop;
  await migrateTestDatabase(database.url);
  writeFileSync(path.join(STATE, "env.json"), JSON.stringify({ databaseUrl: database.url, outbox: OUTBOX }, null, 2));

  const common = { DATABASE_URL: database.url, NOTIFICATION_EMAIL_TO: "owner@example.com" };
  // The admin panel and the contact@ mailbox run on the main server only (decision L32).
  serve(E2E_PORTS.main, { ...common, MAIL_PROVIDER: "dev", MAIL_DEV_OUTBOX_DIR: OUTBOX, ...E2E_ADMIN_ENV });
  serve(E2E_PORTS.mailDown, {
    ...common,
    MAIL_PROVIDER: "smtp",
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: "9",
    MAIL_FROM: "site@example.com",
  });
  serve(E2E_PORTS.dbDown, {
    ...common,
    DATABASE_URL: "postgres://postgres:postgres@127.0.0.1:9/unreachable",
    MAIL_PROVIDER: "dev",
    MAIL_DEV_OUTBOX_DIR: OUTBOX,
  });
  await Promise.all([waitFor(E2E_PORTS.main), waitFor(E2E_PORTS.mailDown), waitFor(E2E_PORTS.dbDown)]);

  createServer((_req, res) => res.end("ready")).listen(E2E_PORTS.ready, "127.0.0.1");
  console.log(`e2e servers ready on ${E2E_PORTS.main}, ${E2E_PORTS.mailDown}, ${E2E_PORTS.dbDown}`);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
main().catch(async (error) => {
  console.error(error);
  await shutdown(1);
});
