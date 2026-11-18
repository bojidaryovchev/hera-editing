import "server-only";
import { randomBytes } from "node:crypto";
import { and, asc, desc, eq, inArray, sql } from "drizzle-orm";
import { mailMessages, mailThreads, type MailAttachmentInfo, type MailThread } from "@/db/schema";
import type { Db } from "@/lib/db/client";
import { normalizeSubject, readableBody } from "./threading";

/**
 * The contact@ mailbox in Postgres: threads, the messages in them, and the two questions that decide where a new
 * message goes (see `matchThread`). Ported from the owner's other sites (buy-a-vend), on this site's Drizzle schema.
 */

export type ThreadStatus = MailThread["status"];

export type StoredMessage = {
  id: string;
  threadId: string;
  createdAt: Date;
  direction: "in" | "out";
  fromAddress: string;
  toAddresses: string;
  subject: string;
  bodyText: string | null;
  bodyHtml: string | null;
  messageId: string | null;
  inReplyTo: string | null;
  attachments: MailAttachmentInfo[] | null;
};

export type ThreadSummary = MailThread & {
  messageCount: number;
  /** "in": the last word was theirs, so the conversation owes an answer. */
  lastDirection: "in" | "out" | null;
  snippet: string;
};

export type ThreadDetail = MailThread & { messages: StoredMessage[] };

/** Eight uppercase hex characters, like the thread ids buy-a-vend shows in its URLs. */
export const newThreadId = (): string => randomBytes(4).toString("hex").toUpperCase();

const SNIPPET = 140;
const TEXT_MAX = 200_000;
const HTML_MAX = 500_000;
const clip = (value: string | null, max: number) => (value && value.length > max ? value.slice(0, max) : value);

export async function listThreads(db: Db, status?: ThreadStatus, limit = 200): Promise<ThreadSummary[]> {
  const rows = await db.execute<{
    id: string;
    message_count: number | string;
    last_direction: "in" | "out" | null;
    last_text: string | null;
    last_html: string | null;
  }>(sql`
    select t.id, (select count(*) from mail_messages c where c.thread_id = t.id) as message_count,
           last.direction as last_direction, last.body_text as last_text, last.body_html as last_html
    from mail_threads t
    left join lateral (
      select m.direction, m.body_text, m.body_html from mail_messages m
      where m.thread_id = t.id order by m.created_at desc limit 1
    ) last on true
    ${status ? sql`where t.status = ${status}` : sql``}
    order by t.last_message_at desc
    limit ${limit}
  `);
  const ids = rows.rows.map((r) => r.id);
  if (ids.length === 0) return [];
  const threads = await db.select().from(mailThreads).where(inArray(mailThreads.id, ids));
  const byId = new Map(threads.map((t) => [t.id, t]));
  return rows.rows.flatMap((r) => {
    const thread = byId.get(r.id);
    if (!thread) return [];
    const body = r.last_direction
      ? readableBody({ direction: r.last_direction, bodyText: r.last_text, bodyHtml: r.last_html })
      : "";
    const flat = body.replace(/\s+/g, " ").trim();
    return [
      {
        ...thread,
        messageCount: Number(r.message_count),
        lastDirection: r.last_direction,
        snippet: flat.length > SNIPPET ? `${flat.slice(0, SNIPPET - 1)}…` : flat,
      },
    ];
  });
}

/** How many open conversations end with their message, not ours: the ones that owe an answer. */
export async function countAwaitingAnswer(db: Db): Promise<number> {
  const result = await db.execute<{ n: number | string }>(sql`
    select count(*) as n from mail_threads t
    where t.status = 'open' and (
      select m.direction from mail_messages m where m.thread_id = t.id order by m.created_at desc limit 1
    ) = 'in'
  `);
  return Number(result.rows[0]?.n ?? 0);
}

export async function getThread(db: Db, id: string): Promise<ThreadDetail | null> {
  if (!/^[0-9A-F]{8}$/.test(id)) return null;
  const [thread] = await db.select().from(mailThreads).where(eq(mailThreads.id, id));
  if (!thread) return null;
  const messages = await db
    .select()
    .from(mailMessages)
    .where(eq(mailMessages.threadId, id))
    .orderBy(asc(mailMessages.createdAt));
  return { ...thread, messages: messages as StoredMessage[] };
}

export async function createThread(
  db: Db,
  thread: {
    id: string;
    createdAt: Date;
    subject: string;
    correspondent: string;
    correspondentName: string | null;
    leadId?: string | null;
  },
): Promise<void> {
  await db.insert(mailThreads).values({
    id: thread.id,
    createdAt: thread.createdAt,
    lastMessageAt: thread.createdAt,
    subject: thread.subject,
    subjectKey: normalizeSubject(thread.subject),
    correspondent: thread.correspondent,
    correspondentName: thread.correspondentName,
    leadId: thread.leadId ?? null,
  });
}

/**
 * Store a message, once: Resend's id is the key, so a retried webhook stores nothing new (returns false). The
 * thread's clock moves on, and an incoming message reopens a finished conversation: someone is waiting again.
 */
export async function addMessage(db: Db, message: StoredMessage): Promise<boolean> {
  const inserted = await db
    .insert(mailMessages)
    .values({
      ...message,
      bodyText: clip(message.bodyText, TEXT_MAX),
      bodyHtml: clip(message.bodyHtml, HTML_MAX),
    })
    .onConflictDoNothing({ target: mailMessages.id })
    .returning({ id: mailMessages.id });
  if (inserted.length === 0) return false;
  await db
    .update(mailThreads)
    .set({
      lastMessageAt: sql`greatest(${mailThreads.lastMessageAt}, ${message.createdAt.toISOString()}::timestamptz)`,
      ...(message.direction === "in" ? { status: "open" as const } : {}),
    })
    .where(eq(mailThreads.id, message.threadId));
  return true;
}

export async function messageExists(db: Db, id: string): Promise<boolean> {
  const [row] = await db.select({ id: mailMessages.id }).from(mailMessages).where(eq(mailMessages.id, id));
  return Boolean(row);
}

export async function setThreadStatus(db: Db, id: string, status: ThreadStatus): Promise<void> {
  await db.update(mailThreads).set({ status }).where(eq(mailThreads.id, id));
}

/** The most recently active conversation about this enquiry, open or not. */
export async function findThreadByLead(db: Db, leadId: string): Promise<string | null> {
  const [row] = await db
    .select({ id: mailThreads.id })
    .from(mailThreads)
    .where(eq(mailThreads.leadId, leadId))
    .orderBy(desc(mailThreads.lastMessageAt))
    .limit(1);
  return row?.id ?? null;
}

/**
 * Which thread an incoming message belongs to. Two signals, in order of trust, BOTH scoped to the correspondent
 * (the parsed sender), because one thread is one correspondent and a reply goes to them: a message from anyone
 * else, a colleague on copy or a stranger who learnt a Message-ID or a subject, starts a thread of its own.
 *
 * 1. The References chain: clients accumulate every ancestor's id, so a reply to OUR reply still carries the id of
 *    the customer's own earlier message, which we stored.
 * 2. The same normalised subject on one of their OPEN threads: a client that writes a fresh message about the same
 *    thing, or a reply to a conversation we started (our own outgoing Message-ID is the provider's, not known here).
 */
export async function matchThread(
  db: Db,
  references: string[],
  correspondent: string,
  subject: string,
): Promise<string | null> {
  if (references.length > 0) {
    const [byReference] = await db
      .select({ id: mailThreads.id })
      .from(mailMessages)
      .innerJoin(mailThreads, eq(mailThreads.id, mailMessages.threadId))
      .where(
        and(inArray(mailMessages.messageId, references.slice(0, 40)), eq(mailThreads.correspondent, correspondent)),
      )
      .orderBy(desc(mailMessages.createdAt))
      .limit(1);
    if (byReference) return byReference.id;
  }
  const key = normalizeSubject(subject);
  if (!key) return null;
  const [bySubject] = await db
    .select({ id: mailThreads.id })
    .from(mailThreads)
    .where(
      and(
        eq(mailThreads.correspondent, correspondent),
        eq(mailThreads.status, "open"),
        eq(mailThreads.subjectKey, key),
      ),
    )
    .orderBy(desc(mailThreads.lastMessageAt))
    .limit(1);
  return bySubject?.id ?? null;
}
