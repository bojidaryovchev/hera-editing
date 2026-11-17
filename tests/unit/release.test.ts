import { describe, expect, it } from "vitest";
import { PRIVACY_NOTICE } from "../../src/content/legal/privacy";
import { SERVICE_TERMS } from "../../src/content/terms";
import { ReleaseGateError, assertPrivacyReady, assertTermsSignedOff } from "../../src/lib/site/release";

describe("a draft privacy notice never reaches production (acceptance F)", () => {
  it("refuses the draft in production", () => {
    expect(PRIVACY_NOTICE.status).toBe("draft");
    expect(() => assertPrivacyReady("production")).toThrow(ReleaseGateError);
  });

  it("shows the draft, labelled, everywhere else", () => {
    for (const env of ["development", "test", "staging"] as const) expect(() => assertPrivacyReady(env)).not.toThrow();
  });

  it("allows an approved notice in production", () => {
    expect(() => assertPrivacyReady("production", { status: "approved" })).not.toThrow();
  });
});

describe("unsigned service terms never reach production (acceptance A)", () => {
  it("refuses them in production", () => {
    expect(SERVICE_TERMS.signedOff).toBe(false);
    expect(() => assertTermsSignedOff("production")).toThrow(ReleaseGateError);
  });

  it("shows them, flagged, everywhere else, and allows signed-off terms in production", () => {
    for (const env of ["development", "test", "staging"] as const)
      expect(() => assertTermsSignedOff(env)).not.toThrow();
    expect(() => assertTermsSignedOff("production", { signedOff: true })).not.toThrow();
  });
});
