import "server-only";
import { randomUUID } from "node:crypto";
import type { Db } from "@/lib/db/client";
import type { Mailer } from "@/lib/mail";
import { singleMailbox } from "./address";
import { addMessage, createThread, findThreadByLead, getThread, newThreadId } from "./store";
import { referenceChain, replySubject } from "./threading";

/**
 * Answering from the admin panel, so the answer leaves as contact@ (decision L32). Ported from buy-a-vend's
 * mailbox-reply, with its rules:
 *
 * - ONE PARSED ADDRESS, NEVER A HEADER: the recipient is the thread's correspondent, stored as the single mailbox
 *   its first message named. A thread whose sender did not parse as one mailbox cannot be answered from here.
 * - In-Reply-To names the last message they sent, References the whole chain, so the answer threads in their
 *   client.
 * - Recorded AFTER the send: an unsent reply in the transcript is worse than a sent one missing from it.
 */

export type ReplyConfig = { address: string; brandName: string; siteUrl: string };
export type ReplyResult = { ok: true; threadId: string } | { ok: false; error: string };

export const REPLY_MAX = 10_000;

export const REPLY_ERRORS = {
  notFound: "Разговорът не е намерен.",
  unclear: "Подателят не е един ясен адрес, затова отговор оттук не се изпраща. Отговорете от пощата си.",
  empty: "Напишете отговора, преди да го изпратите.",
  tooLong: `Отговорът е твърде дълъг (до ${REPLY_MAX.toLocaleString("bg-BG")} знака).`,
  noEmail: "Запитването няма имейл. Свържете се по телефона.",
  failed: "Отговорът не беше изпратен. Опитайте отново след минута.",
} as const;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** The plain text with a signature under `--`, and the same as simple HTML paragraphs. */
export function composeReply(body: string, config: Pick<ReplyConfig, "brandName" | "siteUrl">) {
  const host = new URL(config.siteUrl).host;
  const text = `${body}\n\n--\n${config.brandName}\n${host}`;
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 1em">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
  const html = `<div style="font:15px/1.55 Arial,sans-serif;color:#16181a">${paragraphs}<p style="margin:1.5em 0 0;color:#5b5e63">—<br>${escapeHtml(config.brandName)}<br>${escapeHtml(host)}</p></div>`;
  return { text, html };
}

function checkBody(raw: string): { ok: true; body: string } | { ok: false; error: string } {
  const body = raw.replace(/\r\n?/g, "\n").trim();
  if (!body) return { ok: false, error: REPLY_ERRORS.empty };
  if (body.length > REPLY_MAX) return { ok: false, error: REPLY_ERRORS.tooLong };
  return { ok: true, body };
}

export async function replyToThread(
  db: Db,
  mailer: Mailer,
  config: ReplyConfig,
  threadId: string,
  rawBody: string,
): Promise<ReplyResult> {
  const checked = checkBody(rawBody);
  if (!checked.ok) return checked;
  const thread = await getThread(db, threadId);
  if (!thread) return { ok: false, error: REPLY_ERRORS.notFound };
  const mailbox = singleMailbox(thread.correspondent);
  if (!mailbox) return { ok: false, error: REPLY_ERRORS.unclear };

  const lastInbound = [...thread.messages].reverse().find((m) => m.direction === "in");
  const references = referenceChain(thread.messages);
  const headers: Record<string, string> = {};
  if (lastInbound?.messageId) headers["In-Reply-To"] = lastInbound.messageId;
  if (references.length > 0) headers.References = references.join(" ");

  // A conversation we start (from an enquiry) opens with its own subject; every later message is "Re:".
  const subject = thread.messages.length === 0 ? thread.subject : replySubject(thread.subject);
  const from = `"${config.brandName.replace(/["\\]/g, "")}" <${config.address}>`;
  const { text, html } = composeReply(checked.body, config);

  let sentId: string | null;
  try {
    ({ id: sentId } = await mailer.send({ to: mailbox.address, from, subject, text, html, headers }));
  } catch {
    return { ok: false, error: REPLY_ERRORS.failed };
  }

  await addMessage(db, {
    id: sentId ?? `out_${randomUUID()}`,
    threadId: thread.id,
    createdAt: new Date(),
    direction: "out",
    fromAddress: config.address,
    toAddresses: mailbox.address,
    subject,
    bodyText: text,
    bodyHtml: null,
    messageId: null,
    inReplyTo: lastInbound?.messageId ?? null,
    attachments: null,
  });
  return { ok: true, threadId: thread.id };
}

/**
 * Answer an enquiry by email: continue the conversation already tied to it, or open one. The recipient is the
 * address the enquiry was made with, parsed; the customer's answer threads back by subject (our own outgoing
 * Message-ID is the provider's, not ours to know) and lands in this same conversation.
 */
export async function replyToLead(
  db: Db,
  mailer: Mailer,
  config: ReplyConfig,
  lead: { id: string; name: string; email: string | null },
  rawBody: string,
): Promise<ReplyResult> {
  const checked = checkBody(rawBody);
  if (!checked.ok) return checked;
  const mailbox = lead.email ? singleMailbox(lead.email) : null;
  if (!mailbox) return { ok: false, error: REPLY_ERRORS.noEmail };

  let threadId = await findThreadByLead(db, lead.id);
  if (!threadId) {
    threadId = newThreadId();
    await createThread(db, {
      id: threadId,
      createdAt: new Date(),
      subject: `Вашето запитване към ${config.brandName}`,
      correspondent: mailbox.address,
      correspondentName: lead.name,
      leadId: lead.id,
    });
  }
  return replyToThread(db, mailer, config, threadId, checked.body);
}
