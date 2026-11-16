/**
 * The visitor's cookie choice (website/03 Analytics; acceptance F). Stored only once a choice is made, and only while
 * an optional service exists to choose about. One first-party cookie, no server state.
 */
export const CONSENT_COOKIE = "hera_consent";
/** About six months, then the visitor is asked again. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182;
export const CONSENT_VERSION = 1;
/** GA cookie lifetime when analytics is accepted (13 months, below GA's 2-year default). */
export const ANALYTICS_COOKIE_SECONDS = 60 * 60 * 24 * 395;

export type ConsentChoice = { analytics: boolean; version: number; at: number };

/** "v1.a1.1767225600" → version 1, analytics granted, chosen at that Unix time. Anything else is no choice. */
export function parseConsent(raw: string | null | undefined): ConsentChoice | null {
  const m = /^v(\d+)\.a([01])\.(\d{1,12})$/.exec(raw ?? "");
  if (!m) return null;
  const version = Number(m[1]);
  if (version !== CONSENT_VERSION) return null;
  return { version, analytics: m[2] === "1", at: Number(m[3]) };
}

export function serializeConsent(analytics: boolean, now = Date.now()): string {
  return `v${CONSENT_VERSION}.a${analytics ? 1 : 0}.${Math.floor(now / 1000)}`;
}

/** The value of one cookie from a document.cookie string. */
export function readCookie(cookieString: string, name: string): string | null {
  for (const part of cookieString.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

/** Google Analytics cookies to remove when consent is withdrawn. */
export function isAnalyticsCookie(name: string): boolean {
  return name === "_ga" || name.startsWith("_ga_") || name === "_gid";
}
