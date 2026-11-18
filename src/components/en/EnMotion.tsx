"use client";

import { useEffect } from "react";

/*
 * Motion for the English pages (decision 7: motion is the concept; it respects reduced motion, never hijacks the
 * scroll and keeps the mobile budget). The markup is server-rendered and complete; this only adds behaviour. GSAP
 * loads after the first frame is painted, as on the Bulgarian homepage (tests/unit/bundle-boundaries.test.ts).
 * Without motion (html:not(.motion), or if GSAP fails to load) every clip shows complete.
 *
 * The four-step track: the scroll scrubs a playhead along it (down it, on phones), each clip filling as the
 * playhead passes and lighting up while it is under it. No pinning: the page scrolls at its own speed.
 */

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerT = typeof import("gsap/ScrollTrigger").ScrollTrigger;

function track(gsap: Gsap, ScrollTrigger: ScrollTriggerT, section: HTMLElement) {
  const ph = section.querySelector<HTMLElement>(".en-track__ph");
  const lane = section.querySelector<HTMLElement>(".en-track");
  const clips = Array.from(section.querySelectorAll<HTMLElement>(".en-clip"));
  const bars = clips.map((c) => c.querySelector<HTMLElement>(".en-clip__bar i"));
  if (!ph || !lane || clips.length === 0) return () => {};
  section.classList.add("is-live");

  const update = (progress: number, vertical: boolean) => {
    const box = lane.getBoundingClientRect();
    const size = vertical ? box.height : box.width;
    const at = progress * size;
    gsap.set(ph, vertical ? { y: at, x: 0 } : { x: at, y: 0 });
    clips.forEach((clip, i) => {
      const r = clip.getBoundingClientRect();
      const start = vertical ? r.top - box.top : r.left - box.left;
      const len = vertical ? r.height : r.width;
      const fill = Math.min(1, Math.max(0, (at - start) / len));
      const bar = bars[i];
      if (bar) gsap.set(bar, { scaleX: fill });
      clip.classList.toggle("on", fill > 0 && fill < 1);
      clip.classList.toggle("done", fill >= 1);
    });
  };

  const mm = gsap.matchMedia();
  mm.add({ vertical: "(max-width: 899px)", horizontal: "(min-width: 900px)" }, (ctx) => {
    const vertical = Boolean(ctx.conditions?.vertical);
    const st = ScrollTrigger.create({
      trigger: lane,
      start: vertical ? "top 75%" : "top 70%",
      end: vertical ? "bottom 55%" : "bottom 45%",
      scrub: true,
      onUpdate: (self) => update(self.progress, vertical),
      onRefresh: (self) => update(self.progress, vertical),
    });
    update(st.progress, vertical);
    return () => st.kill();
  });
  return () => {
    mm.revert();
    section.classList.remove("is-live");
  };
}

export function EnMotion() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-en-steps]"));
    if (sections.length === 0) return;
    let cancelled = false;
    let cleanups: Array<() => void> = [];
    // After the first frame is painted: the headline never waits for the motion library.
    const frame = requestAnimationFrame(() => {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled) return;
          gsap.registerPlugin(ScrollTrigger);
          cleanups = sections.map((s) => track(gsap, ScrollTrigger, s));
        })
        .catch(() => {
          // Without GSAP the track stays complete, which is the reduced-motion design.
        });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      cleanups.forEach((c) => c());
    };
  }, []);
  return null;
}
