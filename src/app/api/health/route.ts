import { and, eq, lt, sql } from "drizzle-orm";
import { leads } from "@/db/schema";
import { getDb } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * For an uptime monitor. It answers two questions: is the database (and so the quote form) reachable, and are the
 * alerts for new enquiries going out?
 * - The answer is 503 when the database is down, or when alerts are stuck: pending for over 30 minutes, or failed.
 *   That is the same test the daily retry logs as `lead_notification_backlog` (website/03 "Observability and
 *   backups"; spec review gap 2.2).
 * - The body carries states only, never counts or lead data.
 */
export async function GET(): Promise<Response> {
  const headers = { "Cache-Control": "no-store" };
  try {
    const db = getDb();
    await db.execute(sql`select 1`);
    const [stale] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(and(eq(leads.notificationStatus, "pending"), lt(leads.createdAt, sql`now() - interval '30 minutes'`)));
    const [failed] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads)
      .where(eq(leads.notificationStatus, "failed"));
    if ((stale?.count ?? 0) + (failed?.count ?? 0) > 0) {
      return Response.json({ ok: false, database: "up", notifications: "backlog" }, { status: 503, headers });
    }
    return Response.json({ ok: true, database: "up", notifications: "ok" }, { headers });
  } catch {
    return Response.json({ ok: false, database: "down" }, { status: 503, headers });
  }
}
