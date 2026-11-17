import { CONSENT_COOKIE, parseConsent, readCookie } from "@/lib/consent";

/**
 * Browser analytics events (TS:Analytics). Parameters are page paths, tiers and status codes only: never a name,
 * contact, message or anything typed into the form. Events go nowhere unless the visitor accepted analytics; the
 * lead itself never depends on them (the database is the source of truth).
 */
export type AnalyticsEvent =
  | { name: "cta_quote_click"; params: { source_page: string } }
  | { name: "package_interest"; params: { tier: string; source_page: string } }
  | { name: "lead_form_view" }
  | { name: "lead_form_attempt" }
  | { name: "lead_form_success" }
  | { name: "lead_form_error"; params: { code: LeadFormErrorCode } }
  | { name: "portfolio_video_play"; params: { project: string } };

export type LeadFormErrorCode = "invalid_client" | "invalid" | "rate_limited" | "unavailable";

export type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** True only while the stored choice says yes; read at the moment of sending, so a withdrawal applies at once. */
export function analyticsAllowed(cookieString: string): boolean {
  return parseConsent(readCookie(cookieString, CONSENT_COOKIE))?.analytics === true;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!analyticsAllowed(document.cookie)) return;
  window.gtag("event", event.name, "params" in event ? event.params : {});
}
