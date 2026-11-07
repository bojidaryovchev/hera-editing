/**
 * Structured, PII-free operational logging. Only allow-listed keys are written, so a
 * caller cannot accidentally log a form body, an email address or a credential.
 */

type Level = "info" | "warn" | "error";

const ALLOWED_KEYS = new Set([
  "leadId",
  "code",
  "status",
  "provider",
  "attempts",
  "count",
  "durationMs",
  "scope",
  "route",
  "duplicate",
  "suppressed",
  "httpStatus",
  "appEnv",
]);

export type LogFields = Partial<Record<string, string | number | boolean | null | undefined>>;

export function sanitizeLogFields(fields: LogFields): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (!ALLOWED_KEYS.has(key) || value === undefined) continue;
    out[key] = typeof value === "string" ? value.slice(0, 120) : value;
  }
  return out;
}

export function logEvent(level: Level, event: string, fields: LogFields = {}): void {
  const line = JSON.stringify({ level, event, ...sanitizeLogFields(fields), at: new Date().toISOString() });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

/** Reduce any thrown value to a short code that is safe to store and log. */
export function errorCode(error: unknown, fallback = "unknown"): string {
  if (error && typeof error === "object") {
    const e = error as { code?: unknown; name?: unknown };
    if (typeof e.code === "string" && /^[A-Za-z0-9_.-]{1,40}$/.test(e.code)) return e.code;
    if (typeof e.name === "string" && /^[A-Za-z0-9_.-]{1,40}$/.test(e.name)) return e.name;
  }
  return fallback;
}
