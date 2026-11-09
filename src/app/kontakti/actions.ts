"use server";

import { headers } from "next/headers";
import { HIDDEN, formValues, leadFromForm, type LeadActionState } from "@/lib/leads/form";
import { submitLeadFromRequest } from "@/lib/leads/runtime";

/**
 * The quote-request server action, used both by the React Hook Form submit (with script) and by the plain form post
 * (without script). Same pipeline as POST /api/leads: validation, rate limit, durable insert, mail after commit.
 * Next.js checks the Origin of every server action; the body size is capped in next.config.ts.
 */
export async function submitLeadAction(prev: LeadActionState, formData: FormData): Promise<LeadActionState> {
  const seq = prev.seq + 1;
  const values = formValues(formData);
  const turnstile = formData.get("cf-turnstile-response");
  const result = await submitLeadFromRequest(leadFromForm(formData), await headers(), {
    honeypot: formData.get(HIDDEN.honeypot),
    turnstileToken: typeof turnstile === "string" ? turnstile : null,
  });
  switch (result.status) {
    case "created":
    case "duplicate":
      return { status: "success", seq, id: result.id, values };
    case "invalid":
      return { status: "invalid", seq, errors: result.errors, values };
    case "rate_limited":
      return { status: "rate_limited", seq, retryAfterSeconds: result.retryAfterSeconds, values };
    case "verification_failed":
      return { status: "invalid", seq, errors: { requestId: "invalid_request" }, values };
    case "unavailable":
      return { status: "unavailable", seq, values };
  }
}
