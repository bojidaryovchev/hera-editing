import type { TestProject } from "vitest/node";
import { migrateTestDatabase, startTestDatabase } from "./test-db";

declare module "vitest" {
  export interface ProvidedContext {
    databaseUrl: string;
  }
}

export default async function setup(project: TestProject) {
  const database = await startTestDatabase();
  await migrateTestDatabase(database.url);
  project.provide("databaseUrl", database.url);
  return async () => {
    await database.stop();
  };
}
