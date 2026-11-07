import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import * as schema from "@/db/schema";
import { getServerEnv } from "@/lib/config/env";

export type Db = NodePgDatabase<typeof schema>;

export type DbHandle = { db: Db; pool: Pool };

/**
 * A small pool: serverless instances each hold their own, so keep it tight and
 * fail fast when the database is unreachable (the form must then show an error,
 * never a success).
 */
export function createDb(connectionString: string, overrides: Partial<PoolConfig> = {}): DbHandle {
  const pool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
    query_timeout: 10_000,
    statement_timeout: 10_000,
    application_name: "hera-site",
    ...overrides,
  });
  // An idle client losing its connection must not crash the process; the next
  // query reconnects or fails, and that failure is handled by the caller.
  pool.on("error", () => {});
  return { db: drizzle(pool, { schema }), pool };
}

const globalForDb = globalThis as unknown as { __heraDb?: DbHandle };

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured");
    this.name = "DatabaseNotConfiguredError";
  }
}

/** The process-wide database handle (cached across dev hot reloads). */
export function getDb(): Db {
  if (!globalForDb.__heraDb) {
    const url = getServerEnv().databaseUrl;
    if (!url) throw new DatabaseNotConfiguredError();
    globalForDb.__heraDb = createDb(url);
  }
  return globalForDb.__heraDb.db;
}

/** Close the process-wide pool (CLI scripts and tests). */
export async function closeDb(): Promise<void> {
  const handle = globalForDb.__heraDb;
  globalForDb.__heraDb = undefined;
  if (handle) await handle.pool.end();
}
