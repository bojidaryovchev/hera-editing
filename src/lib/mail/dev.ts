import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Mailer } from "./types";

/**
 * Development/test transport. It prints a preview to the console (full content only
 * in local development; redacted elsewhere) and, for automated tests, can write each
 * message to an outbox folder. Production configuration refuses this provider.
 */
export function createDevMailer(options: { outboxDir: string | null; revealContent: boolean }): Mailer {
  return {
    provider: "dev",
    async send(message) {
      if (options.outboxDir) {
        await mkdir(options.outboxDir, { recursive: true });
        const key = (message.idempotencyKey ?? "message").replace(/[^A-Za-z0-9_-]/g, "_");
        // One file per send, so a duplicate notification would be visible to tests.
        const file = path.join(options.outboxDir, `${key}__${Date.now()}_${randomUUID().slice(0, 8)}.json`);
        await writeFile(file, JSON.stringify(message, null, 2), "utf8");
      }
      if (options.revealContent) {
        console.info(`[mail:dev] To: ${message.to}\n[mail:dev] Subject: ${message.subject}\n\n${message.text}\n`);
      } else {
        console.info(`[mail:dev] notification prepared (${message.idempotencyKey ?? "no key"}); content hidden outside local development`);
      }
    },
  };
}
