/**
 * A local Postgres for development, no Docker: an embedded server in .data/pg (kept between runs), migrated, on
 * port 54329 by default. Prints the DATABASE_URL to use with `pnpm dev`. Stop it with Ctrl+C.
 *
 *   pnpm db:dev            # then, in another terminal:
 *   DATABASE_URL=postgres://postgres:postgres@127.0.0.1:54329/hera_dev pnpm dev
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createDb } from "../src/lib/db/client";

const port = Number(process.env.DEV_DB_PORT ?? 54329);
const dir = path.resolve(import.meta.dirname, "../.data/pg");
const url = `postgres://postgres:postgres@127.0.0.1:${port}/hera_dev`;

async function main() {
  const { default: EmbeddedPostgres } = await import("embedded-postgres");
  const fresh = !existsSync(path.join(dir, "PG_VERSION"));
  const pg = new EmbeddedPostgres({ databaseDir: dir, port, user: "postgres", password: "postgres", persistent: true, onLog: () => {} });
  if (fresh) await pg.initialise();
  await pg.start();
  if (fresh) await pg.createDatabase("hera_dev");
  const { db, pool } = createDb(url, { max: 1 });
  await migrate(db, { migrationsFolder: path.resolve(import.meta.dirname, "../src/db/migrations") });
  await pool.end();
  console.log(`Local Postgres ready (${fresh ? "new" : "existing"} data in .data/pg).\nDATABASE_URL=${url}`);
  const stop = async () => {
    await pg.stop();
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
