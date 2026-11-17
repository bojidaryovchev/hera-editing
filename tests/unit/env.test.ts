import { describe, expect, it } from "vitest";
import { ConfigError, parseServerEnv, resolveAppEnv } from "../../src/lib/config/env";

const production = {
  APP_ENV: "production",
  NEXT_PUBLIC_SITE_URL: "https://agency.example",
  NEXT_PUBLIC_BRAND_NAME: "Example Agency",
  NEXT_PUBLIC_CONTACT_EMAIL: "hello@agency.example",
  DATABASE_URL: "postgres://user:pw@db.example:5432/site",
  NOTIFICATION_EMAIL_TO: "leads@agency.example",
  MAIL_PROVIDER: "resend",
  RESEND_API_KEY: "re_test_key",
  MAIL_FROM: "Сайт <site@agency.example>",
  RATE_LIMIT_SALT: "s".repeat(40),
};

const problemsOf = (src: Record<string, string | undefined>) => {
  try {
    parseServerEnv(src);
    return [];
  } catch (e) {
    if (e instanceof ConfigError) return e.problems;
    throw e;
  }
};

describe("app environment", () => {
  it("is explicit when APP_ENV is set, and production on a Vercel production deploy", () => {
    expect(resolveAppEnv({ APP_ENV: "staging" })).toBe("staging");
    expect(resolveAppEnv({ VERCEL_ENV: "production" })).toBe("production");
    expect(resolveAppEnv({ VERCEL_ENV: "preview" })).toBe("staging");
    expect(resolveAppEnv({})).toBe("development");
    expect(() => resolveAppEnv({ APP_ENV: "prod" })).toThrow(ConfigError);
  });
});

describe("production launch gates", () => {
  it("accepts a complete production configuration", () => {
    const env = parseServerEnv(production);
    expect(env.appEnv).toBe("production");
    expect(env.mail.provider).toBe("resend");
    expect(env.analytics).toBeNull();
  });

  it("refuses to run without the owner's launch inputs", () => {
    const problems = problemsOf({ APP_ENV: "production" });
    expect(problems.join("\n")).toMatch(/NEXT_PUBLIC_SITE_URL/);
    expect(problems.join("\n")).toMatch(/NEXT_PUBLIC_BRAND_NAME/);
    expect(problems.join("\n")).toMatch(/NEXT_PUBLIC_CONTACT_EMAIL or NEXT_PUBLIC_CONTACT_PHONE/);
    expect(problems.join("\n")).toMatch(/DATABASE_URL/);
    expect(problems.join("\n")).toMatch(/NOTIFICATION_EMAIL_TO/);
    expect(problems.join("\n")).toMatch(/MAIL_PROVIDER/);
    expect(problems.join("\n")).toMatch(/RATE_LIMIT_SALT/);
  });

  it("refuses http, localhost, the dev mail transport and test fixtures in production", () => {
    expect(problemsOf({ ...production, NEXT_PUBLIC_SITE_URL: "http://agency.example" })).toEqual([
      "NEXT_PUBLIC_SITE_URL must use https in production",
    ]);
    expect(problemsOf({ ...production, NEXT_PUBLIC_SITE_URL: "https://localhost" })).toHaveLength(1);
    expect(problemsOf({ ...production, MAIL_PROVIDER: "dev" })).toEqual([
      "MAIL_PROVIDER=dev is not allowed in production",
    ]);
    expect(problemsOf({ ...production, CONTENT_FIXTURES: "1" })).toEqual([
      "CONTENT_FIXTURES is only allowed when APP_ENV=test",
    ]);
  });

  it("never loads analytics without an approved consent setup", () => {
    expect(problemsOf({ ...production, ANALYTICS_MEASUREMENT_ID: "G-ABC123" })).toHaveLength(1);
    const approved = parseServerEnv({
      ...production,
      ANALYTICS_MEASUREMENT_ID: "G-ABC123",
      ANALYTICS_CONSENT_APPROVED: "true",
    });
    expect(approved.analytics).toEqual({ measurementId: "G-ABC123", approved: true });
    const staging = parseServerEnv({
      ...production,
      APP_ENV: "staging",
      ANALYTICS_MEASUREMENT_ID: "G-ABC123",
    });
    expect(staging.analytics).toBeNull();
  });

  it("validates mail provider credentials", () => {
    expect(problemsOf({ ...production, RESEND_API_KEY: "" }).join()).toMatch(/RESEND_API_KEY/);
    expect(
      problemsOf({
        ...production,
        MAIL_PROVIDER: "smtp",
        SMTP_HOST: "smtp.example",
        SMTP_PORT: "587",
        SMTP_FROM: "a@agency.example",
      }),
    ).toEqual([]);
    expect(problemsOf({ ...production, MAIL_PROVIDER: "smtp" }).join()).toMatch(/SMTP_HOST/);
  });

  it("names variables in errors, never their secret values", () => {
    const problems = problemsOf({ ...production, RATE_LIMIT_SALT: "short-secret-value" });
    expect(problems.join()).not.toContain("short-secret-value");
  });
});

describe("development defaults", () => {
  it("runs locally with the dev mailer and no database configured", () => {
    const env = parseServerEnv({});
    expect(env.appEnv).toBe("development");
    expect(env.mail.provider).toBe("dev");
    expect(env.databaseUrl).toBeNull();
    expect(env.trustProxy).toBe(false);
  });

  it("only trusts proxy headers on Vercel or when told to", () => {
    expect(parseServerEnv({ VERCEL: "1" }).trustProxy).toBe(true);
    expect(parseServerEnv({ TRUST_PROXY: "true" }).trustProxy).toBe(true);
  });

  it("allows the test outbox only outside deployed environments", () => {
    expect(parseServerEnv({ APP_ENV: "test", MAIL_DEV_OUTBOX_DIR: "/tmp/x" }).mail).toMatchObject({
      outboxDir: "/tmp/x",
    });
    const staging = {
      ...production,
      APP_ENV: "staging",
      MAIL_PROVIDER: "dev",
      MAIL_DEV_OUTBOX_DIR: "/tmp/x",
    };
    expect(problemsOf(staging).join()).toMatch(/MAIL_DEV_OUTBOX_DIR/);
  });
});
