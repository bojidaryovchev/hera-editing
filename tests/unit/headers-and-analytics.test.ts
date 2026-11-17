import { describe, expect, it } from "vitest";
import { MEDIA, mediaUrls } from "../../src/content/media";
import { analyticsAllowed, track } from "../../src/lib/analytics";
import { CONSENT_COOKIE, serializeConsent } from "../../src/lib/consent";
import {
  contentSecurityPolicy,
  mediaOrigins,
  securityHeaders,
  type SecurityInput,
} from "../../src/lib/security/headers";

const BASE: SecurityInput = {
  dev: false,
  https: true,
  indexable: true,
  analytics: false,
  turnstile: false,
  mediaOrigins: [],
};
const directive = (csp: string, name: string) => csp.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";

describe("content security policy", () => {
  it("locks everything to this origin when no third party is configured", () => {
    const csp = contentSecurityPolicy(BASE);
    expect(csp).not.toMatch(/https:\/\/(?!\*)/);
    expect(csp).not.toContain("google");
    expect(csp).not.toContain("cloudflare");
    expect(directive(csp, "default-src")).toBe("default-src 'self'");
    expect(directive(csp, "object-src")).toBe("object-src 'none'");
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(csp, "frame-src")).toBe("frame-src 'none'");
    expect(directive(csp, "form-action")).toBe("form-action 'self'");
    expect(directive(csp, "base-uri")).toBe("base-uri 'self'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("allows Google Analytics hosts only when analytics is configured", () => {
    const csp = contentSecurityPolicy({ ...BASE, analytics: true });
    expect(directive(csp, "script-src")).toContain("https://*.googletagmanager.com");
    expect(directive(csp, "connect-src")).toContain("https://*.google-analytics.com");
    expect(directive(csp, "connect-src")).toContain("https://*.analytics.google.com");
    expect(directive(csp, "img-src")).toContain("https://*.google-analytics.com");
  });

  it("allows Cloudflare Turnstile's script and frame only when configured", () => {
    const csp = contentSecurityPolicy({ ...BASE, turnstile: true });
    expect(directive(csp, "script-src")).toContain("https://challenges.cloudflare.com");
    expect(directive(csp, "frame-src")).toBe("frame-src https://challenges.cloudflare.com");
  });

  it("adds eval and the reload socket in development only", () => {
    const csp = contentSecurityPolicy({ ...BASE, dev: true, https: false });
    expect(directive(csp, "script-src")).toContain("'unsafe-eval'");
    expect(directive(csp, "connect-src")).toContain("ws:");
    expect(csp).not.toContain("upgrade-insecure-requests");
  });

  it("allows a footage CDN for video and posters", () => {
    const csp = contentSecurityPolicy({ ...BASE, mediaOrigins: ["https://media.example.bg"] });
    expect(directive(csp, "media-src")).toBe("media-src 'self' https://media.example.bg");
    expect(directive(csp, "img-src")).toContain("https://media.example.bg");
  });
});

describe("security headers", () => {
  const byKey = (i: SecurityInput) => Object.fromEntries(securityHeaders(i).map((h) => [h.key, h.value]));

  it("sends the standard hardening headers everywhere", () => {
    const h = byKey(BASE);
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["Permissions-Policy"]).toContain("camera=()");
    expect(h["Content-Security-Policy"]).toBe(contentSecurityPolicy(BASE));
  });

  it("asks browsers to remember https only on an https site", () => {
    expect(byKey(BASE)["Strict-Transport-Security"]).toMatch(/^max-age=\d+/);
    expect(byKey({ ...BASE, https: false })).not.toHaveProperty("Strict-Transport-Security");
  });

  it("says noindex everywhere except production", () => {
    expect(byKey(BASE)).not.toHaveProperty("X-Robots-Tag");
    expect(byKey({ ...BASE, indexable: false })["X-Robots-Tag"]).toBe("noindex, nofollow");
  });

  it("finds footage hosts from absolute https URLs only", () => {
    expect(
      mediaOrigins([
        "/placeholder-media/a.mp4",
        "https://cdn.example.bg/a.mp4",
        "https://cdn.example.bg/b.jpg",
        "http://plain.example.bg/c.mp4",
      ]),
    ).toEqual(["https://cdn.example.bg"]);
    expect(mediaOrigins(mediaUrls())).toEqual([]);
    expect(mediaUrls()).toContain(MEDIA.hero.wide.video);
  });
});

describe("analytics events respect consent (acceptance F)", () => {
  it("are allowed only while the stored choice is yes", () => {
    expect(analyticsAllowed("")).toBe(false);
    expect(analyticsAllowed(`${CONSENT_COOKIE}=${serializeConsent(false)}`)).toBe(false);
    expect(analyticsAllowed(`other=1; ${CONSENT_COOKIE}=${serializeConsent(true)}`)).toBe(true);
    expect(analyticsAllowed(`${CONSENT_COOKIE}=garbage`)).toBe(false);
  });

  it("do nothing outside the browser", () => {
    expect(() => track({ name: "lead_form_view" })).not.toThrow();
  });
});
