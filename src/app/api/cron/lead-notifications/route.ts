import { timingSafeEqual } from "node:crypto";
import { and, eq, lt, sql } from "drizzle-orm";
import { leads } from "@/db/schema";
import { getServerEnv } from "@/lib/config/env";
import { getDb } from "@/lib/db/client";
import { processDueNotifications } from "@/lib/leads/notifications";
import { notificationDeps } from "@/lib/leads/runtime";
import { errorCode, logEvent } from "@/lib/log";
import { purgeExpiredRateLimits } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(header: string | null, secret: string): boolean {
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header ?? "");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/**
 * Retry due owner alerts (Vercel Cron or any scheduler sending
 * `Authorization: Bearer $CRON_SECRET`). Disabled (404) unless CRON_SECRET is set.
 * Returns counts only — never lead data.
 */
export async function GET(request: Request): Promise<Response> {
  let env;
  try {
    env = getServerEnv();
  } catch {
    return new Response(null, { status: 503 });
  }
  if (!env.cronSecret) return new Response(null, { status: 404 });
  if (!authorized(request.headers.get("authorization"), env.cronSecret)) return new Response(null, { status: 401 });

  try {
    const report = await processDueNotifications(notificationDeps(), { limit: 25 });
    const db = getDb();
    await purgeExpiredRateLimits(db);
    const backlog = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(and(eq(leads.notificationStatus, "pending"), lt(leads.createdAt, sql`now() - interval '30 minutes'`)));
    const failed = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(eq(leads.notificationStatus, "failed"));
    const stalePending = backlog[0]?.count ?? 0;
    const failedCount = failed[0]?.count ?? 0;
    if (stalePending > 0 || failedCount > 0) {
      // Alert hook: platform log drains/alerts can match this event name.
      logEvent("error", "lead_notification_backlog", { count: stalePending + failedCount, status: "attention" });
    }
    return Response.json(
      { ok: true, ...report, stalePending, failed: failedCount },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    logEvent("error", "lead_cron_failed", { code: errorCode(error) });
    return Response.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
