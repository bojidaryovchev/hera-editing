import { getServerEnv } from "@/lib/config/env";
import { getDb } from "@/lib/db/client";
import { errorCode, logEvent } from "@/lib/log";
import { createMailer } from "@/lib/mail";
import { handleInboundEmail } from "@/lib/mailbox/inbound";
import { webhookHeaders } from "@/lib/mailbox/webhook";
import { BodyTooLargeError, readBodyWithLimit } from "@/lib/security/request";
import { brandName } from "@/lib/site/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The event is metadata only (sender, recipients, subject, ids); the body is fetched separately. */
const BODY_LIMIT = 256 * 1024;

/**
 * Resend's `email.received` webhook for the contact@ mailbox (decision L32). Register this URL in Resend under
 * Webhooks, subscribed to `email.received`, and put its signing secret in RESEND_WEBHOOK_SECRET. Off (404) until the
 * mailbox is configured. The status codes are load-bearing: Resend retries on 5xx and stops on 2xx, so "understood,
 * not recorded" is a 200 and only a failure on our side or Resend's is a 500. Logs carry outcomes, never addresses
 * or content.
 */
export async function POST(request: Request): Promise<Response> {
  let env;
  try {
    env = getServerEnv();
  } catch {
    return new Response(null, { status: 503 });
  }
  const mailbox = env.mailbox;
  if (!mailbox) return new Response(null, { status: 404 });

  const headers = webhookHeaders((name) => request.headers.get(name));
  if (!headers) return new Response(null, { status: 400 });

  let payload: string;
  try {
    // Raw text, never request.json(): the signature covers the exact bytes.
    payload = await readBodyWithLimit(request, BODY_LIMIT);
  } catch (error) {
    return new Response(null, { status: error instanceof BodyTooLargeError ? 413 : 400 });
  }

  try {
    const result = await handleInboundEmail(
      payload,
      headers,
      {
        webhookSecret: mailbox.webhookSecret,
        apiKey: mailbox.apiKey,
        domain: mailbox.domain,
        address: mailbox.address,
        brandName: brandName(),
        forwardTo: env.notificationEmailTo,
      },
      { db: getDb(), mailer: createMailer(env) },
    );
    switch (result.status) {
      case "forwarded":
        logEvent("info", "mailbox_recorded", { status: "forwarded" });
        return Response.json({ ok: true });
      case "recorded":
        logEvent(result.reason === "forward_failed" ? "warn" : "info", "mailbox_recorded", { status: result.reason });
        return Response.json({ ok: true });
      case "ignored":
        logEvent("info", "mailbox_ignored", { status: result.reason });
        return Response.json({ ok: true });
      case "unauthorized":
        logEvent("warn", "mailbox_unauthorized");
        return new Response(null, { status: 401 });
      case "failed":
        logEvent("error", "mailbox_failed", { code: result.error });
        return new Response(null, { status: 500 });
    }
  } catch (error) {
    logEvent("error", "mailbox_failed", { code: errorCode(error) });
    return new Response(null, { status: 500 });
  }
}
