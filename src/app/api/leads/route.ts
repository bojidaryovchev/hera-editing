import { getServerEnv } from "@/lib/config/env";
import { submitLeadFromRequest } from "@/lib/leads/runtime";
import { logEvent } from "@/lib/log";
import { BodyTooLargeError, isAllowedOrigin, readBodyWithLimit } from "@/lib/security/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The spec caps quote requests well under 8 KB; the longest valid request is about 6 KB. */
export const MAX_BODY_BYTES = 8 * 1024;

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/**
 * POST /api/leads — the quote-request contract (spec/website/03). Only POST is exported,
 * so every other method is answered 405; there is no way to list or read leads here.
 */
export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }

  let siteUrl = "http://localhost:3000";
  try {
    siteUrl = getServerEnv().siteUrl;
  } catch {
    // Misconfiguration is reported by the pipeline as `unavailable`.
  }
  if (!isAllowedOrigin(request.headers.get("origin"), siteUrl, request.url)) {
    return json({ ok: false, error: "forbidden_origin" }, 403);
  }

  let payload: unknown;
  try {
    const text = await readBodyWithLimit(request, MAX_BODY_BYTES);
    payload = JSON.parse(text);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return json({ ok: false, error: "payload_too_large" }, 413);
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  const body = payload as Record<string, unknown>;
  const result = await submitLeadFromRequest(body, request.headers, {
    honeypot: body.hp_note,
    turnstileToken: typeof body.turnstileToken === "string" ? body.turnstileToken : null,
  });

  switch (result.status) {
    case "created":
    case "duplicate":
      return json({ ok: true, id: result.id }, 201);
    case "invalid":
      return json({ ok: false, error: "validation", fieldErrors: result.errors }, 400);
    case "verification_failed":
      return json({ ok: false, error: "verification_failed" }, 400);
    case "rate_limited":
      return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(result.retryAfterSeconds) });
    case "unavailable":
      logEvent("warn", "lead_api_unavailable", { route: "/api/leads", httpStatus: 503 });
      return json({ ok: false, error: "unavailable" }, 503);
  }
}
