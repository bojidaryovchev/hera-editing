import { describe, expect, it } from "vitest";
import {
  ANALYTICS_COOKIE_SECONDS,
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  isAnalyticsCookie,
  parseConsent,
  readCookie,
  serializeConsent,
} from "../../src/lib/consent";

describe("the stored cookie choice (acceptance F)", () => {
  it("round-trips both answers with the time they were given", () => {
    const now = Date.UTC(2026, 10, 16, 12, 0, 0);
    for (const analytics of [true, false]) {
      const raw = serializeConsent(analytics, now);
      expect(parseConsent(raw)).toEqual({
        version: 1,
        analytics,
        at: now / 1000,
      });
    }
  });

  it("treats anything malformed or from another version as no choice, so the visitor is asked again", () => {
    for (const raw of [
      null,
      undefined,
      "",
      "yes",
      "v1.a2.1767225600",
      "v1.a1.",
      "v2.a1.1767225600",
      "v1.a1.1767225600;x",
      " v1.a1.1767225600",
    ])
      expect(parseConsent(raw)).toBeNull();
  });

  it("reads one cookie out of document.cookie, decoding it, and never a cookie whose name merely contains it", () => {
    const jar = `x_${CONSENT_COOKIE}=nope; _ga=GA1.1.1; ${CONSENT_COOKIE}=v1.a0.1767225600; other=a%3Db`;
    expect(readCookie(jar, CONSENT_COOKIE)).toBe("v1.a0.1767225600");
    expect(readCookie(jar, "other")).toBe("a=b");
    expect(readCookie(jar, "missing")).toBeNull();
    expect(readCookie("", CONSENT_COOKIE)).toBeNull();
  });

  it("removes exactly the Google Analytics cookies on withdrawal", () => {
    for (const name of ["_ga", "_ga_ABC123", "_gid"])
      expect(isAnalyticsCookie(name)).toBe(true);
    for (const name of [CONSENT_COOKIE, "_gat_x", "ga", "__ga", "_gaz"])
      expect(isAnalyticsCookie(name)).toBe(false);
  });

  it("asks again after about six months and keeps GA cookies 13 months at most", () => {
    expect(CONSENT_MAX_AGE_SECONDS / 86400).toBeGreaterThanOrEqual(180);
    expect(CONSENT_MAX_AGE_SECONDS / 86400).toBeLessThanOrEqual(186);
    expect(ANALYTICS_COOKIE_SECONDS / 86400).toBeLessThanOrEqual(396);
  });
});
