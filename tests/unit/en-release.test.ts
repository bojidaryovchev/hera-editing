import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { afterEach, describe, expect, it, vi } from "vitest";
import config from "../../next.config";
import sitemap from "../../src/app/sitemap";
import { EN_PRIVACY_NOTICE } from "../../src/content/en/legal/privacy";
import { EN_TERMS } from "../../src/content/en/terms";
import { ConfigError, enSectionEnabled, euOrdersEnabled, parseServerEnv } from "../../src/lib/config/env";
import { isEuBlocked } from "../../src/lib/en/order-fields";
import {
  assertEnLaunchReady,
  assertEnPrivacyReady,
  assertEnTermsSignedOff,
  enOrdersOpen,
} from "../../src/lib/en/release";
import { ReleaseGateError } from "../../src/lib/site/release";

afterEach(() => vi.unstubAllEnvs());

/** A complete, fictional production configuration (never real values), as in next-config.test.ts. */
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

describe("the English section's switch (EN_SECTION_ENABLED, decision L38)", () => {
  it("is off in production unless set to true", () => {
    expect(enSectionEnabled({ APP_ENV: "production" })).toBe(false);
    expect(enSectionEnabled({ VERCEL_ENV: "production" })).toBe(false);
    expect(enSectionEnabled({ APP_ENV: "production", EN_SECTION_ENABLED: "true" })).toBe(true);
  });

  it("is on in staging, previews, development and tests unless set to false", () => {
    for (const env of ["staging", "development", "test"]) {
      expect(enSectionEnabled({ APP_ENV: env }), env).toBe(true);
      expect(enSectionEnabled({ APP_ENV: env, EN_SECTION_ENABLED: "false" }), env).toBe(false);
    }
    expect(enSectionEnabled({ VERCEL_ENV: "preview" })).toBe(true);
  });

  it("refuses a value that is not true or false, naming the variable", () => {
    const problems = (() => {
      try {
        parseServerEnv({ APP_ENV: "development", EN_SECTION_ENABLED: "yes", EN_EU_ORDERS: "1" });
        return [];
      } catch (e) {
        return e instanceof ConfigError ? e.problems : [];
      }
    })();
    expect(problems).toEqual(["EN_SECTION_ENABLED must be true or false", "EN_EU_ORDERS must be true or false"]);
    expect(parseServerEnv({ APP_ENV: "development" })).toMatchObject({ enSection: true, euOrders: false });
  });
});

describe("orders from the EU (EN_EU_ORDERS, off by default)", () => {
  it("are off unless switched on, in every environment", () => {
    for (const env of ["production", "staging", "development", "test"])
      expect(euOrdersEnabled({ APP_ENV: env }), env).toBe(false);
    expect(euOrdersEnabled({ EN_EU_ORDERS: "true" })).toBe(true);
  });

  it("blocks the other 26 member states while off, never Bulgaria or a non-EU country", () => {
    for (const c of ["DE", "FR", "GR", "IE", "NL", "AT", "SE", "PL", "RO", "HR", "CY", "MT"])
      expect(isEuBlocked(c, false), c).toBe(true);
    for (const c of ["BG", "US", "GB", "CA", "AU", "NO", "CH", "RS"]) expect(isEuBlocked(c, false), c).toBe(false);
    for (const c of ["DE", "FR", "BG", "US"]) expect(isEuBlocked(c, true), c).toBe(false);
  });
});

describe("production gates", () => {
  it("keep the package terms unsigned and the English notice a draft until the owner and lawyer say so", () => {
    expect(EN_TERMS.signedOff).toBe(false);
    expect(EN_PRIVACY_NOTICE.status).toBe("draft");
  });

  it("refuse unsigned terms and a draft notice in production only", () => {
    expect(() => assertEnTermsSignedOff("production")).toThrow(ReleaseGateError);
    expect(() => assertEnPrivacyReady("production")).toThrow(ReleaseGateError);
    for (const env of ["development", "test", "staging"] as const) {
      expect(() => assertEnTermsSignedOff(env)).not.toThrow();
      expect(() => assertEnPrivacyReady(env)).not.toThrow();
    }
    expect(() => assertEnTermsSignedOff("production", { signedOff: true })).not.toThrow();
    expect(() => assertEnPrivacyReady("production", { status: "approved" })).not.toThrow();
  });

  it("let production build with the section off, and refuse it on before the terms are signed off", () => {
    expect(() => assertEnLaunchReady({ APP_ENV: "production" })).not.toThrow();
    expect(() => assertEnLaunchReady({ APP_ENV: "production", EN_SECTION_ENABLED: "true" })).toThrow(
      /EN_TERMS.signedOff/,
    );
    stub({ ...PRODUCTION, EN_SECTION_ENABLED: "true" });
    expect(() => config(PHASE_PRODUCTION_BUILD)).toThrow(ReleaseGateError);
  });

  it("close the order form in production until the terms are signed off, and while the section is off", () => {
    expect(enOrdersOpen({ APP_ENV: "staging" })).toBe(true);
    expect(enOrdersOpen({ APP_ENV: "staging", EN_SECTION_ENABLED: "false" })).toBe(false);
    expect(enOrdersOpen({ APP_ENV: "production" })).toBe(false);
    expect(enOrdersOpen({ APP_ENV: "production", EN_SECTION_ENABLED: "true" })).toBe(false);
    expect(enOrdersOpen({ APP_ENV: "production", EN_SECTION_ENABLED: "true" }, { signedOff: true })).toBe(true);
  });
});

describe("while the section is off, it does not exist", () => {
  it("rewrites every /en address to a missing path in production by default", async () => {
    stub(PRODUCTION);
    const rewrites = (await config(PHASE_PRODUCTION_BUILD).rewrites?.()) as { beforeFiles: { source: string }[] };
    expect(rewrites.beforeFiles.map((r) => r.source)).toEqual(["/placeholder-media/:path*", "/en", "/en/:path*"]);
  });

  it("serves /en on staging, and hides it there too when switched off", async () => {
    stub({ APP_ENV: "staging", NEXT_PUBLIC_SITE_URL: "https://preview.example.bg" });
    expect(await config(PHASE_PRODUCTION_BUILD).rewrites?.()).toMatchObject({ beforeFiles: [] });
    vi.stubEnv("EN_SECTION_ENABLED", "false");
    const off = (await config(PHASE_PRODUCTION_BUILD).rewrites?.()) as { beforeFiles: { source: string }[] };
    expect(off.beforeFiles.map((r) => r.source)).toEqual(["/en", "/en/:path*"]);
  });

  it("leaves the English pages out of the sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    vi.stubEnv("EN_SECTION_ENABLED", "false");
    expect(sitemap().some((e) => e.url.includes("/en"))).toBe(false);
    vi.stubEnv("EN_SECTION_ENABLED", "true");
    expect(sitemap().some((e) => e.url === "https://www.example.bg/en")).toBe(true);
  });
});
