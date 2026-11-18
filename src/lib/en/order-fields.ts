/**
 * The English order form's fields, choices, limits and the EU rule, without Zod (like lead-fields.ts), so the browser
 * can draw the form before the validation rules (src/lib/validation/order.ts) have loaded. The fields are the sales
 * kit's brief (docs/sales-kit-remote-editing.md §5): common ones, plus a few per niche.
 */

export const ORDER_LIMITS = {
  name: { min: 2, max: 100 },
  businessName: { min: 2, max: 120 },
  email: { max: 254 },
  vatNumber: { max: 40 },
  url: { max: 500 },
  line: { max: 200 },
  text: { max: 1000 },
  scope: { min: 10, max: 2000 },
  utm: { max: 100 },
} as const;

export const MUSIC_CHOICES = ["client", "library", "none"] as const;
export type MusicChoice = (typeof MUSIC_CHOICES)[number];

export const AI_CHOICES = ["allowed", "not_allowed"] as const;
export type AiChoice = (typeof AI_CHOICES)[number];

export const VERSION_CHOICES = ["both", "branded", "unbranded"] as const;
export type VersionChoice = (typeof VERSION_CHOICES)[number];

/** The package value for "something else": a custom quote (strategy §5). */
export const CUSTOM_PACKAGE = "custom";

/** Fields every order has, as the form holds them (strings). */
export const COMMON_FIELDS = [
  "package",
  "name",
  "businessName",
  "email",
  "country",
  "vatNumber",
  "businessConfirmed",
  "footageUrl",
  "deadline",
  "references",
  "music",
  "aiVisuals",
  "mustInclude",
  "scope",
] as const;

/** Fields that belong to one niche; shown, validated and stored only when the chosen package is in it. */
export const NICHE_FIELDS = {
  wedding: ["couple", "keyMoments", "vowsAudio", "grade", "styleFilm"],
  youtube: ["script", "voiceover", "channel", "stockLibrary"],
  "real-estate": ["listing", "roomOrder", "branding", "versions"],
} as const;

export type NicheKey = keyof typeof NICHE_FIELDS;
export type CommonField = (typeof COMMON_FIELDS)[number];
export type NicheField = (typeof NICHE_FIELDS)[NicheKey][number];
export type OrderField = CommonField | NicheField;

export const ORDER_FORM_FIELDS: readonly OrderField[] = [
  ...COMMON_FIELDS,
  ...NICHE_FIELDS.wedding,
  ...NICHE_FIELDS.youtube,
  ...NICHE_FIELDS["real-estate"],
];

/** Link fields: a web address (with or without https://). */
export const URL_FIELDS: readonly OrderField[] = [
  "footageUrl",
  "vowsAudio",
  "styleFilm",
  "script",
  "voiceover",
  "channel",
  "branding",
];

/** Short one-line fields and their limits (the rest of the free text is multi-line). */
export const LINE_FIELDS: readonly OrderField[] = ["couple", "grade", "stockLibrary", "listing"];
export const TEXT_FIELDS: readonly OrderField[] = ["references", "mustInclude", "keyMoments", "roomOrder"];

export type OrderFormValues = Record<OrderField, string>;

export const EMPTY_ORDER_FORM: OrderFormValues = Object.fromEntries(
  ORDER_FORM_FIELDS.map((f) => [f, ""]),
) as OrderFormValues;

/** What an order stores in leads.details (the brief), besides the contact columns. Version it if it changes. */
export type OrderDetails = {
  version: 1;
  /** A package id from src/content/en/packages.ts, or "custom". */
  package: string;
  /** The package's name and list price when ordered, so a later price change never rewrites an order. */
  packageName: string;
  priceUsd: number | null;
  /** ISO 3166-1 alpha-2. */
  country: string;
  vatNumber: string | null;
  businessConfirmed: true;
  footageUrl: string | null;
  /** YYYY-MM-DD */
  deadline: string | null;
  references: string | null;
  music: MusicChoice;
  aiVisuals: AiChoice;
  mustInclude: string | null;
  /** What the job is, for a custom quote. */
  scope: string | null;
  niche: NicheKey | null;
  wedding?: {
    couple: string | null;
    keyMoments: string | null;
    vowsAudio: string | null;
    grade: string | null;
    styleFilm: string | null;
  };
  youtube?: { script: string | null; voiceover: string | null; channel: string | null; stockLibrary: string | null };
  realEstate?: {
    listing: string | null;
    roomOrder: string | null;
    branding: string | null;
    versions: VersionChoice | null;
  };
};

/** The EU's 27 member states (ISO 3166-1 alpha-2; Greece is GR, its VAT prefix EL). */
export const EU_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
] as const;

/** Where the company is: selling to a Bulgarian business needs no other state's VAT registration. */
export const HOME_COUNTRY = "BG";

/**
 * Whether an order from this country must be refused for now: a business in another EU state needs the art. 97а
 * VAT registration before the first supply (strategy §9, decision L38), so those are refused unless EN_EU_ORDERS.
 */
export function isEuBlocked(country: string, euOrders: boolean): boolean {
  return !euOrders && country !== HOME_COUNTRY && (EU_COUNTRIES as readonly string[]).includes(country);
}

/** Every ISO 3166-1 alpha-2 country and territory; their English names come from Intl.DisplayNames. */
export const COUNTRY_CODES = (
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ " +
  "CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR " +
  "GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO " +
  "JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR " +
  "MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO " +
  "RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV " +
  "TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW"
).split(" ");

export const isCountryCode = (v: string): boolean => COUNTRY_CODES.includes(v);
