import { readFileSync } from "node:fs";
import path from "node:path";
import type { BrowserContext, Page } from "@playwright/test";
import pg from "pg";
import { CONSENT_COOKIE, serializeConsent } from "../../src/lib/consent";
import { BASE } from "./ports";

/** The indexable pages, plus the portfolio that the e2e build publishes from the fictional fixtures. */
export const PAGES = [
  "/",
  "/upravlenie-na-sotsialni-mrezhi",
  "/video-sadarzhanie-za-biznes",
  "/paketi",
  "/za-nas",
  "/kontakti",
  "/poveritelnost",
  "/biskvitki",
] as const;
export const FIXTURE_CASE = "/rabota/testova-pekarna";
export const ALL_PAGES = [...PAGES, "/rabota", FIXTURE_CASE] as const;

type E2EState = { databaseUrl: string; outbox: string };
let state: E2EState | null = null;
export function e2eState(): E2EState {
  state ??= JSON.parse(readFileSync(path.resolve(import.meta.dirname, "../../.data/e2e/env.json"), "utf8")) as E2EState;
  return state;
}

let pool: pg.Pool | null = null;
export async function query<T extends Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  pool ??= new pg.Pool({ connectionString: e2eState().databaseUrl, max: 2 });
  const result = await pool.query(sql, params);
  return result.rows as T[];
}
export async function closeDb() {
  await pool?.end();
  pool = null;
}

/** Answers every Google Analytics request locally and records it, so nothing leaves the machine. */
export async function stubGoogle(context: BrowserContext): Promise<string[]> {
  const hits: string[] = [];
  await context.route(
    /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net/,
    (route) => {
      hits.push(route.request().url());
      return route.fulfill({ status: 200, contentType: "application/javascript", body: "/* stub */" });
    },
  );
  return hits;
}

/** Stores a consent choice before the first visit, so the banner stays closed. */
export async function presetConsent(context: BrowserContext, analytics: boolean) {
  await context.addCookies([{ name: CONSENT_COOKIE, value: serializeConsent(analytics), url: BASE, sameSite: "Lax" }]);
}

/** Console errors and uncaught exceptions on a page, minus the browser's own line for a deliberate 404. */
export function watchConsole(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    if (/Failed to load resource: the server responded with a status of 404/.test(m.text())) return;
    errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  return errors;
}

export type LeadFields = Partial<
  Record<"name" | "businessName" | "city" | "email" | "phone" | "profileUrl" | "message", string>
> & {
  goal?: string;
};

/** Fills the quote form by its field ids; `goal` is the visible label of a goal chip (clicked like a visitor would). */
export async function fillLead(page: Page, fields: LeadFields) {
  for (const [key, value] of Object.entries(fields)) {
    if (key === "goal" || value === undefined) continue;
    await page.locator(`#lf-${key}`).fill(value);
  }
  if (fields.goal)
    await page
      .getByRole("radiogroup", { name: "Какво искате да постигнете?" })
      .getByRole("radio", { name: fields.goal, exact: true })
      .check();
}

/** A unique, clearly fictional address per test. */
export const testEmail = (tag: string) => `e2e.${tag}.${Date.now()}@example.com`;
