"use client";

import { useEffect, useRef } from "react";

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<Turnstile> | undefined;

function loadTurnstile(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile_missing")));
    s.onerror = () => {
      loading = undefined;
      reject(new Error("turnstile_load_failed"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

/**
 * Cloudflare Turnstile, rendered only when both keys are configured (TS:Spam). Invisible unless Cloudflare needs an
 * interaction; its token travels with the form as `cf-turnstile-response` and the server verifies it. A token works
 * once, so the widget resets after every answer from the server (`resetKey`).
 */
export function TurnstileField({
  siteKey,
  resetKey,
  language = "bg",
}: {
  siteKey: string;
  resetKey: number;
  /** The widget's language: the Bulgarian form's by default, "en" on the English order form. */
  language?: "bg" | "en";
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((t) => {
        if (cancelled || !box.current || widget.current) return;
        widget.current = t.render(box.current, {
          sitekey: siteKey,
          language,
          appearance: "interaction-only",
          action: "lead",
        });
      })
      .catch(() => {
        // Without a token the server refuses the request, and the form shows its request error.
      });
    return () => {
      cancelled = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey, language]);

  useEffect(() => {
    if (resetKey > 0 && widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  return <div ref={box} className="lf__human" />;
}
