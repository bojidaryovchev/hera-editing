/**
 * HTTP security headers for every response (next.config.ts). Imported by the config loader, so this module uses
 * relative imports only.
 *
 * The CSP allows inline scripts: the pages are static (prerendered for speed), and Next.js needs inline scripts for
 * hydration, which only per-request nonces could replace (forcing every page to render on each request). Nothing
 * user-supplied is ever rendered as HTML, and everything else is locked to this origin. Third parties appear only
 * when configured: Google Analytics (after consent; Google's documented GA4 hosts) and Cloudflare Turnstile.
 */
export type SecurityInput = {
  /** `next dev`: React's debugging needs eval and the reloader a websocket. */
  dev: boolean;
  /** Served over https: browsers are told to upgrade any http subresource and remember https (HSTS). */
  https: boolean;
  /** Only production may be indexed; everything else is noindex. */
  indexable: boolean;
  analytics: boolean;
  turnstile: boolean;
  /** Origins hosting the agency's footage, when it lives on a CDN instead of this site. */
  mediaOrigins: readonly string[];
};

const GA_SCRIPT = ["https://*.googletagmanager.com"];
const GA_CONNECT = ["https://*.google-analytics.com", "https://*.analytics.google.com", "https://*.googletagmanager.com"];
const GA_IMG = ["https://*.google-analytics.com", "https://*.googletagmanager.com"];
const TURNSTILE = ["https://challenges.cloudflare.com"];

const list = (...parts: (readonly string[] | false)[]) => parts.flatMap((p) => (p ? [...p] : []));

export function contentSecurityPolicy(i: SecurityInput): string {
  const directives: [string, string[]][] = [
    ["default-src", ["'self'"]],
    ["script-src", list(["'self'", "'unsafe-inline'"], i.dev && ["'unsafe-eval'"], i.analytics && GA_SCRIPT, i.turnstile && TURNSTILE)],
    // Inline style attributes and the toast library's injected styles.
    ["style-src", ["'self'", "'unsafe-inline'"]],
    ["img-src", list(["'self'", "data:", "blob:"], i.analytics && GA_IMG, i.mediaOrigins)],
    ["media-src", list(["'self'"], i.mediaOrigins)],
    ["font-src", ["'self'"]],
    ["connect-src", list(["'self'"], i.dev && ["ws:"], i.analytics && GA_CONNECT, i.turnstile && TURNSTILE)],
    ["frame-src", i.turnstile ? [...TURNSTILE] : ["'none'"]],
    ["worker-src", ["'self'"]],
    ["manifest-src", ["'self'"]],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-ancestors", ["'none'"]],
  ];
  const policy = directives.map(([name, values]) => `${name} ${values.join(" ")}`);
  if (i.https) policy.push("upgrade-insecure-requests");
  return policy.join("; ");
}

export function securityHeaders(i: SecurityInput): { key: string; value: string }[] {
  const headers = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(i) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  ];
  if (i.https) headers.push({ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" });
  if (!i.indexable) headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  return headers;
}

/** Origins of absolute media URLs (footage on a CDN); site-relative paths need nothing extra. */
export function mediaOrigins(urls: readonly string[]): string[] {
  const origins = new Set<string>();
  for (const url of urls) {
    if (!/^https:\/\//i.test(url)) continue;
    try {
      origins.add(new URL(url).origin);
    } catch {
      // Not a URL; the build's media checks report it.
    }
  }
  return [...origins].sort();
}
