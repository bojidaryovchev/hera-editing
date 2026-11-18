import { describe, expect, it } from "vitest";
import { passwordMatches, signSession, verifySession } from "../../src/lib/admin/auth";

/* The admin session (decision L32): a signed expiry, nothing else, checked in constant time. */

const SECRET = "a-session-secret-of-at-least-thirty-two-chars";
const NOW = Date.UTC(2026, 10, 18, 12);

describe("admin session cookie", () => {
  it("verifies a token it signed until it expires", () => {
    const token = signSession(SECRET, NOW + 60_000);
    expect(verifySession(SECRET, token, NOW)).toBe(true);
    expect(verifySession(SECRET, token, NOW + 60_000)).toBe(false);
  });

  it("refuses another secret, an edited expiry, a stripped or garbled token", () => {
    const token = signSession(SECRET, NOW + 60_000);
    expect(verifySession("another-secret-of-at-least-thirty-two-chars", token, NOW)).toBe(false);
    const [v, , sig] = token.split(".");
    expect(verifySession(SECRET, `${v}.${NOW + 10 ** 12}.${sig}`, NOW)).toBe(false);
    expect(verifySession(SECRET, `${v}.${NOW + 60_000}`, NOW)).toBe(false);
    expect(verifySession(SECRET, "v2" + token.slice(2), NOW)).toBe(false);
    expect(verifySession(SECRET, undefined, NOW)).toBe(false);
    expect(verifySession(SECRET, "garbage", NOW)).toBe(false);
    expect(verifySession("", token, NOW)).toBe(false);
  });
});

describe("admin password", () => {
  it("matches only the exact password, empty never", () => {
    expect(passwordMatches("correct horse battery", "correct horse battery", SECRET)).toBe(true);
    expect(passwordMatches("correct horse batter", "correct horse battery", SECRET)).toBe(false);
    expect(passwordMatches("Correct horse battery", "correct horse battery", SECRET)).toBe(false);
    expect(passwordMatches("", "correct horse battery", SECRET)).toBe(false);
    expect(passwordMatches("x", "", SECRET)).toBe(false);
  });
});
