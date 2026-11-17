"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { Gtag } from "@/lib/analytics";
import {
  ANALYTICS_COOKIE_SECONDS,
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  isAnalyticsCookie,
  parseConsent,
  readCookie,
  serializeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/*
 * Cookie consent. `analyticsId` is set only when analytics is configured AND approved (env: ANALYTICS_MEASUREMENT_ID
 * with ANALYTICS_CONSENT_APPROVED). Without it there is nothing to consent to: no banner, nothing stored, nothing loaded.
 * With it, Google Analytics loads only after the visitor accepts, and withdrawing removes its cookies.
 */

type Consent = {
  /** An optional service exists to choose about. */
  enabled: boolean;
  /** False during the server render and hydration; the stored choice is known only in the browser. */
  known: boolean;
  choice: ConsentChoice | null;
  choose: (analytics: boolean) => void;
};

const ConsentContext = createContext<Consent>({ enabled: false, known: false, choice: null, choose: () => {} });
export const useConsent = () => useContext(ConsentContext);

// The cookie as an external store, so every component sees the same choice without effects.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const snapshot = () => readCookie(document.cookie, CONSENT_COOKIE) ?? "";
const serverSnapshot = () => null;

function removeAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, ...host.split(".").map((_, i, parts) => `.${parts.slice(i).join(".")}`).slice(0, -1)];
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim() ?? "";
    if (!isAnalyticsCookie(name)) continue;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`;
  }
}

/** Google's documented opt-out switch: while true, gtag sends nothing at all (not even consent-mode pings). */
function setOptOut(id: string, off: boolean) {
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = off;
}

/** Loads GA4 once, with ads storage denied; only ever called after consent. */
function loadAnalytics(id: string) {
  setOptOut(id, false);
  if (window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  const gtag: Gtag = function gtag() {
    // gtag.js reads the `arguments` object itself, so it is pushed as is.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  gtag("js", new Date());
  gtag("config", id, { cookie_expires: ANALYTICS_COOKIE_SECONDS });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export function ConsentProvider({ analyticsId, children }: { analyticsId: string | null; children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const known = raw !== null;
  const choice = useMemo(() => (raw === null ? null : parseConsent(raw)), [raw]);
  const enabled = Boolean(analyticsId);
  const granted = enabled && choice?.analytics === true;

  const choose = useCallback(
    (analytics: boolean) => {
      const secure = location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${CONSENT_COOKIE}=${serializeConsent(analytics)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
      if (!analytics) {
        // Withdrawal stops everything at once: no further hits for the rest of the visit, and the cookies go.
        if (analyticsId) setOptOut(analyticsId, true);
        window.gtag?.("consent", "update", { analytics_storage: "denied" });
        removeAnalyticsCookies();
      }
      listeners.forEach((l) => l());
    },
    [analyticsId],
  );

  // Loading a third-party script is a side effect of the stored choice, so it lives in an effect.
  useEffect(() => {
    if (granted && analyticsId) loadAnalytics(analyticsId);
  }, [granted, analyticsId]);

  const value = useMemo<Consent>(() => ({ enabled, known, choice, choose }), [enabled, known, choice, choose]);
  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
