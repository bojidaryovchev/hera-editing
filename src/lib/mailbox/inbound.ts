import "server-only";
import type { Db } from "@/lib/db/client";
import type { Mailer } from "@/lib/mail";
import { singleMailbox, type Mailbox } from "./address";
import { hasAddresses, isAddressedToDomain, isSentFromDomain } from "./recipients";
import { addMessage, createThread, matchThread, messageExists, newThreadId } from "./store";
import { headerValue, parseMessageIds } from "./threading";
import { verifyWebhook, type WebhookHeaders } from "./webhook";

/**
 * Inbound mail: contact@ → the database (and, once the owner gives an address, a copy to their inbox).
 *
 * Every message is RECORDED first, so it can be answered from the admin panel and the answer leaves as contact@,
 * which a forward never can. The copy is the lesser half: a forward that fails costs a notification, a record that
 * never happens costs the conversation. Ported from the owner's other sites (buy-a-vend), whose reasoning holds here:
 *
 * - The signature is checked over the exact bytes (src/lib/mailbox/webhook.ts); anything else is refused (401).
 * - The Resend account holds more than one site's domain and fires this webhook for all of them: only mail to OUR
 *   domain is recorded; the rest is answered 200 and dropped (a retry would reach the same verdict).
 * - Mail FROM our own domain is ignored, or a bounce of our own reply would start a ping-pong.
 * - Webhooks carry metadata only: the body comes from one more call to the Received Emails API.
 * - Status codes are load-bearing: Resend retries on 5xx and stops on 2xx, so "understood, not recorded" is a 200.
 */

export const RESEND_API = "https://api.resend.com";

export type InboundConfig = {
  webhookSecret: string;
  apiKey: string;
  /** The mailbox's domain: the only one whose mail is recorded. */
  domain: string;
  /** The mailbox address, which a forwarded copy is sent from. */
  address: string;
  brandName: string;
  /** Where a copy of every recorded message goes; null until the owner gives an address. */
  forwardTo: string | null;
};

export type InboundDeps = { db: Db; mailer: Mailer | null; fetchImpl?: typeof fetch; now?: () => Date };

export type InboundResult =
  | { status: "forwarded"; threadId: string }
  /** Stored, and not forwarded (no address yet, or the message was already stored): safe in the panel. */
  | { status: "recorded"; threadId: string; reason: string }
  /** Understood and deliberately not recorded. Still a 200. */
  | { status: "ignored"; reason: string }
  | { status: "unauthorized" }
  /** Something broke on our side or Resend's: a 500, so Resend retries rather than dropping the message. */
  | { status: "failed"; error: string };

type ReceivedEmail = {
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  cc: string[] | null;
  bcc: string[] | null;
  reply_to: string[] | null;
  received_for: string[];
  html: string | null;
  text: string | null;
  headers: Record<string, string> | null;
  message_id: string;
  attachments: { filename: string | null; size: number; content_type: string }[];
};

const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

/** The event, checked enough to trust its shape (it is already authenticated). */
function receivedEvent(event: unknown): { emailId: string; from: string; recipients: string[][] } | null {
  if (!event || typeof event !== "object") return null;
  const e = event as { type?: unknown; data?: Record<string, unknown> };
  if (e.type !== "email.received" || !e.data || typeof e.data.email_id !== "string") return null;
  return {
    emailId: e.data.email_id,
    from: typeof e.data.from === "string" ? e.data.from : "",
    recipients: [strings(e.data.to), strings(e.data.cc), strings(e.data.bcc), strings(e.data.received_for)],
  };
}

function receivedEmail(body: unknown): ReceivedEmail | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.id !== "string" || typeof b.from !== "string" || typeof b.created_at !== "string") return null;
  const headers =
    b.headers && typeof b.headers === "object"
      ? Object.fromEntries(Object.entries(b.headers).filter((e): e is [string, string] => typeof e[1] === "string"))
      : null;
  const attachments = Array.isArray(b.attachments)
    ? b.attachments.flatMap((a) => {
        const x = a as Record<string, unknown>;
        return typeof x?.size === "number"
          ? [
              {
                filename: typeof x.filename === "string" ? x.filename : null,
                size: x.size,
                content_type: typeof x.content_type === "string" ? x.content_type : "application/octet-stream",
              },
            ]
          : [];
      })
    : [];
  return {
    id: b.id,
    to: strings(b.to),
    from: b.from,
    created_at: b.created_at,
    subject: typeof b.subject === "string" ? b.subject : "",
    cc: Array.isArray(b.cc) ? strings(b.cc) : null,
    bcc: Array.isArray(b.bcc) ? strings(b.bcc) : null,
    reply_to: Array.isArray(b.reply_to) ? strings(b.reply_to) : null,
    received_for: strings(b.received_for),
    html: typeof b.html === "string" ? b.html : null,
    text: typeof b.text === "string" ? b.text : null,
    headers,
    message_id: typeof b.message_id === "string" ? b.message_id : "",
    attachments,
  };
}

/** A From that does not parse is still recorded, listed under the header flattened; it is never answered. */
const unparsedCorrespondent = (from: string): string =>
  from
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200) || "(без подател)";

/** A display name that cannot break the From header of the forwarded copy: header syntax out, 60 characters. */
function displayName(sender: Mailbox | null, from: string): string {
  const name = sender ? (sender.name ?? sender.address) : from;
  return name
    .replace(/[<>"\\,;:\r\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function handleInboundEmail(
  payload: string,
  headers: WebhookHeaders,
  config: InboundConfig,
  deps: InboundDeps,
): Promise<InboundResult> {
  const verdict = verifyWebhook(payload, headers, config.webhookSecret, deps.now?.());
  if (!verdict.ok) return { status: "unauthorized" };

  const event = receivedEvent(verdict.event);
  if (!event) {
    const type = (verdict.event as { type?: unknown } | null)?.type;
    return { status: "ignored", reason: typeof type === "string" ? type : "unknown_event" };
  }
  if (isSentFromDomain(event.from, config.domain)) return { status: "ignored", reason: "from_own_domain" };

  const eventNamesRecipients = hasAddresses(event.recipients);
  if (eventNamesRecipients && !isAddressedToDomain(event.recipients, config.domain)) {
    return { status: "ignored", reason: "other_domain" };
  }

  let email: ReceivedEmail | null;
  try {
    const response = await (deps.fetchImpl ?? fetch)(
      `${RESEND_API}/emails/receiving/${encodeURIComponent(event.emailId)}`,
      { headers: { Authorization: `Bearer ${config.apiKey}` }, signal: AbortSignal.timeout(10_000) },
    );
    if (!response.ok) return { status: "failed", error: `fetch_http_${response.status}` };
    email = receivedEmail(await response.json());
  } catch (error) {
    const name = (error as { name?: string })?.name;
    return { status: "failed", error: name === "TimeoutError" ? "fetch_timeout" : "fetch_network" };
  }
  if (!email) return { status: "failed", error: "fetch_shape" };

  if (
    !eventNamesRecipients &&
    !isAddressedToDomain([email.to, email.cc, email.bcc, email.received_for], config.domain)
  ) {
    return { status: "ignored", reason: "other_domain" };
  }

  const sender = singleMailbox(email.from);
  const subject = email.subject.trim() || "(без тема)";
  let threadId: string;
  let fresh: boolean;
  try {
    fresh = !(await messageExists(deps.db, email.id));
    const references = [
      ...parseMessageIds(headerValue(email.headers, "in-reply-to")),
      ...parseMessageIds(headerValue(email.headers, "references")),
    ];
    const matched = sender ? await matchThread(deps.db, references, sender.address, subject) : null;
    threadId = matched ?? newThreadId();
    if (fresh) {
      const createdAt = new Date(email.created_at);
      if (!matched) {
        await createThread(deps.db, {
          id: threadId,
          createdAt,
          subject,
          correspondent: sender ? sender.address : unparsedCorrespondent(email.from),
          correspondentName: sender?.name ?? null,
        });
      }
      await addMessage(deps.db, {
        id: email.id,
        threadId,
        createdAt,
        direction: "in",
        // The parsed address: a display name is free text and never shown where it could pass for an address.
        fromAddress: sender ? sender.address : unparsedCorrespondent(email.from),
        toAddresses: email.to.join(", "),
        subject,
        bodyText: email.text,
        bodyHtml: email.html,
        messageId: email.message_id || null,
        inReplyTo: headerValue(email.headers, "in-reply-to") ?? null,
        attachments: email.attachments.length
          ? email.attachments.map((a) => ({
              filename: a.filename ?? "файл",
              size: a.size,
              contentType: a.content_type,
            }))
          : null,
      });
    }
  } catch {
    return { status: "failed", error: "record_failed" };
  }

  // From here on it is only the copy: the message is already safe and answerable in the panel.
  if (!config.forwardTo || !deps.mailer) return { status: "recorded", threadId, reason: "no_forward_address" };
  if (isSentFromDomain(config.forwardTo, config.domain))
    return { status: "recorded", threadId, reason: "forward_to_own_domain" };
  if (!fresh) return { status: "recorded", threadId, reason: "already_recorded" };

  const envelope = [
    `От: ${email.from}`,
    `До: ${email.to.join(", ")}`,
    `Получено: ${new Date(email.created_at).toLocaleString("bg-BG", { timeZone: "Europe/Sofia" })}`,
    ...(email.attachments.length
      ? [`Прикачени файлове (остават в Resend): ${email.attachments.map((a) => a.filename ?? "файл").join(", ")}`]
      : []),
  ];
  const text = [...envelope, "", "---", "", email.text?.trim() || "(текстът е само в HTML; вижте го в панела)"].join(
    "\n",
  );
  const replyTo = email.reply_to?.length ? email.reply_to[0]! : (sender?.address ?? null);
  try {
    await deps.mailer.send({
      to: config.forwardTo,
      from: `"${displayName(sender, email.from)} чрез ${config.brandName}" <${config.address}>`,
      subject,
      text,
      html: `<pre style="font:14px/1.5 sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      replyTo,
      idempotencyKey: `forward-${email.id}`,
    });
  } catch {
    return { status: "recorded", threadId, reason: "forward_failed" };
  }
  return { status: "forwarded", threadId };
}
