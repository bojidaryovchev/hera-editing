"use server";

import { headers } from "next/headers";
import { enOrdersOpen } from "@/lib/en/release";
import { ORDER_HIDDEN, orderFormValues, orderFromForm, type OrderActionState } from "@/lib/leads/order-form";
import { submitOrderFromRequest } from "@/lib/leads/runtime";

/**
 * The English order form's server action, used by the React Hook Form submit (with script) and by the plain form
 * post (without). Same pipeline as POST /api/orders. While orders are closed (the section off, or production
 * without signed-off terms) it stores nothing and answers as unavailable.
 */
export async function submitOrderAction(prev: OrderActionState, formData: FormData): Promise<OrderActionState> {
  const seq = prev.seq + 1;
  const values = orderFormValues(formData);
  if (!enOrdersOpen()) return { status: "unavailable", seq, values };
  const turnstile = formData.get("cf-turnstile-response");
  const result = await submitOrderFromRequest(orderFromForm(formData), await headers(), {
    honeypot: formData.get(ORDER_HIDDEN.honeypot),
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
