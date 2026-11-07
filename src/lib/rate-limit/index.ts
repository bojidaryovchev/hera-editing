import { sql } from "drizzle-orm";
import type { Db } from "@/lib/db/client";

export type RateLimitRule = { scope: string; limit: number; windowSeconds: number };

/** Per-client limits for quote requests: a short burst window and a daily cap. */
export const LEAD_RULES: readonly RateLimitRule[] = [
  { scope: "lead-burst", limit: 5, windowSeconds: 10 * 60 },
  { scope: "lead-day", limit: 20, windowSeconds: 24 * 60 * 60 },
];

/** When no trusted client address exists, everyone shares one generous bucket. */
export const SHARED_RULES: readonly RateLimitRule[] = [{ scope: "lead-shared", limit: 60, windowSeconds: 10 * 60 }];

export type RateLimitDecision = { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Fixed-window counters in Postgres (one row per subject and rule). Atomic upsert:
 * concurrent requests can never both see a stale count.
 */
export async function consumeRateLimit(
  db: Db,
  subject: string,
  rules: readonly RateLimitRule[],
  now: Date = new Date(),
): Promise<RateLimitDecision> {
  let retryAfter = 0;
  for (const rule of rules) {
    const windowMs = rule.windowSeconds * 1000;
    const windowStart = new Date(Math.floor(now.getTime() / windowMs) * windowMs);
    const expiresAt = new Date(windowStart.getTime() + windowMs);
    const result = await db.execute<{ count: number }>(sql`
      insert into rate_limit_buckets (key, window_start, count, expires_at)
      values (${`${rule.scope}:${subject}`}, ${windowStart.toISOString()}, 1, ${expiresAt.toISOString()})
      on conflict (key) do update set
        count = case when rate_limit_buckets.window_start = excluded.window_start
                     then rate_limit_buckets.count + 1 else 1 end,
        window_start = excluded.window_start,
        expires_at = excluded.expires_at
      returning count
    `);
    const count = Number(result.rows[0]?.count ?? 0);
    if (count > rule.limit) {
      retryAfter = Math.max(retryAfter, Math.ceil((expiresAt.getTime() - now.getTime()) / 1000));
    }
  }
  return retryAfter > 0 ? { allowed: false, retryAfterSeconds: retryAfter } : { allowed: true };
}

/** Remove counters whose window ended (they hold only pseudonymous keys, but keep the table small). */
export async function purgeExpiredRateLimits(db: Db, now: Date = new Date()): Promise<number> {
  const result = await db.execute(sql`delete from rate_limit_buckets where expires_at < ${now.toISOString()}`);
  return result.rowCount ?? 0;
}
