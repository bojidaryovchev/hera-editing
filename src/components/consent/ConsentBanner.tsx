"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CONSENT_BANNER } from "@/content/legal/cookies";
import { route } from "@/lib/site/nav";
import { useConsent } from "./ConsentProvider";

export type ConsentBannerCopy = {
  label: string;
  text: string;
  rejectOptional: string;
  acceptAll: string;
  settings: string;
};

/**
 * Shown only while an optional service exists and no choice is stored. Not a blocking pop-up (IA:79): it sits at the
 * bottom, the page stays usable, and refusing is exactly as easy as accepting (same size, same style). The copy and
 * the settings page are the Bulgarian site's unless the English section passes its own.
 */
export function ConsentBanner({
  copy = CONSENT_BANNER,
  settingsHref = "/biskvitki",
}: {
  copy?: ConsentBannerCopy;
  settingsHref?: "/biskvitki" | "/en/cookies";
}) {
  const { enabled, known, choice, choose } = useConsent();
  const visible = enabled && known && !choice;
  const ref = useRef<HTMLElement>(null);

  // While open, the page reserves the banner's height at its end and for focus scrolling, so nothing hides behind it.
  useEffect(() => {
    const el = ref.current;
    if (!visible || !el) return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() => root.style.setProperty("--cb-h", `${el.offsetHeight + 16}px`));
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--cb-h");
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <section ref={ref} className="cb" aria-label={copy.label}>
      <p className="cb__text">{copy.text}</p>
      <div className="cb__actions">
        <button type="button" className="btn btn--sec btn--sm" onClick={() => choose(false)}>
          {copy.rejectOptional}
        </button>
        <button type="button" className="btn btn--sec btn--sm" onClick={() => choose(true)}>
          {copy.acceptAll}
        </button>
        <Link className="cb__link" href={route(settingsHref)}>
          {copy.settings}
        </Link>
      </div>
    </section>
  );
}
