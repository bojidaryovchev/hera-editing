"use client";

import { useEffect } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { PACKAGES } from "@/content/en/packages";
import { TIERS } from "@/content/shared";
import { track } from "@/lib/analytics";

/**
 * Quote-button clicks, seen from one document listener instead of turning every server-rendered link into a client
 * component. A quote button is any link to /kontakti that says where it came from (`from`); a tier's button also
 * carries `volume`, which names the package. In the English section the order buttons lead to /en/order, a
 * package's with `package`, and a sample's link carries `data-sample` (its id). Attached only when analytics is
 * configured at all.
 */
export function AnalyticsEvents() {
  const { enabled } = useConsent();
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const sample = link.dataset.sample;
      if (sample) {
        track({ name: "portfolio_video_play", params: { project: sample } });
        return;
      }
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      const quote = url.pathname === "/kontakti" && url.searchParams.has("from");
      const order = url.pathname === "/en/order";
      if (!quote && !order) return;
      const source_page = location.pathname;
      track({ name: "cta_quote_click", params: { source_page } });
      if (order) {
        const pkg = PACKAGES.find((p) => p.id === url.searchParams.get("package"));
        if (pkg) track({ name: "package_interest", params: { tier: pkg.id, source_page } });
        return;
      }
      const tier = TIERS.find((t) => t.volume === url.searchParams.get("volume"));
      if (tier) track({ name: "package_interest", params: { tier: tier.id, source_page } });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);
  return null;
}
