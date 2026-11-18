import { describe, expect, it } from "vitest";
import { EN_ORDER, orderErrorMessage, orderErrorShort } from "../../src/content/en/order";
import { EMPTY_ORDER_FORM, ORDER_FORM_FIELDS, type OrderFormValues } from "../../src/lib/en/order-fields";
import { ORDER_HIDDEN, orderFormValues, orderFromForm, splitOrderErrors } from "../../src/lib/leads/order-form";
import {
  ORDER_ERROR_CODES,
  normalizeOrderSource,
  orderFormSchema,
  validateOrder,
} from "../../src/lib/validation/order";

/** A complete, clearly fictional order. */
function order(over: Partial<OrderFormValues> & Record<string, unknown> = {}): Record<string, unknown> {
  return {
    ...EMPTY_ORDER_FORM,
    package: "wedding-highlight",
    name: "Test Person",
    businessName: "Test Films LLC (fictional)",
    email: "test.order@example.com",
    country: "US",
    businessConfirmed: "true",
    music: "client",
    aiVisuals: "not_allowed",
    privacyNoticeAcknowledged: "true",
    sourcePath: "/en/wedding-editing",
    utm: {},
    requestId: "",
    locale: "en",
    ...over,
  };
}

const NOW = () => new Date("2026-11-18T12:00:00Z");
const rules = (euOrders = false) => ({ euOrders, now: NOW });
const errorsOf = (raw: Record<string, unknown>, eu = false) => {
  const r = validateOrder(raw, rules(eu));
  return r.ok ? {} : r.errors;
};

/** The first error code per field, as the browser form (zodResolver) sees it. */
function browserCodes(values: Record<string, unknown>, eu = false): Record<string, string> {
  const r = orderFormSchema(rules(eu)).safeParse(values);
  const out: Record<string, string> = {};
  if (!r.success) for (const i of r.error.issues) out[String(i.path[0])] ??= i.message;
  return out;
}

describe("the order form's rules (sales kit §5)", () => {
  it("accepts a complete order and keeps only the chosen package's niche fields", () => {
    const r = validateOrder(order({ couple: "Ann and Bob", script: "docs.google.com/document/1" }), rules());
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.details).toMatchObject({
      package: "wedding-highlight",
      packageName: "Highlight from selects",
      priceUsd: 380,
      country: "US",
      businessConfirmed: true,
      niche: "wedding",
      wedding: { couple: "Ann and Bob" },
    });
    expect(r.data.details.youtube).toBeUndefined();
    expect(r.data.sourcePath).toBe("/en/wedding-editing");
  });

  it("requires the package, the person, the business, an email, the country, the business confirmation and the two choices", () => {
    expect(errorsOf({})).toEqual({
      package: "required",
      name: "required",
      businessName: "required",
      email: "required",
      country: "required",
      businessConfirmed: "business_required",
      music: "required",
      aiVisuals: "required",
      privacyNoticeAcknowledged: "privacy_required",
    });
  });

  it("refuses an unknown package, country or choice, a bad email, link, VAT number or date", () => {
    expect(
      errorsOf(
        order({
          package: "free-edit",
          country: "XX",
          music: "pirated",
          email: "nope",
          footageUrl: "javascript:alert(1)",
          vatNumber: "<b>",
          deadline: "2026-02-30",
        }),
      ),
    ).toEqual({
      package: "invalid_choice",
      country: "invalid_country",
      music: "invalid_choice",
      email: "invalid_email",
      footageUrl: "invalid_url",
      vatNumber: "invalid_vat",
      deadline: "invalid_date",
    });
    expect(errorsOf(order({ deadline: "2026-11-01" }))).toEqual({ deadline: "date_past" });
    expect(errorsOf(order({ deadline: "2026-12-01", footageUrl: "https://drive.google.com/drive/x" }))).toEqual({});
  });

  it("asks a custom quote to describe the job, and ignores the description for a package", () => {
    expect(errorsOf(order({ package: "custom" }))).toEqual({ scope: "required" });
    expect(errorsOf(order({ package: "custom", scope: "Short" }))).toEqual({ scope: "too_short" });
    const r = validateOrder(order({ package: "custom", scope: "Four hours of two-camera event footage." }), rules());
    expect(r.ok && r.data.details).toMatchObject({ package: "custom", priceUsd: null, niche: null });
    const pkg = validateOrder(order({ scope: "Typed before choosing a package." }), rules());
    expect(pkg.ok && pkg.data.details.scope).toBeNull();
  });

  it("never fails on a field the chosen package hides (a niche typed into, then the package changed)", () => {
    const hidden = order({ package: "listing-video", script: "not a link at all", couple: "x".repeat(500) });
    expect(errorsOf(hidden)).toEqual({});
    expect(browserCodes(hidden)).toEqual({});
  });

  it("accepts only English-section pages as the source, and only the English locale", () => {
    expect(normalizeOrderSource("/en/pricing")).toBe("/en/pricing");
    expect(normalizeOrderSource("/en")).toBe("/en");
    for (const bad of ["/paketi", "//evil.example", "/en/../admin", "https://x.example/en", "/en?x=1"])
      expect(normalizeOrderSource(bad), bad).toBeNull();
    expect(errorsOf(order({ locale: "bg" }))).toEqual({ locale: "unsupported_locale" });
  });
});

describe("EU orders (decision L38)", () => {
  it("are refused with the EU code while EN_EU_ORDERS is off, and accepted once it is on", () => {
    for (const c of ["DE", "FR", "IE", "NL"]) {
      expect(errorsOf(order({ country: c })), c).toEqual({ country: "eu_unavailable" });
      expect(browserCodes(order({ country: c })), c).toEqual({ country: "eu_unavailable" });
      expect(errorsOf(order({ country: c }), true), c).toEqual({});
    }
  });

  it("always accept Bulgaria and the rest of the world", () => {
    for (const c of ["BG", "US", "GB", "CA", "AU", "NO"]) expect(errorsOf(order({ country: c })), c).toEqual({});
  });

  it("say so plainly", () => {
    expect(orderErrorMessage("country", "eu_unavailable")).toBe("We can't take orders from businesses in the EU yet.");
    expect(EN_ORDER.form.euNotice).toBe("We can't take orders from businesses in the EU yet.");
  });
});

describe("the browser validates exactly like the server", () => {
  const cases: Array<Record<string, unknown>> = [
    { ...EMPTY_ORDER_FORM },
    order({ email: "not-an-email", name: "A" }),
    order({ country: "DE" }),
    order({ package: "custom" }),
    order({ footageUrl: "data:text/html,x", deadline: "2020-01-01" }),
    order({ package: "youtube-story", channel: "javascript:void(0)" }),
    order(),
  ];
  it.each(cases.map((c, i) => [i, c] as const))("case %i", (_i, values) => {
    const server = errorsOf(values);
    const fields = Object.fromEntries(
      Object.entries(server).filter(([k]) => (ORDER_FORM_FIELDS as string[]).includes(k)),
    );
    expect(browserCodes(values)).toEqual(fields);
  });
});

describe("the form as posted (no script) and its messages", () => {
  it("rebuilds the submission from FormData, a ticked checkbox counting as confirmed", () => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(order())) if (typeof v === "string") fd.set(k, v);
    fd.set("businessConfirmed", "on");
    fd.set(ORDER_HIDDEN.utmSource, "newsletter");
    const raw = orderFromForm(fd);
    expect(raw).toMatchObject({ businessConfirmed: "true", utm: { source: "newsletter" }, locale: "en" });
    expect(validateOrder(raw, rules()).ok).toBe(true);
    expect(orderFormValues(fd).name).toBe("Test Person");
  });

  it("splits field errors from request problems", () => {
    expect(splitOrderErrors({ email: "invalid_email", requestId: "invalid_request" })).toEqual({
      fields: { email: "invalid_email" },
      request: true,
    });
  });

  it("has an English message, and a short one, for every field and code", () => {
    for (const f of ORDER_FORM_FIELDS)
      for (const code of ORDER_ERROR_CODES) {
        expect(orderErrorMessage(f, code).length, `${f} ${code}`).toBeGreaterThan(5);
        expect(orderErrorShort(f, code).length, `${f} ${code}`).toBeLessThanOrEqual(32);
      }
  });

  it("labels every field, and keeps the hints short enough for one line on a phone", () => {
    for (const f of ORDER_FORM_FIELDS) expect(EN_ORDER.form.labels[f].length, f).toBeLessThanOrEqual(48);
    for (const [k, hint] of Object.entries(EN_ORDER.form.hints)) expect(hint.length, k).toBeLessThanOrEqual(40);
  });

  it("promises the written reply, the bank transfer and no card, in the owner's words", () => {
    expect(EN_ORDER.form.successText).toBe(
      "We'll reply in writing within 1 business day with the exact price and your start date. Payment by bank transfer, in advance.",
    );
  });
});
