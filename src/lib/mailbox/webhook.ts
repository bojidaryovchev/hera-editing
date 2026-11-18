import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Resend's webhook signature (Standard Webhooks / Svix), checked without a dependency.
 *
 * The algorithm is the one the Resend SDK delegates to (`standardwebhooks`): the secret is the part after `whsec_`,
 * base64-decoded; the signed content is `${id}.${timestamp}.${body}` over the EXACT bytes received (never a
 * parse-and-restringify round trip); the signature header lists one or more `v1,<base64 HMAC-SHA256>` separated by
 * spaces, any of which may match; and a timestamp more than five minutes off either way is refused, so a captured
 * request cannot be replayed later.
 *
 * Resend sends the headers as `svix-id`, `svix-timestamp` and `svix-signature`; the standard's own names
 * (`webhook-*`) are accepted too.
 */

export const WEBHOOK_TOLERANCE_SECONDS = 5 * 60;

export type WebhookHeaders = { id: string; timestamp: string; signature: string };

/** The three signature headers from a request, by either naming, or null when any is missing. */
export function webhookHeaders(get: (name: string) => string | null): WebhookHeaders | null {
  const id = get("svix-id") ?? get("webhook-id");
  const timestamp = get("svix-timestamp") ?? get("webhook-timestamp");
  const signature = get("svix-signature") ?? get("webhook-signature");
  return id && timestamp && signature ? { id, timestamp, signature } : null;
}

function keyOf(secret: string): Buffer | null {
  const raw = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  const key = Buffer.from(raw, "base64");
  return key.length > 0 ? key : null;
}

/** `v1,<signature>` for this content: used by the check below and by tests that need a valid request. */
export function signWebhook(secret: string, id: string, timestampSeconds: number, payload: string): string {
  const key = keyOf(secret);
  if (!key) throw new Error("webhook secret is empty");
  const mac = createHmac("sha256", key).update(`${id}.${timestampSeconds}.${payload}`).digest("base64");
  return `v1,${mac}`;
}

export type WebhookVerdict =
  { ok: true; event: unknown } | { ok: false; reason: "secret" | "timestamp" | "signature" | "body" };

/** Is this request really from Resend, and recent? Returns the parsed event only when it is. */
export function verifyWebhook(
  payload: string,
  headers: WebhookHeaders,
  secret: string,
  now: Date = new Date(),
): WebhookVerdict {
  if (!keyOf(secret)) return { ok: false, reason: "secret" };

  const timestamp = Number.parseInt(headers.timestamp, 10);
  const nowSeconds = Math.floor(now.getTime() / 1000);
  if (!Number.isFinite(timestamp) || Math.abs(nowSeconds - timestamp) > WEBHOOK_TOLERANCE_SECONDS) {
    return { ok: false, reason: "timestamp" };
  }

  const expected = Buffer.from(signWebhook(secret, headers.id, timestamp, payload).slice(3));
  const matches = headers.signature.split(" ").some((versioned) => {
    const [version, signature] = versioned.split(",");
    if (version !== "v1" || !signature) return false;
    const given = Buffer.from(signature);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!matches) return { ok: false, reason: "signature" };

  try {
    return { ok: true, event: JSON.parse(payload) as unknown };
  } catch {
    return { ok: false, reason: "body" };
  }
}
