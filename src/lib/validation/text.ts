import { z } from "@/lib/validation/zod";

/**
 * Text rules shared by the Bulgarian quote form (lead.ts) and the English order form (order.ts): normalising what
 * people type, and recognising emails, phones and web addresses. Moved here unchanged from lead.ts, which re-exports
 * them, so both schemas keep exactly one definition; isValidLink is the order form's own.
 */

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
export function isValidEmail(value: string, max = 254): boolean {
  return value.length <= max && EMAIL.safeParse(value).success;
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

/** A campaign parameter (utm_*): short, URL-safe characters only, otherwise dropped. */
export function normalizeUtmValue(value: unknown, max = 100): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length === 0 || v.length > max) return null;
  return /^[A-Za-z0-9_.+\-~%]+$/.test(v) ? v : null;
}

/**
 * A link to footage, files or a channel: a web address with or without "https://". Never a script or data URL,
 * spaces or markup characters, credentials, or a host without a dot.
 */
export function isValidLink(value: string): boolean {
  if (DANGEROUS_SCHEME.test(value) || /[<>"`\\{}^|\s]/.test(value)) return false;
  try {
    const url = new URL(ANY_URL_SCHEME.test(value) ? value : `https://${value}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return url.hostname.includes(".") && !url.username && !url.password;
  } catch {
    return false;
  }
}
