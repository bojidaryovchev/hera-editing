/**
 * Apply pending SQL migrations (src/db/migrations) to DATABASE_URL.
 *   pnpm db:migrate
 */
import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createDb } from "../src/lib/db/client";
import { requireDatabaseUrl } from "./lib/cli";

const { db, pool } = createDb(requireDatabaseUrl(), { max: 1, statement_timeout: 120_000, query_timeout: 120_000 });
try {
  await migrate(db, { migrationsFolder: path.resolve(import.meta.dirname, "../src/db/migrations") });
  console.info("Migrations applied.");
} catch (error) {
  console.error("Migration failed:", (error as Error).message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
