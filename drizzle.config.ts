import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
  dbCredentials: {
    // Only used by `drizzle-kit` commands that talk to a database; `generate` does not.
    url: process.env.DATABASE_URL ?? "postgres://localhost:5432/unused",
  },
});
