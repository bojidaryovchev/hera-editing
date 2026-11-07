import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { LEAD_FIELD_LABELS, leadErrorMessage } from "../../src/content/forms";
import type { LeadErrorCode, LeadField } from "../../src/lib/validation/lead";

const root = path.resolve(import.meta.dirname, "../..");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

// Invisible and direction-override characters that can hide or reorder text.
const FORBIDDEN = new Set([0x200b, 0x200c, 0x200d, 0x200e, 0x200f, 0x2028, 0x2029, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0xfeff]);

describe("source hygiene", () => {
  it("contains no invisible or bidi-override characters", () => {
    const offenders: string[] = [];
    for (const file of walk(path.join(root, "src"))) {
      for (const ch of readFileSync(file, "utf8")) {
        if (FORBIDDEN.has(ch.codePointAt(0)!)) {
          offenders.push(`${path.relative(root, file)} U+${ch.codePointAt(0)!.toString(16)}`);
          break;
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("form copy", () => {
  const codes: LeadErrorCode[] = [
    "required",
    "too_short",
    "too_long",
    "invalid_email",
    "invalid_phone",
    "contact_required",
    "invalid_profile",
    "invalid_choice",
    "privacy_required",
    "invalid_request",
    "unsupported_locale",
  ];

  it("has a Bulgarian message for every field and error code", () => {
    for (const field of Object.keys(LEAD_FIELD_LABELS) as LeadField[]) {
      for (const code of codes) {
        const message = leadErrorMessage(field, code);
        expect(message.length).toBeGreaterThan(5);
        expect(message).toMatch(/[А-Яа-я]/);
      }
    }
  });

  it("keeps the spec's exact field labels", () => {
    expect(LEAD_FIELD_LABELS).toMatchObject({
      name: "Име",
      businessName: "Фирма / име на бизнеса",
      city: "Град",
      email: "Имейл",
      phone: "Телефон",
      profileUrl: "Сайт или профил в социалните мрежи",
      goal: "Какво искате да постигнете?",
      message: "Разкажете ни накратко за бизнеса",
      volume: "Колко често искате ново съдържание?",
    });
  });
});
