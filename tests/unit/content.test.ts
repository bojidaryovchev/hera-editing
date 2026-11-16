import { describe, expect, it } from "vitest";
import patterns from "../fixtures/copy-patterns.formal.json";
import { ABOUT } from "../../src/content/about";
import { BUSINESS } from "../../src/content/business";
import { CONTACT, SOURCE_PAGE_NAMES, checkFields, summaryCount } from "../../src/content/contact";
import { NOT_FOUND, SERVER_ERROR } from "../../src/content/errors";
import { FAQ, FAQ_HEADING, FAQ_SETS, faqOutsideCity } from "../../src/content/faq";
import { GOAL_LABELS, LEAD_FIELD_LABELS, LEAD_FORM_STATUS, VOLUME_LABELS, leadErrorMessage, leadErrorShort } from "../../src/content/forms";
import { HOME } from "../../src/content/home";
import { MEDIA } from "../../src/content/media";
import { COOKIES_PAGE, CONSENT_BANNER } from "../../src/content/legal/cookies";
import { PRIVACY_PAGE } from "../../src/content/legal/privacy";
import { PACKAGES } from "../../src/content/packages";
import { FIXTURE_PROJECTS } from "../../src/content/projects/fixtures";
import { PROJECTS } from "../../src/content/projects";
import { SEO, NOT_FOUND_TITLE } from "../../src/content/seo";
import { SERVICE } from "../../src/content/service";
import * as SHARED from "../../src/content/shared";
import { FOOTER, GATES, NAV, QUOTE_CTA, SHELL, copyrightLine } from "../../src/content/site";
import { SERVICE_TERMS } from "../../src/content/terms";
import { VIDEO } from "../../src/content/video";
import { VIDEO_PLAYER, WORK } from "../../src/content/work";
import type { LeadErrorCode, LeadField } from "../../src/lib/validation/lead";

function collect(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collect(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collect(v, out));
  return out;
}

const errorCodes: LeadErrorCode[] = [
  "required", "too_short", "too_long", "invalid_email", "invalid_phone", "contact_required",
  "invalid_profile", "invalid_choice", "privacy_required", "invalid_request", "unsupported_locale",
];

const ALL = collect([
  ABOUT, CONTACT, SOURCE_PAGE_NAMES, MEDIA, NOT_FOUND, SERVER_ERROR, FAQ, FAQ_HEADING, GOAL_LABELS, LEAD_FIELD_LABELS,
  LEAD_FORM_STATUS, VOLUME_LABELS, HOME, COOKIES_PAGE, CONSENT_BANNER, PRIVACY_PAGE, PACKAGES, FIXTURE_PROJECTS,
  SEO, NOT_FOUND_TITLE, SERVICE, SHARED, FOOTER, GATES, NAV, QUOTE_CTA, SHELL, SERVICE_TERMS, VIDEO, VIDEO_PLAYER, WORK,
  summaryCount(1), summaryCount(4), copyrightLine("Hera Editing", 2026), faqOutsideCity("Пловдив"),
  (Object.keys(LEAD_FIELD_LABELS) as LeadField[]).flatMap((f) => errorCodes.map((c) => leadErrorMessage(f, c))),
  (Object.keys(LEAD_FIELD_LABELS) as LeadField[]).flatMap((f) => errorCodes.map((c) => leadErrorShort(f, c))),
  checkFields(1), checkFields(3),
]);
const COPY = [...new Set(ALL.filter((s) => /[А-Яа-я]/.test(s)))];

type Flag = { name: string; regex: string; case?: boolean };
const ignore = new RegExp(`(?<![А-Яа-я])(${(patterns.ignore_words as string[]).join("|")})(?![А-Яа-я])`, "g");

describe("Bulgarian copy rules", () => {
  it("has a meaningful amount of copy to check", () => {
    expect(COPY.length).toBeGreaterThan(250);
  });

  it("uses formal address everywhere (language pack flags)", () => {
    const hits: string[] = [];
    for (const text of COPY) {
      const cleaned = text.replace(ignore, " ");
      for (const flag of patterns.flags as Flag[]) {
        const re = new RegExp(flag.regex, flag.case ? "u" : "iu");
        const m = cleaned.match(re);
        if (m) hits.push(`${flag.name}: "${m[0]}" in "${text}"`);
      }
    }
    expect(hits).toEqual([]);
  });

  it("capitalises every polite pronoun (owner decision 3)", () => {
    const lower = /(?<![А-Яа-я])(ви|вас|ваш|ваша|ваше|ваши|вашия|вашият|вашата|вашето|вашите)(?![А-Яа-я])/u;
    expect(COPY.filter((t) => lower.test(t))).toEqual([]);
  });

  it("never shows all-caps Cyrillic, template holes, literal placeholders or buying words", () => {
    const allowedCaps = new Set(["ЕИК", "ДДС", "ЕООД", "ООД", "ЕАД", "АД", "ЕТ"]);
    const problems: string[] = [];
    for (const text of COPY) {
      for (const word of text.match(/[А-Я]{3,}/gu) ?? []) {
        if (!allowedCaps.has(word)) problems.push(`all caps "${word}" in "${text}"`);
      }
      if (/\{\{|\}\}/.test(text)) problems.push(`template hole in "${text}"`);
      if (/\[[^\]]*\]/.test(text)) problems.push(`placeholder in "${text}"`);
      if (/(?<![А-Яа-я])(Купи|Купете|Абонирай|Абонирайте)/u.test(text)) problems.push(`buying word in "${text}"`);
      if (/"/.test(text)) problems.push(`straight quote in "${text}"`);
      if (/ {2,}|^\s|\s$/.test(text)) problems.push(`spacing in "${text}"`);
    }
    expect(problems).toEqual([]);
  });

  it("makes no guarantees, rankings or invented numbers", () => {
    const risky = /(гарантираме|гарантирано|№\s?1|номер едно|най-добрата|водеща агенция|\d+\+?\s?(клиента|клиенти|проекта|проекти))/iu;
    expect(COPY.filter((t) => risky.test(t))).toEqual([]);
  });
});

describe("page metadata", () => {
  it("has a unique title and a 120–165 character description per page", () => {
    const entries = Object.values(SEO);
    expect(new Set(entries.map((e) => e.title)).size).toBe(entries.length);
    for (const { description } of entries) {
      expect(description.length).toBeGreaterThanOrEqual(120);
      expect(description.length).toBeLessThanOrEqual(165);
    }
  });

  it("keeps the approved titles: the spec's (CPY:62-67), home, service and packages as the owner approved (L26)", () => {
    expect(SEO.home.title).toBe("Поддръжка на социални мрежи и видео за бизнеса");
    expect(SEO.service.title).toBe("Поддръжка на фейсбук страница и социални мрежи за бизнеса");
    expect(SEO.video.title).toBe("Видеозаснемане и съдържание за социални мрежи");
    expect(SEO.packages.title).toBe("Пакети за поддръжка на социални мрежи: от какво зависи цената");
    expect(SEO.about.title).toBe("За нас");
    expect(SEO.contact.title).toBe("Поискайте оферта за социални мрежи");
  });
});

describe("search phrases (research/05)", () => {
  it("puts the measured service phrase in the service title, description and one heading, in Cyrillic", () => {
    for (const t of [SEO.service.title, SEO.service.description, SERVICE.included.heading]) expect(t.toLowerCase()).toContain("фейсбук страница");
    expect(SERVICE.included.answer.toLowerCase()).toContain("поддръжката на фейсбук страница");
  });

  it("answers the price question up front on the packages page", () => {
    expect(SEO.packages.title).toContain("цената");
    expect(PACKAGES.price.answer).toContain("поддръжката на социални мрежи");
  });
});

describe("content integrity", () => {
  it("every FAQ set references existing questions", () => {
    for (const ids of Object.values(FAQ_SETS)) for (const id of ids) expect(FAQ[id]).toBeDefined();
    expect(FAQ_SETS.home).toHaveLength(6);
  });

  it("keeps the spec's FAQ answers verbatim", () => {
    expect(FAQ.q4!.a).toBe(
      "Зависи от броя оригинални видеа, снимачни посещения, локации, платформи и необходимото управление. След кратък разговор изпращаме конкретен обхват и цена.",
    );
    expect(faqOutsideCity("Пловдив").q).toBe("Може ли да работим извън Пловдив?");
  });

  it("shows no price figure anywhere: every tier is quoted individually", () => {
    expect(COPY.filter((t) => /€|лв\.|евро|EUR|BGN/u.test(t))).toEqual([]);
    for (const row of PACKAGES.rows.filter((r) => "price" in r && r.price)) {
      expect(new Set<unknown>(row.values as readonly unknown[])).toEqual(new Set([SHARED.PRICE_LABEL]));
    }
  });

  it("publishes no real case study and no unverified business facts by default", () => {
    expect(PROJECTS).toEqual([]);
    expect(BUSINESS.verified).toBe(false);
    expect(Object.values(BUSINESS.socials).every((s) => s === null)).toBe(true);
  });

  it("marks every test fixture as fictional and keeps drafts unpublishable", () => {
    for (const p of FIXTURE_PROJECTS) {
      expect(p.fixture).toBe(true);
      expect(p.businessName).toMatch(/фиктивни данни/);
    }
  });

  it("keeps the service terms flagged until the business owner signs them off", () => {
    expect(SERVICE_TERMS.signedOff).toBe(false);
  });
});
