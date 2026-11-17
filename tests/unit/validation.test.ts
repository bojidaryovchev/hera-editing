import { describe, expect, it } from "vitest";
import {
  isValidPhone,
  isValidProfile,
  normalizeLine,
  normalizeMultiline,
  normalizeSourcePath,
  validateLead,
} from "../../src/lib/validation/lead";
import { validLead } from "../helpers/fixtures";

const cp = (...codes: number[]) => String.fromCodePoint(...codes);

describe("validateLead", () => {
  it("accepts a complete request and normalises it", () => {
    const result = validateLead(validLead({ name: "  Мария   Иванова ", city: "Стара  Загора" }));
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data.name).toBe("Мария Иванова");
    expect(result.data.city).toBe("Стара Загора");
    expect(result.data.privacyNoticeAcknowledged).toBe(true);
  });

  it("requires name, business, city and goal", () => {
    const result = validateLead({ email: "a@example.com", privacyNoticeAcknowledged: true });
    expect(result).toEqual({
      ok: false,
      errors: { name: "required", businessName: "required", city: "required", goal: "required" },
    });
  });

  it("enforces the length limits from the spec", () => {
    const short = validateLead(validLead({ name: "A", businessName: "B", city: "C" }));
    expect(short.ok ? null : short.errors).toEqual({ name: "too_short", businessName: "too_short", city: "too_short" });
    const long = validateLead(
      validLead({
        name: "a".repeat(101),
        businessName: "b".repeat(121),
        city: "c".repeat(101),
        profileUrl: "d".repeat(251),
        message: "e".repeat(2001),
      }),
    );
    expect(long.ok ? null : long.errors).toEqual({
      name: "too_long",
      businessName: "too_long",
      city: "too_long",
      profileUrl: "too_long",
      message: "too_long",
    });
    const atLimit = validateLead(
      validLead({ name: "a".repeat(100), businessName: "b".repeat(120), city: "c".repeat(100), message: "e".repeat(2000) }),
    );
    expect(atLimit.ok).toBe(true);
  });

  it("needs an email or a phone, and validates the one given", () => {
    expect(validateLead(validLead({ email: null, phone: null })).ok).toBe(false);
    expect(validateLead(validLead({ email: "x@example.com", phone: null })).ok).toBe(true);
    expect(validateLead(validLead({ email: "", phone: "+359 2 123 4567" })).ok).toBe(true);
    const bad = validateLead(validLead({ email: "x@", phone: "abc" }));
    expect(bad.ok ? null : bad.errors).toEqual({ email: "invalid_email", phone: "invalid_phone" });
  });

  it("only accepts the defined goal and volume choices", () => {
    expect(validateLead(validLead({ goal: "viral" })).ok).toBe(false);
    expect(validateLead(validLead({ volume: "100" })).ok).toBe(false);
    for (const volume of ["unsure", "4", "8", "12plus", "", null, undefined]) {
      expect(validateLead(validLead({ volume })).ok).toBe(true);
    }
  });

  it("requires the privacy notice acknowledgement flag", () => {
    const r = validateLead(validLead({ privacyNoticeAcknowledged: false }));
    expect(r.ok ? null : r.errors).toEqual({ privacyNoticeAcknowledged: "privacy_required" });
    expect(validateLead(validLead({ privacyNoticeAcknowledged: "on" })).ok).toBe(true);
  });

  it("rejects a malformed requestId and a non-Bulgarian locale", () => {
    const r = validateLead(validLead({ requestId: "123", locale: "en" }));
    expect(r.ok ? null : r.errors).toEqual({ requestId: "invalid_request", locale: "unsupported_locale" });
    expect(validateLead(validLead({ locale: "bg" })).ok).toBe(true);
  });

  it("drops unknown keys such as prices", () => {
    const r = validateLead(validLead({ price: 999, discount: "50%" }));
    expect(r.ok && !("price" in r.data) && !("discount" in r.data)).toBe(true);
  });

  it("keeps only safe UTM values and known source paths", () => {
    const r = validateLead(
      validLead({ utm: { source: "facebook", medium: "<script>", campaign: "x".repeat(200) }, sourcePath: "https://evil" }),
    );
    expect(r.ok && r.data.utm).toEqual({ source: "facebook", medium: null, campaign: null });
    expect(r.ok && r.data.sourcePath).toBeNull();
  });
});

describe("phone numbers", () => {
  it.each([
    "0888 123 456",
    "0888123456",
    "+359 888 123 456",
    "+359888123456",
    "00359 888 123 456",
    "02 123 4567",
    "(02) 987-65-43",
    "+44 20 7946 0958",
    "+1 (415) 555-0123",
  ])("accepts %s", (phone) => expect(isValidPhone(phone)).toBe(true));

  it.each(["123", "abc", "0888 12a 456", "+359+888", "1234567890123456", "08881234567890123"])("rejects %s", (phone) =>
    expect(isValidPhone(phone)).toBe(false),
  );
});

describe("profile / website field", () => {
  it.each([
    "https://example.bg",
    "http://www.example.bg/za-nas",
    "instagram.com/example",
    "@example_bg",
    "facebook.com/Пекарна-Пример",
    "Фейсбук: Пекарна Пример",
  ])("accepts %s", (v) => expect(isValidProfile(v)).toBe(true));

  it.each([
    "javascript:alert(1)",
    " JavaScript:alert(1)",
    "data:text/html;base64,PHNjcmlwdD4=",
    "vbscript:msgbox(1)",
    "ftp://example.com/file",
    "https://user:pass@example.com",
    "https://localhost",
    "<img src=x onerror=alert(1)>",
    'example.com/"onmouseover',
  ])("rejects %s", (v) => expect(isValidProfile(v)).toBe(false));
});

describe("normalisation", () => {
  it("strips invisible, control and bidi-override characters", () => {
    const dirty = `Ан${cp(0x200b)}на${cp(0x202e)} Пе${cp(0x07)}трова${cp(0xfeff)}`;
    expect(normalizeLine(dirty)).toBe("Анна Петрова");
    expect(normalizeLine(`ред${cp(0x2028)}два`)).toBe("реддва");
  });

  it("keeps paragraph breaks in the message but collapses runs", () => {
    expect(normalizeMultiline("ред 1\r\n\r\n\r\n\r\nред 2  \n   ред 3")).toBe("ред 1\n\nред 2\nред 3");
  });

  it("composes Cyrillic to NFC so the same text always dedupes the same", () => {
    const decomposed = "и" + cp(0x0300); // и + combining grave
    expect(normalizeLine(decomposed)).toBe(cp(0x045d)); // ѝ
  });

  it("accepts only internal source paths", () => {
    expect(normalizeSourcePath("/paketi")).toBe("/paketi");
    expect(normalizeSourcePath("/")).toBe("/");
    expect(normalizeSourcePath("/rabota/primer")).toBe("/rabota/primer");
    expect(normalizeSourcePath("//evil.example")).toBeNull();
    expect(normalizeSourcePath("/admin")).toBeNull();
    expect(normalizeSourcePath("/paketi?x=1")).toBeNull();
  });
});

describe("validation under the site's CSP", () => {
  it("never probes for eval (Zod runs jitless)", async () => {
    const { z } = await import("../../src/lib/validation/zod");
    expect(z.config().jitless).toBe(true);
  });
});
