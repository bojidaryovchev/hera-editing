import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { afterEach, describe, expect, it, vi } from "vitest";
import config from "../../next.config";
import { ConfigError } from "../../src/lib/config/env";

/** A complete, fictional production configuration (never real values). */
const PRODUCTION: Record<string, string> = {
  APP_ENV: "production",
  NEXT_PUBLIC_SITE_URL: "https://www.example.bg",
  NEXT_PUBLIC_BRAND_NAME: "Hera Editing",
  NEXT_PUBLIC_CONTACT_EMAIL: "office@example.bg",
  DATABASE_URL: "postgres://user:pass@db.example.bg:5432/hera",
  NOTIFICATION_EMAIL_TO: "owner@example.bg",
  MAIL_PROVIDER: "resend",
  RESEND_API_KEY: "re_fictional_key",
  MAIL_FROM: "Hera Editing <noreply@example.bg>",
  RATE_LIMIT_SALT: "a-fictional-salt-that-is-long-enough-123",
};

function stub(vars: Record<string, string | undefined>) {
  for (const [k, v] of Object.entries(vars)) vi.stubEnv(k, v);
}
const headersOf = async (phase: string) => {
  const rules = (await config(phase).headers?.()) ?? [];
  return Object.fromEntries((rules[0]?.headers ?? []).map((h) => [h.key, h.value]));
};

afterEach(() => vi.unstubAllEnvs());

describe("next.config: production gates", () => {
  it("refuses to build production with a missing launch input, naming the variable only", () => {
    stub({ ...PRODUCTION, NEXT_PUBLIC_SITE_URL: undefined });
    expect(() => config(PHASE_PRODUCTION_BUILD)).toThrow(ConfigError);
    expect(() => config(PHASE_PRODUCTION_BUILD)).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });

  it("builds production with a complete configuration", async () => {
    stub(PRODUCTION);
    const h = await headersOf(PHASE_PRODUCTION_BUILD);
    expect(h["Strict-Transport-Security"]).toMatch(/^max-age=/);
    expect(h["Content-Security-Policy"]).toContain("upgrade-insecure-requests");
    expect(h).not.toHaveProperty("X-Robots-Tag");
  });

  it("never serves the stock clips in production, even by direct URL", async () => {
    stub(PRODUCTION);
    const rewrites = (await config(PHASE_PRODUCTION_BUILD).rewrites?.()) as { beforeFiles: { source: string }[] };
    // The English section's own rewrites while it is off follow (tests/unit/en-release.test.ts).
    expect(rewrites.beforeFiles[0]).toMatchObject({ source: "/placeholder-media/:path*" });
  });

  it("keeps previews noindex and serves their labelled stock", async () => {
    stub({ APP_ENV: "staging", NEXT_PUBLIC_SITE_URL: "https://preview.example.bg" });
    expect((await headersOf(PHASE_PRODUCTION_BUILD))["X-Robots-Tag"]).toBe("noindex, nofollow");
    expect(await config(PHASE_PRODUCTION_BUILD).rewrites?.()).toMatchObject({ beforeFiles: [] });
  });

  it("allows eval and the reload socket only for the development server", async () => {
    stub({ APP_ENV: "development" });
    expect((await headersOf(PHASE_DEVELOPMENT_SERVER))["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect((await headersOf(PHASE_PRODUCTION_BUILD))["Content-Security-Policy"]).not.toContain("'unsafe-eval'");
  });
});
