import { GOALS, LEAD_LIMITS, VOLUMES } from "@/lib/validation/lead-fields";
import {
  isValidEmail,
  isValidPhone,
  isValidProfile,
  normalizeLine,
  normalizeMultiline,
  normalizeUtmValue,
} from "@/lib/validation/text";
import { z, type ZodOutput, type ZodType } from "@/lib/validation/zod";

/**
 * The quote-request contract, shared by the browser form and the server so both
 * validate identically. Errors are stable codes; the UI maps them to Bulgarian
 * copy (src/content/forms.ts). Nothing here may import server-only modules.
 */

export { GOALS, LEAD_LIMITS, VOLUMES };
export { isValidEmail, isValidPhone, isValidProfile, normalizeLine, normalizeMultiline };
export type { LeadGoal, LeadVolume } from "@/lib/validation/lead-fields";

/** Internal pages a quote request may say it came from (`from` / sourcePath). */
export const SOURCE_PATH_PREFIXES = [
  "/",
  "/upravlenie-na-sotsialni-mrezhi",
  "/video-sadarzhanie-za-biznes",
  "/paketi",
  "/rabota",
  "/za-nas",
  "/kontakti",
] as const;

export type LeadErrorCode =
  | "required"
  | "too_short"
  | "too_long"
  | "invalid_email"
  | "invalid_phone"
  | "contact_required"
  | "invalid_profile"
  | "invalid_choice"
  | "privacy_required"
  | "invalid_request"
  | "unsupported_locale";

export type LeadField =
  | "name"
  | "businessName"
  | "city"
  | "email"
  | "phone"
  | "profileUrl"
  | "goal"
  | "volume"
  | "message"
  | "privacyNoticeAcknowledged"
  | "requestId"
  | "locale";

export type LeadFieldErrors = Partial<Record<LeadField, LeadErrorCode>>;

export function normalizeSourcePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const path = value.trim();
  if (path.length === 0 || path.length > 120) return null;
  if (!/^\/[a-z0-9\-/]*$/.test(path)) return null;
  if (path.includes("//")) return null;
  const ok = SOURCE_PATH_PREFIXES.some((p) => (p === "/" ? path === "/" : path === p || path.startsWith(`${p}/`)));
  return ok ? path : null;
}

const toLine = (v: unknown) => (typeof v === "string" ? normalizeLine(v) : v);
const toOptionalLine = (v: unknown) => {
  if (v === undefined || v === null) return null;
  if (typeof v === "number") return String(v);
  if (typeof v !== "string") return v;
  const s = normalizeLine(v);
  return s === "" ? null : s;
};
const toOptionalText = (v: unknown) => {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") return v;
  const s = normalizeMultiline(v);
  return s === "" ? null : s;
};
const emptyToUndefined = (v: unknown) => (v === "" || v === null ? undefined : v);

const requiredLine = (min: number, max: number) =>
  z.preprocess(
    toLine,
    z
      .string({ error: "required" })
      .min(1, { error: "required" })
      .min(min, { error: "too_short" })
      .max(max, { error: "too_long" }),
  );

const optionalLine = (max: number) =>
  z.preprocess(toOptionalLine, z.string({ error: "invalid_request" }).max(max, { error: "too_long" }).nullable());

/** The fields a person fills in. The browser form validates exactly these rules (React Hook Form + zodResolver). */
const formFields = {
  name: requiredLine(LEAD_LIMITS.name.min, LEAD_LIMITS.name.max),
  businessName: requiredLine(LEAD_LIMITS.businessName.min, LEAD_LIMITS.businessName.max),
  city: requiredLine(LEAD_LIMITS.city.min, LEAD_LIMITS.city.max),
  email: optionalLine(LEAD_LIMITS.email.max).refine((v) => v === null || isValidEmail(v), {
    error: "invalid_email",
  }),
  phone: optionalLine(LEAD_LIMITS.phone.max).refine((v) => v === null || isValidPhone(v), {
    error: "invalid_phone",
  }),
  profileUrl: optionalLine(LEAD_LIMITS.profileUrl.max).refine((v) => v === null || isValidProfile(v), {
    error: "invalid_profile",
  }),
  goal: z.preprocess(
    emptyToUndefined,
    z.enum(GOALS, {
      error: (issue) => (issue.input === undefined ? "required" : "invalid_choice"),
    }),
  ),
  volume: z.preprocess(
    (v) => (v === "" || v === undefined ? null : v),
    z.enum(VOLUMES, { error: "invalid_choice" }).nullable(),
  ),
  message: z.preprocess(
    toOptionalText,
    z.string({ error: "invalid_request" }).max(LEAD_LIMITS.message.max, { error: "too_long" }).nullable(),
  ),
};

/**
 * At least one way to reach the person, reported on both fields. It runs even when other fields are invalid
 * (`when`), so a visitor sees every problem in one go: Zod otherwise skips refinements after other issues.
 */
const hasContact = (lead: { email?: unknown; phone?: unknown }) => Boolean(lead.email) || Boolean(lead.phone);
const always = () => true;

function requireContact<T extends ZodType<{ email: string | null; phone: string | null }>>(schema: T): T {
  return schema
    .refine(hasContact, {
      path: ["email"],
      error: "contact_required",
      when: always,
    })
    .refine(hasContact, {
      path: ["phone"],
      error: "contact_required",
      when: always,
    }) as T;
}

/** What the visitor types, as validated in the browser. Same field rules as the server. */
export const leadFormSchema = requireContact(z.object(formFields));

/** The full submission the server accepts: the form fields plus consent, source, idempotency and locale. */
export const leadSubmissionSchema = requireContact(
  z.object({
    ...formFields,
    privacyNoticeAcknowledged: z.preprocess(
      (v) => v === true || v === "true" || v === "on",
      z.literal(true, { error: "privacy_required" }),
    ),
    sourcePath: z.preprocess(normalizeSourcePath, z.string().nullable()),
    utm: z.preprocess(
      (v) => {
        const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
        return {
          source: normalizeUtmValue(o.source),
          medium: normalizeUtmValue(o.medium),
          campaign: normalizeUtmValue(o.campaign),
        };
      },
      z.object({
        source: z.string().nullable(),
        medium: z.string().nullable(),
        campaign: z.string().nullable(),
      }),
    ),
    requestId: z.preprocess(
      (v) => (v === "" || v === undefined ? null : v),
      z.uuid({ error: "invalid_request" }).nullable(),
    ),
    locale: z.preprocess(
      (v) => (v === "" || v === undefined ? null : v),
      z.literal("bg", { error: "unsupported_locale" }).nullable(),
    ),
  }),
);

export type LeadInput = ZodOutput<typeof leadSubmissionSchema>;

export type LeadValidation = { ok: true; data: LeadInput } | { ok: false; errors: LeadFieldErrors };

/** Validate a raw submission (JSON body or form values). First error per field wins. */
export function validateLead(raw: unknown): LeadValidation {
  const parsed = leadSubmissionSchema.safeParse(raw ?? {});
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors: LeadFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = String(issue.path[0] ?? "requestId") as LeadField;
    if (!errors[field]) errors[field] = toCode(issue.message);
  }
  return { ok: false, errors };
}

const CODES = new Set<LeadErrorCode>([
  "required",
  "too_short",
  "too_long",
  "invalid_email",
  "invalid_phone",
  "contact_required",
  "invalid_profile",
  "invalid_choice",
  "privacy_required",
  "invalid_request",
  "unsupported_locale",
]);

function toCode(message: string): LeadErrorCode {
  return CODES.has(message as LeadErrorCode) ? (message as LeadErrorCode) : "invalid_request";
}
