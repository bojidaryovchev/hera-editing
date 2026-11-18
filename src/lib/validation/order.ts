import { PACKAGES, nicheOf, packageById } from "@/content/en/packages";
import {
  AI_CHOICES,
  CUSTOM_PACKAGE,
  MUSIC_CHOICES,
  NICHE_FIELDS,
  ORDER_LIMITS,
  VERSION_CHOICES,
  isCountryCode,
  isEuBlocked,
  type NicheKey,
  type OrderDetails,
  type OrderField,
} from "@/lib/en/order-fields";
import { isValidEmail, isValidLink, normalizeLine, normalizeMultiline, normalizeUtmValue } from "@/lib/validation/text";
import { z, type ZodOutput } from "@/lib/validation/zod";

/**
 * The English order and brief (decision L38), shared by the browser form and the server so both validate alike, as
 * the Bulgarian quote form does (lead.ts). Errors are stable codes; the form maps them to English copy
 * (src/content/en/order.ts). The EU rule depends on configuration, so the schemas are built for it.
 */

export type OrderErrorCode =
  | "required"
  | "too_short"
  | "too_long"
  | "invalid_email"
  | "invalid_url"
  | "invalid_choice"
  | "invalid_country"
  | "eu_unavailable"
  | "business_required"
  | "invalid_vat"
  | "invalid_date"
  | "date_past"
  | "privacy_required"
  | "invalid_request"
  | "unsupported_locale";

export const ORDER_ERROR_CODES: readonly OrderErrorCode[] = [
  "required",
  "too_short",
  "too_long",
  "invalid_email",
  "invalid_url",
  "invalid_choice",
  "invalid_country",
  "eu_unavailable",
  "business_required",
  "invalid_vat",
  "invalid_date",
  "date_past",
  "privacy_required",
  "invalid_request",
  "unsupported_locale",
];

export type OrderRequestField = "privacyNoticeAcknowledged" | "requestId" | "locale";
export type OrderFieldErrors = Partial<Record<OrderField | OrderRequestField, OrderErrorCode>>;

/** What the rules depend on: whether businesses in other EU states may order, and today's date (for deadlines). */
export type OrderRules = { euOrders: boolean; now?: () => Date };

export const ORDERABLE_IDS: readonly string[] = [...PACKAGES.map((p) => p.id), CUSTOM_PACKAGE];

/** Internal pages an order may say it came from: the English section only. */
export function normalizeOrderSource(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const path = value.trim();
  if (path.length === 0 || path.length > 120 || path.includes("//")) return null;
  return /^\/en(\/[a-z0-9-]+)*$/.test(path) ? path : null;
}

const toLine = (v: unknown) => (typeof v === "string" ? normalizeLine(v) : v);
const toOptionalLine = (v: unknown) => {
  if (v === undefined || v === null) return null;
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
const choiceError = (issue: { input?: unknown }) => (issue.input === undefined ? "required" : "invalid_choice");

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
const optionalText = (max: number) =>
  z.preprocess(toOptionalText, z.string({ error: "invalid_request" }).max(max, { error: "too_long" }).nullable());
const optionalLink = () =>
  optionalLine(ORDER_LIMITS.url.max).refine((v) => v === null || isValidLink(v), { error: "invalid_url" });
const requiredChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(emptyToUndefined, z.enum(values, { error: choiceError }));
const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess((v) => (v === "" || v === undefined ? null : v), z.enum(values, { error: "invalid_choice" }).nullable());

const DAY = 24 * 60 * 60 * 1000;
function parseDay(v: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const d = new Date(`${v}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v ? null : d;
}

/** The fields a person fills in. The browser validates exactly these (React Hook Form + zodResolver). */
function formFields(rules: OrderRules) {
  const now = rules.now ?? (() => new Date());
  return {
    package: requiredChoice(ORDERABLE_IDS as unknown as readonly [string, ...string[]]),
    name: requiredLine(ORDER_LIMITS.name.min, ORDER_LIMITS.name.max),
    businessName: requiredLine(ORDER_LIMITS.businessName.min, ORDER_LIMITS.businessName.max),
    email: z.preprocess(
      toLine,
      z
        .string({ error: "required" })
        .min(1, { error: "required" })
        .max(ORDER_LIMITS.email.max, { error: "too_long" })
        .refine((v) => isValidEmail(v), { error: "invalid_email" }),
    ),
    country: z.preprocess(
      emptyToUndefined,
      z
        .string({ error: "required" })
        .refine(isCountryCode, { error: "invalid_country" })
        .refine((c) => !isEuBlocked(c, rules.euOrders), { error: "eu_unavailable" }),
    ),
    vatNumber: optionalLine(ORDER_LIMITS.vatNumber.max).refine(
      (v) => v === null || /^[A-Za-z0-9][A-Za-z0-9 .\-/]{1,39}$/.test(v),
      { error: "invalid_vat" },
    ),
    businessConfirmed: z.preprocess(
      (v) => v === true || v === "true" || v === "on",
      z.literal(true, { error: "business_required" }),
    ),
    footageUrl: optionalLink(),
    deadline: z.preprocess(
      toOptionalLine,
      z
        .string({ error: "invalid_date" })
        .refine((v) => parseDay(v) !== null, { error: "invalid_date", abort: true })
        .refine((v) => (parseDay(v)?.getTime() ?? 0) >= now().getTime() - DAY, { error: "date_past" })
        .refine((v) => (parseDay(v)?.getTime() ?? 0) <= now().getTime() + 2 * 366 * DAY, { error: "invalid_date" })
        .nullable(),
    ),
    references: optionalText(ORDER_LIMITS.text.max),
    music: requiredChoice(MUSIC_CHOICES),
    aiVisuals: requiredChoice(AI_CHOICES),
    mustInclude: optionalText(ORDER_LIMITS.text.max),
    scope: optionalText(ORDER_LIMITS.scope.max),
    // Weddings
    couple: optionalLine(ORDER_LIMITS.line.max),
    keyMoments: optionalText(ORDER_LIMITS.text.max),
    vowsAudio: optionalLink(),
    grade: optionalLine(ORDER_LIMITS.line.max),
    styleFilm: optionalLink(),
    // YouTube
    script: optionalLink(),
    voiceover: optionalLink(),
    channel: optionalLink(),
    stockLibrary: optionalLine(ORDER_LIMITS.line.max),
    // Real estate
    listing: optionalLine(ORDER_LIMITS.line.max),
    roomOrder: optionalText(ORDER_LIMITS.text.max),
    branding: optionalLink(),
    versions: optionalChoice(VERSION_CHOICES),
  };
}

const always = () => true;

const ALL_NICHE_FIELDS = Object.values(NICHE_FIELDS).flat() as readonly string[];

/**
 * Fields that do not belong to the chosen package are ignored before anything is checked: they are hidden on the
 * form, so an error there could never be seen or fixed (a visitor who typed in them and then changed package).
 */
function onlyChosenPackage(raw: unknown): unknown {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const values = { ...(raw as Record<string, unknown>) };
  const pkg = typeof values.package === "string" ? packageById(values.package) : null;
  const keep = new Set<string>(pkg ? (NICHE_FIELDS[nicheOf(pkg) as NicheKey] ?? []) : []);
  for (const f of ALL_NICHE_FIELDS) if (!keep.has(f)) values[f] = "";
  if (values.package !== CUSTOM_PACKAGE) values.scope = "";
  return values;
}

/** A custom quote needs a description of the job (research Part 2 §6.8: the written intake). */
function checkScope(v: { package?: unknown; scope?: unknown }, ctx: { addIssue: (i: never) => void }) {
  if (v.package !== CUSTOM_PACKAGE) return;
  const scope = typeof v.scope === "string" ? v.scope : "";
  const message = scope.length === 0 ? "required" : scope.length < ORDER_LIMITS.scope.min ? "too_short" : null;
  if (message) ctx.addIssue({ code: "custom", path: ["scope"], message } as never);
}

/** What the visitor types, as validated in the browser. Same field rules as the server. */
export function orderFormSchema(rules: OrderRules) {
  return z.preprocess(onlyChosenPackage, z.object(formFields(rules))).superRefine(checkScope, { when: always });
}

/** The full submission the server accepts: the form plus the privacy notice, source, idempotency and locale. */
export function orderSubmissionSchema(rules: OrderRules) {
  const schema = z.object({
    ...formFields(rules),
    privacyNoticeAcknowledged: z.preprocess(
      (v) => v === true || v === "true" || v === "on",
      z.literal(true, { error: "privacy_required" }),
    ),
    sourcePath: z.preprocess(normalizeOrderSource, z.string().nullable()),
    utm: z.preprocess(
      (v) => {
        const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
        return {
          source: normalizeUtmValue(o.source, ORDER_LIMITS.utm.max),
          medium: normalizeUtmValue(o.medium, ORDER_LIMITS.utm.max),
          campaign: normalizeUtmValue(o.campaign, ORDER_LIMITS.utm.max),
        };
      },
      z.object({ source: z.string().nullable(), medium: z.string().nullable(), campaign: z.string().nullable() }),
    ),
    requestId: z.preprocess(
      (v) => (v === "" || v === undefined ? null : v),
      z.uuid({ error: "invalid_request" }).nullable(),
    ),
    locale: z.preprocess(
      (v) => (v === "" || v === undefined ? "en" : v),
      z.literal("en", { error: "unsupported_locale" }),
    ),
  });
  return z.preprocess(onlyChosenPackage, schema).superRefine(checkScope, { when: always });
}

export type OrderSubmission = ZodOutput<ReturnType<typeof orderSubmissionSchema>>;

/** A validated order, split into the contact columns and the brief stored in leads.details. */
export type OrderInput = {
  name: string;
  businessName: string;
  email: string;
  details: OrderDetails;
  sourcePath: string | null;
  utm: { source: string | null; medium: string | null; campaign: string | null };
  requestId: string | null;
};

export type OrderValidation = { ok: true; data: OrderInput } | { ok: false; errors: OrderFieldErrors };

const NICHE_KEY: Record<NicheKey, "wedding" | "youtube" | "realEstate"> = {
  wedding: "wedding",
  youtube: "youtube",
  "real-estate": "realEstate",
};

/** The brief as stored: only the chosen package's niche fields are kept, whatever else the browser sent. */
export function toOrderDetails(v: OrderSubmission): OrderDetails {
  const pkg = packageById(v.package);
  const niche = pkg ? nicheOf(pkg) : null;
  const details: OrderDetails = {
    version: 1,
    package: v.package,
    packageName: pkg?.name ?? "Custom quote",
    priceUsd: pkg?.price ?? null,
    country: v.country,
    vatNumber: v.vatNumber,
    businessConfirmed: true,
    footageUrl: v.footageUrl,
    deadline: v.deadline,
    references: v.references,
    music: v.music as OrderDetails["music"],
    aiVisuals: v.aiVisuals as OrderDetails["aiVisuals"],
    mustInclude: v.mustInclude,
    scope: v.package === CUSTOM_PACKAGE ? v.scope : null,
    niche,
  };
  if (niche) {
    const fields = Object.fromEntries(
      NICHE_FIELDS[niche].map((f) => [f, (v as Record<string, unknown>)[f] ?? null]),
    ) as never;
    details[NICHE_KEY[niche]] = fields;
  }
  return details;
}

/** Validate a raw submission (JSON body or form values). First error per field wins. */
export function validateOrder(raw: unknown, rules: OrderRules): OrderValidation {
  const parsed = orderSubmissionSchema(rules).safeParse(raw ?? {});
  if (parsed.success) {
    const v = parsed.data;
    return {
      ok: true,
      data: {
        name: v.name,
        businessName: v.businessName,
        email: v.email,
        details: toOrderDetails(v),
        sourcePath: v.sourcePath,
        utm: v.utm,
        requestId: v.requestId,
      },
    };
  }
  const errors: OrderFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = String(issue.path[0] ?? "requestId") as keyof OrderFieldErrors;
    if (!errors[field]) errors[field] = toCode(issue.message);
  }
  return { ok: false, errors };
}

function toCode(message: string): OrderErrorCode {
  return (ORDER_ERROR_CODES as readonly string[]).includes(message) ? (message as OrderErrorCode) : "invalid_request";
}
