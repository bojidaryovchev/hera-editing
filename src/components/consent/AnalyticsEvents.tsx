"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { TIERS } from "@/content/shared";
import { track } from "@/lib/analytics";

/**
 * Quote-button clicks, seen from one document listener instead of turning every server-rendered link into a client
 * component. A quote button is any link to /kontakti that says where it came from (`from`); a tier's button also
 * carries `volume`, which names the package. Attached only when analytics is configured at all.
 */
export function AnalyticsEvents() {
  const { enabled } = useConsent();
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== "/kontakti" || !url.searchParams.has("from")) return;
      const source_page = location.pathname;
      track({ name: "cta_quote_click", params: { source_page } });
      const tier = TIERS.find((t) => t.volume === url.searchParams.get("volume"));
      if (tier) track({ name: "package_interest", params: { tier: tier.id, source_page } });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);
  return null;
}
