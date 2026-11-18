import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EN_FAQ } from "../../src/content/en/faq";
import { CUSTOM_QUOTES, FOUNDING_OFFER, PAYMENT, longDate } from "../../src/content/en/packages";
import { EN_HOW } from "../../src/content/en/pages";
import {
  EN_TERMS,
  TERMS_GATE_TEXT,
  TERMS_PLACEHOLDERS,
  type TermsBlock,
  type TermsInline,
} from "../../src/content/en/terms";

/*
 * /en/terms renders src/content/en/terms.ts, which must say exactly what the lead's document says: the
 * client-facing part of docs/contracts/terms-of-service.md, after its "---" line. Both are reduced to the same
 * plain units (headings, paragraphs, list items, table cells) and compared one by one.
 */
const DOC = readFileSync(path.resolve(import.meta.dirname, "../../docs/contracts/terms-of-service.md"), "utf8");
const clean = (s: string) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();

function markdownUnits(md: string): string[] {
  const start = md.search(/^---$/m);
  const lines = md.slice(start + 3).split(/\r?\n/);
  const units: string[] = [];
  let buf: string[] = [];
  let kind: "P" | "LI" | null = null;
  const flush = () => {
    if (buf.length && kind) units.push(`${kind}:${clean(buf.join(" "))}`);
    buf = [];
    kind = null;
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    const heading = /^#{2,3}\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      units.push(`H:${clean(heading[1]!)}`);
      continue;
    }
    if (line.startsWith("|")) {
      flush();
      if (/^\|[-\s|]+\|$/.test(line)) continue;
      for (const cell of line.split("|").slice(1, -1)) units.push(`TD:${clean(cell)}`);
      continue;
    }
    const item = /^(?:-|\d+\.)\s+(.*)$/.exec(line);
    if (item) {
      flush();
      kind = "LI";
      buf.push(item[1]!);
      continue;
    }
    if (kind === "LI" && /^\s+\S/.test(raw)) {
      buf.push(line.trim());
      continue;
    }
    if (kind === "LI") flush();
    kind ??= "P";
    buf.push(line.trim());
  }
  flush();
  return units;
}

const inline = (parts: readonly TermsInline[]) =>
  clean(
    parts
      .map((p) => {
        if (typeof p === "string") return p;
        if ("b" in p) return p.b;
        if ("link" in p) return p.text;
        if ("email" in p) return p.email;
        if ("brand" in p) return "Hera Editing";
        return TERMS_PLACEHOLDERS[p.gate];
      })
      .join(""),
  );

function blockUnits(b: TermsBlock): string[] {
  if ("p" in b) return [`P:${inline(b.p)}`];
  if ("ul" in b) return b.ul.map((i) => `LI:${inline(i)}`);
  if ("ol" in b) return b.ol.map((i) => `LI:${inline(i)}`);
  return [...b.table.head, ...b.table.rows.flat()].map((c) => `TD:${clean(c)}`);
}

function contentUnits(): string[] {
  return [
    `H:${EN_TERMS.title}`,
    ...EN_TERMS.intro.flatMap(blockUnits),
    ...EN_TERMS.sections.flatMap((s) => [`H:${s.n}. ${s.heading}`, ...s.blocks.flatMap(blockUnits)]),
  ];
}

const sectionText = (n: number) =>
  EN_TERMS.sections
    .find((s) => s.n === n)!
    .blocks.flatMap(blockUnits)
    .join(" ");

describe("the terms page says what the lead's document says", () => {
  it("matches the client-facing part of docs/contracts/terms-of-service.md, unit by unit", () => {
    const doc = markdownUnits(DOC);
    expect(doc.length).toBeGreaterThan(80);
    expect(contentUnits()).toEqual(doc);
  });

  it("is the lead's draft 0.1 of 2026-11-18, numbered 1 to 20", () => {
    expect(DOC).toContain("draft 0.1, 2026-11-18");
    expect(EN_TERMS).toMatchObject({ version: "0.1", date: "2026-11-18" });
    expect(EN_TERMS.sections.map((s) => s.n)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it("never shows a placeholder: the company facts are gates with neutral words", () => {
    const strings: string[] = [];
    const collect = (v: unknown): void => {
      if (typeof v === "string") strings.push(v);
      else if (v && typeof v === "object") Object.values(v).forEach(collect);
    };
    collect(EN_TERMS);
    expect(strings.filter((s) => /\[[^\]]*\]/.test(s))).toEqual([]);
    for (const text of Object.values(TERMS_GATE_TEXT)) expect(text).not.toMatch(/[[\]]/);
    expect(Object.keys(TERMS_PLACEHOLDERS).sort()).toEqual(["company", "courtCity"]);
  });
});

describe("sections 4–8 agree with the pricing data and the other pages", () => {
  it("§2 and §6: quotes valid 14 days, custom quotes 50% upfront, packages in full in advance, by bank transfer", () => {
    expect(sectionText(2)).toContain(`valid for ${CUSTOM_QUOTES.validDays} days`);
    const payment = sectionText(6);
    expect(payment).toContain("Packages: in full, in advance.");
    expect(payment).toContain(`${PAYMENT.customDepositPercent}% before we start`);
    expect(payment).toContain("By bank transfer, against our invoice.");
    expect(payment).toContain("excluding VAT");
  });

  it("§4: business days, the clock's start and pause, rush only by written agreement", () => {
    const delivery = sectionText(4);
    expect(delivery).toContain("Monday to Friday, excluding Bulgarian public holidays");
    expect(delivery).toContain("the payment has been received");
    expect(delivery).toContain("Rush delivery is available only by written agreement, and only when a slot is free.");
    expect(EN_HOW.clock.items.map((i) => i.text).join(" ")).toContain(
      "Monday to Friday, excluding Bulgarian public holidays.",
    );
  });

  it("§5: a round is one consolidated list of time-coded notes, accepted after 7 days without notes", () => {
    const revisions = sectionText(5);
    expect(revisions).toContain("One consolidated list of time-coded notes");
    expect(revisions).toContain(`within ${PAYMENT.acceptanceDays} days of a delivery`);
    expect(EN_FAQ.revisions!.a).toContain("one consolidated list of time-coded notes");
  });

  it("§7: the founding offer is the data's, with no condition", () => {
    const founding = sectionText(7);
    expect(founding).toContain(`first ${FOUNDING_OFFER.clients} clients`);
    expect(founding).toContain(longDate(FOUNDING_OFFER.until));
    expect(founding).toContain(`${FOUNDING_OFFER.percent}% off their first order`);
    expect(founding).toContain("does not depend on a review");
  });

  it("§8: the FAQ's refunds answer is the cancellation table", () => {
    const table = sectionText(8);
    for (const part of ["A full refund, less bank fees", "50% of the price until the first cut", "100% after it"])
      expect(table).toContain(part);
    expect(EN_FAQ.refunds!.a).toMatch(/full refund, less bank fees.*50% of the price until the first cut.*100% after/);
  });

  it("§12 and §17: AI and calls as the FAQ says them", () => {
    expect(sectionText(12)).toContain("A human editor makes every editing decision.");
    expect(EN_FAQ.ai!.a).toContain("a human editor makes every editing decision");
    expect(sectionText(17)).toContain("We do not hold calls.");
    expect(EN_FAQ.calls!.a).toContain("We don't hold calls");
  });
});
