import { z } from "zod";

/**
 * Server configuration, validated once. Production refuses to start (and to build,
 * via next.config.ts) unless every owner-provided launch input is present, so a
 * placeholder can never silently reach the live site.
 *
 * Error messages name variables, never their values.
 */

export const APP_ENVS = ["development", "test", "staging", "production"] as const;
export type AppEnv = (typeof APP_ENVS)[number];

export const MAIL_PROVIDERS = ["resend", "smtp", "dev"] as const;
export type MailProvider = (typeof MAIL_PROVIDERS)[number];

export class ConfigError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Invalid configuration:\n- ${problems.join("\n- ")}`);
    this.name = "ConfigError";
  }
}

type Source = Record<string, string | undefined>;

const blank = (v: string | undefined) => v === undefined || v.trim() === "";
const val = (src: Source, key: string) => (blank(src[key]) ? undefined : src[key]!.trim());

export function resolveAppEnv(src: Source): AppEnv {
  const explicit = val(src, "APP_ENV");
  if (explicit) {
    if ((APP_ENVS as readonly string[]).includes(explicit)) return explicit as AppEnv;
    throw new ConfigError([`APP_ENV must be one of ${APP_ENVS.join(", ")}`]);
  }
  // Safety net: a Vercel production deployment is production even if APP_ENV was forgotten.
  if (src.VERCEL_ENV === "production") return "production";
  if (src.VERCEL_ENV === "preview") return "staging";
  if (src.NODE_ENV === "test") return "test";
  return "development";
}

const emailSchema = z.email().max(254);

export type ServerEnv = {
  appEnv: AppEnv;
  siteUrl: string;
  brandName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  databaseUrl: string | null;
  notificationEmailTo: string | null;
  mail:
    | { provider: "resend"; apiKey: string; from: string }
    | {
        provider: "smtp";
        host: string;
        port: number;
        user: string | null;
        pass: string | null;
        from: string;
      }
    | { provider: "dev"; outboxDir: string | null; from: string };
  rateLimitSalt: string;
  trustProxy: boolean;
  cronSecret: string | null;
  analytics: { measurementId: string; approved: true } | null;
  turnstile: { siteKey: string; secretKey: string } | null;
  contentFixtures: boolean;
};

const DEV_SALT = "development-only-rate-limit-salt-not-secret";

export function parseServerEnv(src: Source): ServerEnv {
  const problems: string[] = [];
  let appEnv: AppEnv;
  try {
    appEnv = resolveAppEnv(src);
  } catch (e) {
    throw e instanceof ConfigError ? e : new ConfigError(["APP_ENV could not be resolved"]);
  }
  const isProd = appEnv === "production";
  const isDeployed = appEnv === "production" || appEnv === "staging";

  // --- Public site identity -------------------------------------------------------
  const rawSiteUrl = val(src, "NEXT_PUBLIC_SITE_URL");
  let siteUrl = "http://localhost:3000";
  if (rawSiteUrl) {
    try {
      const u = new URL(rawSiteUrl);
      if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("protocol");
      if (isProd && u.protocol !== "https:") problems.push("NEXT_PUBLIC_SITE_URL must use https in production");
      if (isProd && ["localhost", "127.0.0.1"].includes(u.hostname))
        problems.push("NEXT_PUBLIC_SITE_URL must be the real domain in production");
      siteUrl = u.origin;
    } catch {
      problems.push("NEXT_PUBLIC_SITE_URL is not a valid URL");
    }
  } else if (isDeployed) {
    problems.push("NEXT_PUBLIC_SITE_URL is required outside development and test");
  }

  const brandName = val(src, "NEXT_PUBLIC_BRAND_NAME") ?? null;
  if (isProd && !brandName) problems.push("NEXT_PUBLIC_BRAND_NAME is required in production (owner launch input)");

  const contactEmail = val(src, "NEXT_PUBLIC_CONTACT_EMAIL") ?? null;
  if (contactEmail && !emailSchema.safeParse(contactEmail).success)
    problems.push("NEXT_PUBLIC_CONTACT_EMAIL is not a valid email address");
  const contactPhone = val(src, "NEXT_PUBLIC_CONTACT_PHONE") ?? null;
  if (isProd && !contactEmail && !contactPhone)
    problems.push(
      "NEXT_PUBLIC_CONTACT_EMAIL or NEXT_PUBLIC_CONTACT_PHONE is required in production (owner launch input)",
    );

  // --- Database -------------------------------------------------------------------
  const databaseUrl = val(src, "DATABASE_URL") ?? null;
  if (databaseUrl && !/^postgres(ql)?:\/\//.test(databaseUrl))
    problems.push("DATABASE_URL must be a postgres:// connection string");
  if (isDeployed && !databaseUrl) problems.push("DATABASE_URL is required outside development and test");

  // --- Notification mail ----------------------------------------------------------
  const notificationEmailTo = val(src, "NOTIFICATION_EMAIL_TO") ?? null;
  if (notificationEmailTo && !emailSchema.safeParse(notificationEmailTo).success)
    problems.push("NOTIFICATION_EMAIL_TO is not a valid email address");
  if (isProd && !notificationEmailTo) problems.push("NOTIFICATION_EMAIL_TO is required in production");

  const provider = (val(src, "MAIL_PROVIDER") ?? (isProd ? undefined : "dev")) as MailProvider | undefined;
  const from = val(src, "MAIL_FROM") ?? val(src, "SMTP_FROM");
  let mail: ServerEnv["mail"] = { provider: "dev", outboxDir: null, from: "dev@localhost" };
  if (!provider || !(MAIL_PROVIDERS as readonly string[]).includes(provider)) {
    problems.push(`MAIL_PROVIDER must be one of ${MAIL_PROVIDERS.join(", ")}`);
  } else if (provider === "dev") {
    if (isProd) problems.push("MAIL_PROVIDER=dev is not allowed in production");
    mail = { provider: "dev", outboxDir: val(src, "MAIL_DEV_OUTBOX_DIR") ?? null, from: from ?? "dev@localhost" };
    if (mail.outboxDir && isDeployed) problems.push("MAIL_DEV_OUTBOX_DIR is only for development and tests");
  } else if (provider === "resend") {
    const apiKey = val(src, "RESEND_API_KEY");
    if (!apiKey) problems.push("RESEND_API_KEY is required when MAIL_PROVIDER=resend");
    if (!from || !emailSchema.safeParse(from.replace(/^.*<(.+)>$/, "$1")).success)
      problems.push("MAIL_FROM (a sender on the verified domain) is required when MAIL_PROVIDER=resend");
    mail = { provider: "resend", apiKey: apiKey ?? "", from: from ?? "" };
  } else {
    const host = val(src, "SMTP_HOST");
    const port = Number(val(src, "SMTP_PORT") ?? "587");
    if (!host) problems.push("SMTP_HOST is required when MAIL_PROVIDER=smtp");
    if (!Number.isInteger(port) || port <= 0 || port > 65535) problems.push("SMTP_PORT must be a port number");
    if (!from) problems.push("SMTP_FROM (or MAIL_FROM) is required when MAIL_PROVIDER=smtp");
    mail = {
      provider: "smtp",
      host: host ?? "",
      port,
      user: val(src, "SMTP_USER") ?? null,
      pass: val(src, "SMTP_PASS") ?? null,
      from: from ?? "",
    };
  }

  // --- Abuse protection -----------------------------------------------------------
  let rateLimitSalt = val(src, "RATE_LIMIT_SALT");
  if (!rateLimitSalt) {
    if (isDeployed) problems.push("RATE_LIMIT_SALT (random, 32+ characters) is required outside development and test");
    rateLimitSalt = DEV_SALT;
  } else if (rateLimitSalt.length < 32) {
    problems.push("RATE_LIMIT_SALT must be at least 32 characters");
  }
  // Client IP headers are only trusted where the platform sets them (Vercel) or when the operator says so.
  const trustProxy = src.VERCEL === "1" || val(src, "TRUST_PROXY") === "true";

  const cronSecret = val(src, "CRON_SECRET") ?? null;
  if (cronSecret && cronSecret.length < 32) problems.push("CRON_SECRET must be at least 32 characters");

  const turnstileSite = val(src, "TURNSTILE_SITE_KEY");
  const turnstileSecret = val(src, "TURNSTILE_SECRET_KEY");
  if (Boolean(turnstileSite) !== Boolean(turnstileSecret))
    problems.push("TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY must be set together");

  // --- Optional analytics: only with an explicit, owner-approved consent setup ------------
  const measurementId = val(src, "ANALYTICS_MEASUREMENT_ID");
  const analyticsApproved = val(src, "ANALYTICS_CONSENT_APPROVED") === "true";
  if (measurementId && !/^G-[A-Z0-9]{4,20}$/.test(measurementId))
    problems.push("ANALYTICS_MEASUREMENT_ID must look like G-XXXXXXX");
  if (measurementId && !analyticsApproved && isProd)
    problems.push(
      "ANALYTICS_MEASUREMENT_ID is set but ANALYTICS_CONSENT_APPROVED is not true; analytics needs an approved consent setup",
    );

  const contentFixtures = val(src, "CONTENT_FIXTURES") === "1";
  if (contentFixtures && appEnv !== "test") problems.push("CONTENT_FIXTURES is only allowed when APP_ENV=test");

  if (problems.length > 0) throw new ConfigError(problems);

  return {
    appEnv,
    siteUrl,
    brandName,
    contactEmail,
    contactPhone,
    databaseUrl,
    notificationEmailTo,
    mail,
    rateLimitSalt,
    trustProxy,
    cronSecret,
    analytics: measurementId && analyticsApproved ? { measurementId, approved: true } : null,
    turnstile: turnstileSite && turnstileSecret ? { siteKey: turnstileSite, secretKey: turnstileSecret } : null,
    contentFixtures,
  };
}

let cached: ServerEnv | undefined;

/** The validated server configuration for this process. Throws ConfigError on problems. */
export function getServerEnv(): ServerEnv {
  cached ??= parseServerEnv(process.env);
  return cached;
}

/** Test hook: forget the cached configuration. */
export function resetServerEnvCache(): void {
  cached = undefined;
}
