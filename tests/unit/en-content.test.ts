import { describe, expect, it } from "vitest";
import { ORDER_LABELS } from "../../src/content/admin-orders";
import { EN_FAQ, EN_FAQ_SETS } from "../../src/content/en/faq";
import { EN_HOME, EN_STEPS } from "../../src/content/en/home";
import { EN_COOKIES_PAGE, EN_CONSENT_BANNER } from "../../src/content/en/legal/cookies";
import { EN_PRIVACY_PAGE } from "../../src/content/en/legal/privacy";
import { NICHE_LABELS, NICHE_PAGES } from "../../src/content/en/niches";
import { EN_ORDER } from "../../src/content/en/order";
import { ADD_ONS, CUSTOMERS, CUSTOM_QUOTES, GROUP_EXTRAS, PACKAGES } from "../../src/content/en/packages";
import { EN_HOW, EN_NOT_FOUND, EN_PRICING, EN_SERVER_ERROR, EN_WORK } from "../../src/content/en/pages";
import { EN_SEO } from "../../src/content/en/seo";
import { EN_FOOTER, EN_GATES, EN_LINK_FROM_BG, EN_NAV, EN_SHELL, ORDER_CTA } from "../../src/content/en/site";
import { EN_TERMS_PAGE } from "../../src/content/en/terms";
import { COOKIES_PAGE } from "../../src/content/legal/cookies";

function collect(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collect(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collect(v, out));
  return out;
}

/** The English section's visitor-facing copy (the terms are the lead's document, checked in en-terms.test.ts). */
const PAGES = [NICHE_PAGES, EN_HOME, EN_STEPS, EN_FAQ, EN_PRICING, EN_HOW, EN_WORK, EN_NOT_FOUND, EN_SERVER_ERROR];
const COPY = [
  ...new Set(
    collect([
      ...PAGES,
      EN_ORDER,
      EN_SEO,
      EN_NAV,
      EN_SHELL,
      EN_GATES,
      EN_FOOTER,
      ORDER_CTA,
      EN_COOKIES_PAGE,
      EN_CONSENT_BANNER,
      EN_PRIVACY_PAGE,
      EN_TERMS_PAGE,
      NICHE_LABELS,
      PACKAGES,
      CUSTOMERS,
      ADD_ONS,
      GROUP_EXTRAS,
      CUSTOM_QUOTES,
      EN_LINK_FROM_BG,
    ]).filter((s) => /[a-zа-я]/iu.test(s) && !/^\/en|^https?:/.test(s)),
  ),
];

describe("English copy rules (decision L38)", () => {
  it("has a meaningful amount of copy to check", () => {
    expect(COPY.length).toBeGreaterThan(300);
  });

  it("is English: Cyrillic only in the link back to the Bulgarian site", () => {
    expect(COPY.filter((t) => /[А-Яа-я]/u.test(t))).toEqual(["Български"]);
  });

  it("makes no guarantees, rankings, invented clients or numbers, and no review for a discount", () => {
    // Claims, not counts: "our first 10 clients" (the founding offer) and "2–3 videos" (references) are fine.
    const risky =
      /\b(guarantee\w*|#1|number one|best[- ]in|leading|award\w*|top[- ]rated|trusted by|happy clients|satisfied clients|5-star|rating|\d+\+? (clients|customers|projects|videos|films) (served|delivered|edited|completed|so far))/i;
    expect(COPY.filter((t) => risky.test(t))).toEqual([]);
    // A client's review is mentioned only to say that nothing depends on one (strategy §5).
    const reviews = COPY.filter((t) => /\b(a review|reviews|testimonials?)\b(?! link)/i.test(t));
    expect(reviews.length).toBeGreaterThan(0);
    for (const t of reviews) expect(t, t).toMatch(/(doesn't|does not) depend on a review/);
  });

  it("never promises overnight or next-day delivery, except the listing video's paid rush when a slot is free", () => {
    expect(COPY.filter((t) => /overnight|24 ?hours?|24 ?h\b/i.test(t))).toEqual([]);
    const faq = Object.values(EN_FAQ).map((f) => `${f.q} ${f.a}`);
    const pageCopy = collect(PAGES.filter((p) => p !== EN_FAQ));
    for (const t of [...faq, ...pageCopy, ...collect(PACKAGES)].filter((s) => /next(-| )(business )?day/i.test(s)))
      expect(t, t).toMatch(/slot is free/);
  });

  it("says 'AI-assisted, human-edited', and honours a no-AI request", () => {
    expect(EN_HOME.hero.lead).toContain("AI-assisted, human-edited.");
    expect(EN_FAQ.ai!.a).toMatch(/^AI-assisted, human-edited/);
    expect(EN_FAQ.ai!.a).toMatch(/If you don't want AI-generated visuals, voices or music, we don't use them/);
  });

  it("speaks as 'we' (the sales kit's 'I' adapted); only questions and the client's form answers say 'I'", () => {
    const answers = Object.values(EN_FAQ).map((f) => f.a);
    const voice = [...collect(PAGES.filter((p) => p !== EN_FAQ)), ...answers].filter((t) =>
      /\b(I|I'm|I'll|me|my)\b/.test(t),
    );
    expect(voice).toEqual([]);
  });

  it("never shows template holes, placeholders or doubled spaces", () => {
    const problems: string[] = [];
    for (const t of COPY) {
      if (/\{\{|\}\}/.test(t)) problems.push(`template hole in "${t}"`);
      if (/\[[^\]]*\]/.test(t)) problems.push(`placeholder in "${t}"`);
      if (/ {2,}|^\s|\s$/.test(t)) problems.push(`spacing in "${t}"`);
    }
    expect(problems).toEqual([]);
  });

  it("answers every topic How it works must cover", () => {
    const how = EN_FAQ_SETS.how;
    for (const id of ["files", "revisions", "turnaround", "payment", "refunds", "timezone", "calls", "music", "ai"])
      expect(how, id).toContain(id);
    for (const ids of Object.values(EN_FAQ_SETS)) for (const id of ids) expect(EN_FAQ[id], id).toBeDefined();
    expect(EN_FAQ_SETS.home.length).toBeLessThan(how.length);
  });

  it("names its cookie categories as the Bulgarian page does, and the same storage", () => {
    expect(Object.keys(EN_COOKIES_PAGE.categories)).toEqual(Object.keys(COOKIES_PAGE.categories));
    expect(EN_COOKIES_PAGE.storage.consent.name).toBe(COOKIES_PAGE.storage.consent.name);
    expect(EN_COOKIES_PAGE.storage.analytics.name).toBe(COOKIES_PAGE.storage.analytics.name);
    expect(EN_COOKIES_PAGE.storage.consent.duration).toBe("6 months");
    expect(EN_COOKIES_PAGE.storage.analytics.duration).toBe("13 months");
  });

  it("names the processors and the order form's data in the privacy notice, with the same gates", () => {
    const notice = JSON.stringify(EN_PRIVACY_PAGE);
    for (const name of ["Vercel", "Neon", "Resend"]) expect(notice).toContain(name);
    const byId = Object.fromEntries(EN_PRIVACY_PAGE.sections.map((s) => [s.id, s]));
    expect(byId.controller).toMatchObject({ body: null });
    expect(byId.retention!.pending).toBeTruthy();
    expect(byId.basis!.pending).toBeTruthy();
    expect(byId.data!.body).toMatch(/business name.*email.*country.*VAT.*package.*footage/);
  });

  it("labels the owner's view of an order in Bulgarian, with the EN badge", () => {
    expect(ORDER_LABELS.badge).toBe("EN");
    expect(ORDER_LABELS.alertSubject).toMatch(/[А-Яа-я]/u);
  });
});
