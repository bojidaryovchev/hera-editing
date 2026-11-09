import type { LeadErrorCode, LeadFieldErrors } from "@/lib/validation/lead";

/**
 * The quote-request form as the browser and the server action exchange it. No server-only imports: the client
 * component uses these types and names too.
 */

/** Fields the visitor fills in, as strings (the shape React Hook Form holds and the no-script fallback re-renders). */
export const LEAD_FORM_FIELDS = ["name", "businessName", "city", "email", "phone", "profileUrl", "goal", "volume", "message"] as const;
export type LeadFormField = (typeof LEAD_FORM_FIELDS)[number];
export type LeadFormValues = Record<LeadFormField, string>;

export const EMPTY_LEAD_FORM: LeadFormValues = {
  name: "",
  businessName: "",
  city: "",
  email: "",
  phone: "",
  profileUrl: "",
  goal: "",
  volume: "",
  message: "",
};

/** Names of the hidden inputs the form posts along with the visible fields. */
export const HIDDEN = {
  requestId: "requestId",
  sourcePath: "sourcePath",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  privacy: "privacyNoticeAcknowledged",
  locale: "locale",
  honeypot: "hp_note",
} as const;

export type LeadActionState =
  | { status: "idle"; seq: number }
  | { status: "success"; seq: number; id: string; values: LeadFormValues }
  | { status: "invalid"; seq: number; errors: LeadFieldErrors; values: LeadFormValues }
  | { status: "rate_limited"; seq: number; retryAfterSeconds: number; values: LeadFormValues }
  | { status: "unavailable"; seq: number; values: LeadFormValues };

export const INITIAL_LEAD_STATE: LeadActionState = { status: "idle", seq: 0 };

const text = (fd: FormData, name: string): string => {
  const v = fd.get(name);
  return typeof v === "string" ? v : "";
};

/** The visible values as posted (kept as typed, so the form can be shown again exactly). */
export function formValues(fd: FormData): LeadFormValues {
  const out = { ...EMPTY_LEAD_FORM };
  for (const f of LEAD_FORM_FIELDS) out[f] = text(fd, f).slice(0, 4000);
  return out;
}

/** The raw submission for validateLead / submitLead, built from a posted form. */
export function leadFromForm(fd: FormData): Record<string, unknown> {
  return {
    ...formValues(fd),
    privacyNoticeAcknowledged: text(fd, HIDDEN.privacy),
    sourcePath: text(fd, HIDDEN.sourcePath),
    utm: { source: text(fd, HIDDEN.utmSource), medium: text(fd, HIDDEN.utmMedium), campaign: text(fd, HIDDEN.utmCampaign) },
    requestId: text(fd, HIDDEN.requestId),
    locale: text(fd, HIDDEN.locale),
  };
}

/** Field errors that belong to the visible form; anything else (consent, request id, locale) is a request problem. */
export function splitErrors(errors: LeadFieldErrors): { fields: Partial<Record<LeadFormField, LeadErrorCode>>; request: boolean } {
  const fields: Partial<Record<LeadFormField, LeadErrorCode>> = {};
  let request = false;
  for (const [k, code] of Object.entries(errors) as Array<[string, LeadErrorCode]>) {
    if ((LEAD_FORM_FIELDS as readonly string[]).includes(k)) fields[k as LeadFormField] = code;
    else request = true;
  }
  return { fields, request };
}
