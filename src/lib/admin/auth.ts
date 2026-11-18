import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerEnv } from "@/lib/config/env";
import type { RateLimitRule } from "@/lib/rate-limit";

/**
 * Admin authentication (decision L32). One owner answers every enquiry, so the panel has exactly one account: a
 * password in the environment plus a signed session cookie, as on the owner's other sites (buy-a-vend). With no
 * ADMIN_PASSWORD the panel is OFF (every admin route answers 404) rather than falling back to a default.
 *
 * The cookie holds only an expiry and an HMAC of it (ADMIN_SESSION_SECRET); rotating that secret signs everyone out.
 */

export const ADMIN_COOKIE = "hera_admin";
const MAX_AGE_SECONDS = 12 * 60 * 60;

/** Failed and successful attempts alike count: five per quarter hour, twenty a day, per client. */
export const ADMIN_LOGIN_RULES: readonly RateLimitRule[] = [
  { scope: "admin-login", limit: 5, windowSeconds: 15 * 60 },
  { scope: "admin-login-day", limit: 20, windowSeconds: 24 * 60 * 60 },
];

/** The admin settings, or null when the panel is off (or the configuration does not parse). */
export function adminConfig(): { password: string; sessionSecret: string } | null {
  try {
    return getServerEnv().admin;
  } catch {
    return null;
  }
}

const mac = (secret: string, payload: string) => createHmac("sha256", secret).update(payload).digest();

export function signSession(secret: string, expiresAt: number): string {
  return `v1.${expiresAt}.${mac(secret, `v1.${expiresAt}`).toString("base64url")}`;
}

export function verifySession(secret: string, token: string | undefined, now: number = Date.now()): boolean {
  if (!token || !secret) return false;
  const [version, expires, signature] = token.split(".");
  if (version !== "v1" || !expires || !signature || !/^\d+$/.test(expires)) return false;
  const expected = mac(secret, `v1.${expires}`);
  const given = Buffer.from(signature, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  return Number(expires) > now;
}

/** Constant time, and both sides hashed first so not even the password's length leaks through timing. */
export function passwordMatches(candidate: string, actual: string, secret: string): boolean {
  if (!candidate || !actual) return false;
  return timingSafeEqual(mac(secret, candidate), mac(secret, actual));
}

function secureCookie(): boolean {
  try {
    return new URL(getServerEnv().siteUrl).protocol === "https:";
  } catch {
    return true;
  }
}

export async function createSession(): Promise<void> {
  const config = adminConfig();
  if (!config) return;
  const store = await cookies();
  store.set(ADMIN_COOKIE, signSession(config.sessionSecret, Date.now() + MAX_AGE_SECONDS * 1000), {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookie(),
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: secureCookie(), path: "/admin", maxAge: 0 });
}

export async function isSignedIn(): Promise<boolean> {
  const config = adminConfig();
  if (!config) return false;
  const store = await cookies();
  return verifySession(config.sessionSecret, store.get(ADMIN_COOKIE)?.value);
}

/** For every admin page AND server action: a layout does not protect the actions a page renders. */
export async function requireAdmin(): Promise<void> {
  if (!(await isSignedIn())) redirect("/admin/vhod");
}
