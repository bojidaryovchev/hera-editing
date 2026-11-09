import { describe, expect, it } from "vitest";
import { MEDIA, PlaceholderMediaError, assertMediaAllowed, type SiteMedia } from "../../src/content/media";

describe("placeholder footage never reaches production (L22)", () => {
  it("refuses the stock placeholder in production", () => {
    expect(MEDIA.kind).toBe("placeholder");
    expect(() => assertMediaAllowed("production")).toThrow(PlaceholderMediaError);
  });

  it("allows it in development, test and staging, always labelled", () => {
    for (const env of ["development", "test", "staging"] as const) expect(() => assertMediaAllowed(env)).not.toThrow();
    expect(MEDIA.label).toMatch(/стокови кадри/);
    expect(MEDIA.note).toMatch(/стокови кадри/);
  });

  it("allows the agency's own footage in production", () => {
    const own: SiteMedia = { ...MEDIA, kind: "owner", label: null, note: null };
    expect(() => assertMediaAllowed("production", own)).not.toThrow();
  });

  it("serves every placeholder from the placeholder folder only", () => {
    const paths = [MEDIA.hero.wide, MEDIA.hero.tall, ...Object.values(MEDIA.formats)].flatMap((c) => [c.video, c.poster]);
    for (const p of paths) expect(p.startsWith("/placeholder-media/")).toBe(true);
  });
});
