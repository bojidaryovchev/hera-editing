import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from "next/constants";
import { mediaUrls } from "./src/content/media";
import { parseServerEnv, resolveAppEnv } from "./src/lib/config/env";
import { mediaOrigins, securityHeaders } from "./src/lib/security/headers";

export default function config(phase: string): NextConfig {
  const env = process.env;
  const appEnv = resolveAppEnv(env);
  // Production refuses to build or start with a missing or invalid launch input (the error names variables, never
  // values), so canonical links, contacts and mail can never go live as placeholders.
  if (appEnv === "production" && (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER))
    parseServerEnv(env);

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
      // The quote request is the only server action; like POST /api/leads it stays small (the longest valid one is ~6 KB).
      serverActions: { bodySizeLimit: "16kb" },
      // Two root layouts (the site and the admin panel) leave no layout for a 404 at an unknown address;
      // app/global-not-found.tsx is the documented answer for exactly that case.
      globalNotFound: true,
    },
    async headers() {
      return [{ source: "/:path*", headers }];
    },
    // The labelled stock clips stay in the repository for previews, but production never serves them, even by
    // direct URL (decision L22): the request is rewritten to a path that does not exist, so it answers 404.
    async rewrites() {
      return {
        beforeFiles:
          appEnv === "production"
            ? [{ source: "/placeholder-media/:path*", destination: "/__placeholder-media-not-served" }]
            : [],
        afterFiles: [],
        fallback: [],
      };
    },
  };
}
