import { userInfo } from "node:os";
import { leadAuditLog } from "../../src/db/schema";
import type { Db } from "../../src/lib/db/client";

/** Minimal flag parser: --key value, --flag (boolean). */
export function parseArgs(argv: string[]): { positional: string[]; flags: Record<string, string | true> } {
  const positional: string[] = [];
  const flags: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else flags[key] = true;
    } else positional.push(arg);
  }
  return { positional, flags };
}

export function operatorName(): string {
  const fromEnv = process.env.OPERATOR?.trim();
  if (fromEnv) return fromEnv.slice(0, 60);
  try {
    return userInfo().username.slice(0, 60);
  } catch {
    return "unknown-operator";
  }
}

/** Record an operator action. Never pass personal data in `details`. */
export async function audit(
  db: Db,
  action: string,
  leadId: string | null,
  details: Record<string, string | number | boolean | null> = {},
): Promise<void> {
  await db.insert(leadAuditLog).values({ action, leadId, actor: operatorName(), details });
}

export function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Point it at the database you want to operate on.");
    process.exit(2);
  }
  return url;
}

/** CSV cell: quoted, with formula-leading characters neutralised (CSV injection). */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = value instanceof Date ? value.toISOString() : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
