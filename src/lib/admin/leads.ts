import "server-only";
import { and, count, desc, eq, isNull } from "drizzle-orm";
import { leadAuditLog, leads, leadStatus, type Lead } from "@/db/schema";
import type { Db } from "@/lib/db/client";

/** The enquiries screen's data (decision L32): the stored quote requests and their pipeline status. */

export type LeadStatus = Lead["status"];
export const LEAD_STATUSES = leadStatus.enumValues;

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Ново",
  contacted: "В контакт",
  qualified: "Подходящо",
  proposal: "Изпратена оферта",
  won: "Спечелено",
  lost: "Загубено",
};

export const isLeadStatus = (v: unknown): v is LeadStatus =>
  typeof v === "string" && (LEAD_STATUSES as readonly string[]).includes(v);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type LeadListItem = Pick<
  Lead,
  | "id"
  | "createdAt"
  | "name"
  | "businessName"
  | "city"
  | "email"
  | "phone"
  | "goal"
  | "volume"
  | "status"
  | "spamReason"
  | "locale"
  | "details"
>;

export async function listLeads(db: Db, status?: LeadStatus, limit = 200): Promise<LeadListItem[]> {
  return db
    .select({
      id: leads.id,
      createdAt: leads.createdAt,
      name: leads.name,
      businessName: leads.businessName,
      city: leads.city,
      email: leads.email,
      phone: leads.phone,
      goal: leads.goal,
      volume: leads.volume,
      status: leads.status,
      spamReason: leads.spamReason,
      locale: leads.locale,
      details: leads.details,
    })
    .from(leads)
    .where(status ? eq(leads.status, status) : undefined)
    .orderBy(desc(leads.createdAt))
    .limit(limit);
}

export async function getLead(db: Db, id: string): Promise<Lead | null> {
  if (!UUID.test(id)) return null;
  const [lead] = await db.select().from(leads).where(eq(leads.id, id));
  return lead ?? null;
}

/** New enquiries that are not flagged as spam: what the dashboard counts. */
export async function countNewLeads(db: Db): Promise<number> {
  const [row] = await db
    .select({ n: count() })
    .from(leads)
    .where(and(eq(leads.status, "new"), isNull(leads.spamReason)));
  return Number(row?.n ?? 0);
}

/** Change the status and record it in the audit log (no personal data, the same action name as the CLI). */
export async function setLeadStatus(db: Db, id: string, status: LeadStatus, actor = "admin-panel"): Promise<boolean> {
  if (!UUID.test(id)) return false;
  return db.transaction(async (tx) => {
    const updated = await tx
      .update(leads)
      .set({ status, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning({ id: leads.id });
    if (updated.length === 0) return false;
    await tx.insert(leadAuditLog).values({ action: "status_change", leadId: id, actor, details: { status } });
    return true;
  });
}

/** Record that the panel sent an answer (the thread id only; the text stays in the mailbox). */
export async function auditReply(db: Db, leadId: string | null, threadId: string, actor = "admin-panel") {
  await db.insert(leadAuditLog).values({ action: "mail_reply", leadId, actor, details: { threadId } });
}

/**
 * The second line of an enquiry in the lists: the business and city of a Bulgarian request, or the business, the
 * package and the country of an English order (decision L38).
 */
export function leadMeta(l: Pick<Lead, "businessName" | "city" | "locale" | "details">): string {
  if (l.locale === "en" && l.details) return `${l.businessName} · ${l.details.packageName} · ${l.details.country}`;
  return `${l.businessName} · ${l.city ?? "—"}`;
}
