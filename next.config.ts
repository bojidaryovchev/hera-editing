import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from "next/constants";
import { mediaUrls } from "./src/content/media";
import { enSectionEnabled, parseServerEnv, resolveAppEnv } from "./src/lib/config/env";
import { assertEnLaunchReady } from "./src/lib/en/release";
import { mediaOrigins, securityHeaders } from "./src/lib/security/headers";

export default function config(phase: string): NextConfig {
  const env = process.env;
  const appEnv = resolveAppEnv(env);
  // Production refuses to build or start with a missing or invalid launch input (the error names variables, never
  // values), so canonical links, contacts and mail can never go live as placeholders.
  if (appEnv === "production" && (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER)) {
    parseServerEnv(env);
    // With the English section switched on, production also needs its signed-off terms and approved notice (L38).
    assertEnLaunchReady(env);
  }
  const enSection = enSectionEnabled(env);

  const headers = securityHeaders({
    dev: phase === PHASE_DEVELOPMENT_SERVER,
    https: (env.NEXT_PUBLIC_SITE_URL ?? "").trim().startsWith("https://"),
    indexable: appEnv === "production",
    analytics: Boolean(env.ANALYTICS_MEASUREMENT_ID?.trim()) && env.ANALYTICS_CONSENT_APPROVED?.trim() === "true",
    turnstile: Boolean(env.TURNSTILE_SITE_KEY?.trim() && env.TURNSTILE_SECRET_KEY?.trim()),
    mediaOrigins: mediaOrigins(mediaUrls()),
  });

  return {
    reactStrictMode: true,
    poweredByHeader: false,
    typedRoutes: true,
    // Separate build folders let the end-to-end suite run two differently
    // configured production builds side by side.
    distDir: env.NEXT_DIST_DIR || ".next",
    experimental: {
      // Server actions: the quote request (~6 KB at most, validated again inside) and the admin panel's answers
      // (10,000 characters, which in Cyrillic is about 20 KB).
      serverActions: { bodySizeLimit: "64kb" },
      // Two root layouts (the site and the admin panel) leave no layout for a 404 at an unknown address;
      // app/global-not-found.tsx is the documented answer for exactly that case.
      globalNotFound: true,
    },
    async headers() {
      // The admin panel is never indexed or cached, in any environment (decision L32).
      const admin = [
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        { key: "Cache-Control", value: "no-store" },
      ];
      return [
        { source: "/:path*", headers },
        { source: "/admin", headers: admin },
        { source: "/admin/:path*", headers: admin },
      ];
    },
    // The labelled stock clips stay in the repository for previews, but production never serves them, even by
    // direct URL (decision L22): the request is rewritten to a path that does not exist, so it answers 404.
    // The English section /en, while switched off (production's default, decision L38), does not exist: every
    // address under it is rewritten the same way, so it answers the site's 404 and no page of it can be reached.
    async rewrites() {
      return {
        beforeFiles: [
          ...(appEnv === "production"
            ? [{ source: "/placeholder-media/:path*", destination: "/__placeholder-media-not-served" }]
            : []),
          ...(enSection
            ? []
            : [
                { source: "/en", destination: "/__en-section-off" },
                { source: "/en/:path*", destination: "/__en-section-off" },
              ]),
        ],
        afterFiles: [],
        fallback: [],
      };
    },
  };
}
