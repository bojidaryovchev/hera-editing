import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createDb } from "../../src/lib/db/client";

export const MIGRATIONS_FOLDER = path.resolve(import.meta.dirname, "../../src/db/migrations");

export type TestDatabase = { url: string; stop: () => Promise<void> };

async function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

/**
 * A disposable Postgres for tests. With TEST_DATABASE_URL (CI service container)
 * that database is wiped and reused; otherwise an embedded Postgres server is
 * started from npm binaries (no Docker needed) and deleted afterwards.
 */
export async function startTestDatabase(options: { port?: number } = {}): Promise<TestDatabase> {
  const external = process.env.TEST_DATABASE_URL;
  if (external) {
    if (!/test/i.test(new URL(external).pathname)) {
      throw new Error("TEST_DATABASE_URL must point at a database whose name contains 'test' (it is wiped).");
    }
    await resetSchema(external);
    return { url: external, stop: async () => {} };
  }

  const { default: EmbeddedPostgres } = await import("embedded-postgres");
  const port = options.port ?? (await freePort());
  const databaseDir = path.join(tmpdir(), `hera-pg-${randomBytes(6).toString("hex")}`);
  const server = new EmbeddedPostgres({
    databaseDir,
    port,
    user: "postgres",
    password: "postgres",
    persistent: false,
    onLog: () => {},
    onError: () => {},
  });
  await server.initialise();
  await server.start();
  await server.createDatabase("hera_test");
  return {
    url: `postgres://postgres:postgres@127.0.0.1:${port}/hera_test`,
    stop: async () => {
      await server.stop();
    },
  };
}

export async function resetSchema(url: string): Promise<void> {
  const { db, pool } = createDb(url, { max: 1 });
  try {
    await db.execute(sql`drop schema if exists drizzle cascade`);
    await db.execute(sql`drop schema if exists public cascade`);
    await db.execute(sql`create schema public`);
  } finally {
    await pool.end();
  }
}

export async function migrateTestDatabase(url: string): Promise<void> {
  const { db, pool } = createDb(url, { max: 1 });
  try {
    await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
  } finally {
    await pool.end();
  }
}
