import { beforeEach, describe, expect, it, vi } from "vitest";
import { EMPTY_LEAD_FORM, HIDDEN, INITIAL_LEAD_STATE, formValues, leadFromForm, splitErrors } from "../../src/lib/leads/form";
import { leadFormSchema, validateLead } from "../../src/lib/validation/lead";

const submitLeadFromRequest = vi.fn();
vi.mock("@/lib/leads/runtime", () => ({ submitLeadFromRequest: (...a: unknown[]) => submitLeadFromRequest(...a) }));
vi.mock("next/headers", () => ({ headers: async () => new Headers({ "x-real-ip": "203.0.113.7" }) }));

function postedForm(over: Record<string, string> = {}): FormData {
  const fd = new FormData();
  const fields: Record<string, string> = {
    name: "Мария Иванова",
    businessName: "Пекарна Слънце",
    city: "Пловдив",
    email: "maria@example.com",
    phone: "",
    profileUrl: "instagram.com/slantse",
    goal: "consistency",
    volume: "8",
    message: "Искаме по-редовни видеа.",
    [HIDDEN.requestId]: "8f9c2b8e-3f43-4a3e-9d61-0c1c2a7f1b2d",
    [HIDDEN.sourcePath]: "/paketi",
    [HIDDEN.utmSource]: "instagram",
    [HIDDEN.utmMedium]: "",
    [HIDDEN.utmCampaign]: "",
    [HIDDEN.privacy]: "true",
    [HIDDEN.locale]: "bg",
    [HIDDEN.honeypot]: "",
    ...over,
  };
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

/** The first error code per field, as the browser form (zodResolver) would see it. */
function browserCodes(values: Record<string, string>): Record<string, string> {
  const r = leadFormSchema.safeParse(values);
  const out: Record<string, string> = {};
  if (!r.success) for (const i of r.error.issues) out[String(i.path[0])] ??= i.message;
  return out;
}

describe("the browser form validates exactly like the server", () => {
  const cases: Array<Record<string, string>> = [
    { ...EMPTY_LEAD_FORM },
    { ...EMPTY_LEAD_FORM, name: "М", businessName: "Пекарна", city: "Варна", email: "not-an-email" },
    { ...EMPTY_LEAD_FORM, name: "Мария", businessName: "Пекарна", city: "Варна", phone: "12" },
    { ...EMPTY_LEAD_FORM, name: "Мария", businessName: "Пекарна", city: "Варна", phone: "0888 123 456", profileUrl: "javascript:alert(1)", goal: "x" },
    { ...EMPTY_LEAD_FORM, name: "Мария", businessName: "Пекарна", city: "Варна", email: "m@example.com", goal: "enquiries", message: "x".repeat(2001) },
    { ...EMPTY_LEAD_FORM, name: "Мария", businessName: "Пекарна", city: "Варна", email: "m@example.com", goal: "enquiries", volume: "12plus" },
  ];
  it.each(cases.map((c, i) => [i, c] as const))("case %i gives the same field errors", (_i, values) => {
    const server = validateLead({ ...values, privacyNoticeAcknowledged: "true", locale: "bg" });
    const serverCodes = server.ok ? {} : server.errors;
    expect(browserCodes(values)).toEqual(serverCodes);
  });
});

describe("posted form → submission", () => {
  it("maps every field and hidden input, and the result validates", () => {
    const raw = leadFromForm(postedForm());
    expect(raw).toMatchObject({ name: "Мария Иванова", sourcePath: "/paketi", utm: { source: "instagram" }, locale: "bg" });
    const v = validateLead(raw);
    expect(v.ok).toBe(true);
  });

  it("keeps what was typed for the no-script re-render, capped in length", () => {
    const values = formValues(postedForm({ message: "x".repeat(5000) }));
    expect(values.city).toBe("Пловдив");
    expect(values.message.length).toBe(4000);
  });

  it("separates field errors from request problems", () => {
    expect(splitErrors({ email: "invalid_email", requestId: "invalid_request" })).toEqual({ fields: { email: "invalid_email" }, request: true });
  });
});

describe("submitLeadAction", () => {
  beforeEach(() => submitLeadFromRequest.mockReset());

  it("reports success only for a stored lead and passes the honeypot and headers through", async () => {
    const { submitLeadAction } = await import("../../src/app/kontakti/actions");
    submitLeadFromRequest.mockResolvedValue({ status: "created", id: "lead-1", suppressed: false });
    const state = await submitLeadAction(INITIAL_LEAD_STATE, postedForm({ [HIDDEN.honeypot]: "bot" }));
    expect(state).toMatchObject({ status: "success", seq: 1, id: "lead-1", values: { city: "Пловдив" } });
    const [, headers, extras] = submitLeadFromRequest.mock.calls[0] as [unknown, Headers, { honeypot: unknown }];
    expect(headers.get("x-real-ip")).toBe("203.0.113.7");
    expect(extras.honeypot).toBe("bot");
  });

  it("returns field errors with the typed values, and failures without losing them", async () => {
    const { submitLeadAction } = await import("../../src/app/kontakti/actions");
    submitLeadFromRequest.mockResolvedValueOnce({ status: "invalid", errors: { email: "invalid_email" } });
    const invalid = await submitLeadAction({ status: "idle", seq: 4 }, postedForm({ email: "nope" }));
    expect(invalid).toMatchObject({ status: "invalid", seq: 5, errors: { email: "invalid_email" }, values: { email: "nope" } });

    submitLeadFromRequest.mockResolvedValueOnce({ status: "rate_limited", retryAfterSeconds: 60 });
    expect(await submitLeadAction(INITIAL_LEAD_STATE, postedForm())).toMatchObject({ status: "rate_limited", retryAfterSeconds: 60 });

    submitLeadFromRequest.mockResolvedValueOnce({ status: "unavailable" });
    expect(await submitLeadAction(INITIAL_LEAD_STATE, postedForm())).toMatchObject({ status: "unavailable", values: { name: "Мария Иванова" } });

    submitLeadFromRequest.mockResolvedValueOnce({ status: "verification_failed" });
    expect(await submitLeadAction(INITIAL_LEAD_STATE, postedForm())).toMatchObject({ status: "invalid", errors: { requestId: "invalid_request" } });
  });
});
