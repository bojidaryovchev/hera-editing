import { EMPTY_ORDER_FORM, ORDER_FORM_FIELDS, type OrderField, type OrderFormValues } from "@/lib/en/order-fields";
import type { OrderErrorCode, OrderFieldErrors } from "@/lib/validation/order";

/**
 * The English order form as the browser and its server action exchange it (after src/lib/leads/form.ts). No
 * server-only imports and no Zod: the client component uses these types and names too.
 */

export { EMPTY_ORDER_FORM, ORDER_FORM_FIELDS };
export type { OrderField, OrderFormValues };

/** Names of the hidden inputs posted with the visible fields (the same names as the Bulgarian form's). */
export const ORDER_HIDDEN = {
  requestId: "requestId",
  sourcePath: "sourcePath",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  privacy: "privacyNoticeAcknowledged",
  locale: "locale",
  honeypot: "hp_note",
} as const;

export type OrderActionState =
  | { status: "idle"; seq: number }
  | { status: "success"; seq: number; id: string; values: OrderFormValues }
  | { status: "invalid"; seq: number; errors: OrderFieldErrors; values: OrderFormValues }
  | { status: "rate_limited"; seq: number; retryAfterSeconds: number; values: OrderFormValues }
  | { status: "unavailable"; seq: number; values: OrderFormValues };

export const INITIAL_ORDER_STATE: OrderActionState = { status: "idle", seq: 0 };

const text = (fd: FormData, name: string): string => {
  const v = fd.get(name);
  return typeof v === "string" ? v : "";
};

/** The visible values as posted (kept as typed, so the form can be shown again exactly). A checkbox posts "on". */
export function orderFormValues(fd: FormData): OrderFormValues {
  const out = { ...EMPTY_ORDER_FORM };
  for (const f of ORDER_FORM_FIELDS) out[f] = text(fd, f).slice(0, 4000);
  if (out.businessConfirmed === "on") out.businessConfirmed = "true";
  return out;
}

/** The raw submission for validateOrder / submitOrder, built from a posted form. */
export function orderFromForm(fd: FormData): Record<string, unknown> {
  return {
    ...orderFormValues(fd),
    privacyNoticeAcknowledged: text(fd, ORDER_HIDDEN.privacy),
    sourcePath: text(fd, ORDER_HIDDEN.sourcePath),
    utm: {
      source: text(fd, ORDER_HIDDEN.utmSource),
      medium: text(fd, ORDER_HIDDEN.utmMedium),
      campaign: text(fd, ORDER_HIDDEN.utmCampaign),
    },
    requestId: text(fd, ORDER_HIDDEN.requestId),
    locale: text(fd, ORDER_HIDDEN.locale),
  };
}

/** Field errors that belong to the visible form; anything else (privacy notice, request id, locale) is a request problem. */
export function splitOrderErrors(errors: OrderFieldErrors): {
  fields: Partial<Record<OrderField, OrderErrorCode>>;
  request: boolean;
} {
  const fields: Partial<Record<OrderField, OrderErrorCode>> = {};
  let request = false;
  for (const [k, code] of Object.entries(errors) as Array<[string, OrderErrorCode]>) {
    if ((ORDER_FORM_FIELDS as readonly string[]).includes(k)) fields[k as OrderField] = code;
    else request = true;
  }
  return { fields, request };
}
