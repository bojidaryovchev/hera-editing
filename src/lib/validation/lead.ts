import { z } from "zod";

/**
 * The quote-request contract, shared by the browser form and the server so both
 * validate identically. Errors are stable codes; the UI maps them to Bulgarian
 * copy (src/content/forms.ts). Nothing here may import server-only modules.
 */

export const GOALS = ["awareness", "consistency", "enquiries", "other", "unsure"] as const;
export type LeadGoal = (typeof GOALS)[number];

export const VOLUMES = ["unsure", "4", "8", "12plus"] as const;
export type LeadVolume = (typeof VOLUMES)[number];

export const LEAD_LIMITS = {
  name: { min: 2, max: 100 },
  businessName: { min: 2, max: 120 },
  city: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 40 },
  profileUrl: { max: 250 },
  message: { max: 2000 },
  utm: { max: 100 },
} as const;

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

// Control characters, zero-width and bidirectional-override characters are never
// legitimate in a quote request and can be used to disguise text in the owner's inbox.
const INVISIBLE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x00, 0x08],
  [0x0b, 0x0c],
  [0x0e, 0x1f],
  [0x7f, 0x9f],
  [0x200b, 0x200f],
  [0x2028, 0x202e],
  [0x2060, 0x2064],
  [0x2066, 0x2069],
  [0xfeff, 0xfeff],
];
const hex = (n: number) => String.fromCharCode(92) + "u" + n.toString(16).padStart(4, "0");
const STRIP = new RegExp(
  `[${INVISIBLE_RANGES.map(([a, b]) => (a === b ? hex(a) : `${hex(a)}-${hex(b)}`)).join("")}]`,
  "g",
);

/** One line of text: NFC, stripped of invisible characters, whitespace collapsed. */
export function normalizeLine(value: string): string {
  return value.normalize("NFC").replace(STRIP, "").replace(/\s+/g, " ").trim();
}

/** Free text: keeps line breaks (max two in a row), strips invisible characters. */
export function normalizeMultiline(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(STRIP, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Bulgarian and international numbers, leniently: separators allowed, 7–15 digits, "+" or "00" prefix. */
export function isValidPhone(value: string): boolean {
  if (!/^\+?[0-9\s().\-/]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

const EMAIL = z.email();
export function isValidEmail(value: string): boolean {
  return value.length <= LEAD_LIMITS.email.max && EMAIL.safeParse(value).success;
}

const DANGEROUS_SCHEME = /^\s*(javascript|data|vbscript|file|blob|about|chrome|ms-[a-z-]+)\s*:/i;
const ANY_URL_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

/**
 * "Website or social profile": a URL, a domain or a handle. Free text is allowed,
 * but never a script/data URL, markup characters, or a non-web URL scheme.
 */
export function isValidProfile(value: string): boolean {
  if (DANGEROUS_SCHEME.test(value)) return false;
  if (/[<>"`\\{}^|]/.test(value)) return false;
  if (ANY_URL_SCHEME.test(value)) {
    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") return false;
      if (!url.hostname.includes(".")) return false;
      if (url.username || url.password) return false;
    } catch {
      return false;
    }
  }
  return true;
}

export function normalizeSourcePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const path = value.trim();
  if (path.length === 0 || path.length > 120) return null;
  if (!/^\/[a-z0-9\-/]*$/.test(path)) return null;
  if (path.includes("//")) return null;
  const ok = SOURCE_PATH_PREFIXES.some((p) =>
    p === "/" ? path === "/" : path === p || path.startsWith(`${p}/`),
  );
  return ok ? path : null;
}

function normalizeUtmValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length === 0 || v.length > LEAD_LIMITS.utm.max) return null;
  return /^[A-Za-z0-9_.+\-~%]+$/.test(v) ? v : null;
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

export const leadSubmissionSchema = z
  .object({
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
  })
  .superRefine((lead, ctx) => {
    if (!lead.email && !lead.phone) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "contact_required" });
      ctx.addIssue({ code: "custom", path: ["phone"], message: "contact_required" });
    }
  });

export type LeadInput = z.output<typeof leadSubmissionSchema>;

export type LeadValidation =
  | { ok: true; data: LeadInput }
  | { ok: false; errors: LeadFieldErrors };

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
