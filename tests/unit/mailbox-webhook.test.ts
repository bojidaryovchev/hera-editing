import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { signWebhook, verifyWebhook, webhookHeaders } from "../../src/lib/mailbox/webhook";

/*
 * Only a request Resend signed, recently, over exactly these bytes gets through (TS:Security). The reference
 * signature below is computed independently, the way the standardwebhooks library the Resend SDK uses does it.
 */

const SECRET = `whsec_${Buffer.from("a fixed test key, 32 bytes long!").toString("base64")}`;
const NOW = new Date("2026-11-18T10:00:00Z");
const T = Math.floor(NOW.getTime() / 1000);
const BODY = JSON.stringify({ type: "email.received", data: { email_id: "abc", subject: "Оферта" } });

const reference = (id: string, ts: number, body: string) =>
  `v1,${createHmac("sha256", Buffer.from("a fixed test key, 32 bytes long!")).update(`${id}.${ts}.${body}`).digest("base64")}`;

describe("Resend webhook signatures", () => {
  it("accepts a fresh request signed over its exact bytes", () => {
    const signature = reference("msg_1", T, BODY);
    expect(signWebhook(SECRET, "msg_1", T, BODY)).toBe(signature);
    const verdict = verifyWebhook(BODY, { id: "msg_1", timestamp: String(T), signature }, SECRET, NOW);
    expect(verdict).toEqual({ ok: true, event: JSON.parse(BODY) });
  });

  it("accepts any one of several listed signatures (a rotated secret)", () => {
    const signature = `v1,bm90IHRoaXMgb25l ${reference("msg_1", T, BODY)}`;
    expect(verifyWebhook(BODY, { id: "msg_1", timestamp: String(T), signature }, SECRET, NOW).ok).toBe(true);
  });

  it("refuses a body that changed after signing, even by one character or by re-serialising", () => {
    const signature = reference("msg_1", T, BODY);
    const tampered = BODY.replace("Оферта", "Оферта!");
    expect(verifyWebhook(tampered, { id: "msg_1", timestamp: String(T), signature }, SECRET, NOW)).toEqual({
      ok: false,
      reason: "signature",
    });
    const reformatted = JSON.stringify(JSON.parse(BODY), null, 2);
    expect(verifyWebhook(reformatted, { id: "msg_1", timestamp: String(T), signature }, SECRET, NOW).ok).toBe(false);
  });

  it("refuses another message id, another secret, or an unknown version", () => {
    const signature = reference("msg_1", T, BODY);
    expect(verifyWebhook(BODY, { id: "msg_2", timestamp: String(T), signature }, SECRET, NOW).ok).toBe(false);
    const other = `whsec_${Buffer.from("another key entirely, 32 bytes!!").toString("base64")}`;
    expect(verifyWebhook(BODY, { id: "msg_1", timestamp: String(T), signature }, other, NOW).ok).toBe(false);
    const v2 = signature.replace(/^v1,/, "v2,");
    expect(verifyWebhook(BODY, { id: "msg_1", timestamp: String(T), signature: v2 }, SECRET, NOW).ok).toBe(false);
  });

  it("refuses a replay older than five minutes, or a timestamp from the future", () => {
    for (const ts of [T - 301, T + 301]) {
      const signature = reference("msg_1", ts, BODY);
      expect(verifyWebhook(BODY, { id: "msg_1", timestamp: String(ts), signature }, SECRET, NOW)).toEqual({
        ok: false,
        reason: "timestamp",
      });
    }
    const edge = T - 300;
    expect(
      verifyWebhook(
        BODY,
        { id: "msg_1", timestamp: String(edge), signature: reference("msg_1", edge, BODY) },
        SECRET,
        NOW,
      ).ok,
    ).toBe(true);
  });

  it("refuses without a usable secret, and reads either header naming", () => {
    expect(verifyWebhook(BODY, { id: "msg_1", timestamp: String(T), signature: "v1,x" }, "whsec_", NOW)).toEqual({
      ok: false,
      reason: "secret",
    });
    const svix = new Map([
      ["svix-id", "a"],
      ["svix-timestamp", "1"],
      ["svix-signature", "v1,x"],
    ]);
    expect(webhookHeaders((n) => svix.get(n) ?? null)).toEqual({ id: "a", timestamp: "1", signature: "v1,x" });
    const standard = new Map([
      ["webhook-id", "b"],
      ["webhook-timestamp", "2"],
      ["webhook-signature", "v1,y"],
    ]);
    expect(webhookHeaders((n) => standard.get(n) ?? null)).toEqual({ id: "b", timestamp: "2", signature: "v1,y" });
    expect(webhookHeaders(() => null)).toBeNull();
  });
});
