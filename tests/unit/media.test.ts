import { describe, expect, it } from "vitest";
import { MEDIA, footage, type SiteMedia } from "../../src/content/media";

describe("placeholder footage never reaches production (L22, acceptance D)", () => {
  it("shows no footage in production while the set is the stock placeholder", () => {
    expect(MEDIA.kind).toBe("placeholder");
    expect(footage("production")).toBeNull();
    expect(footage("production", MEDIA, { PLACEHOLDER_MEDIA: "on" })).toBeNull();
  });

  it("shows the labelled stock in development, test and staging", () => {
    for (const env of ["development", "test", "staging"] as const) expect(footage(env, MEDIA, {})).toBe(MEDIA);
    expect(MEDIA.label).toMatch(/стокови кадри/);
    expect(MEDIA.note).toMatch(/стокови кадри/);
  });

  it("previews the production look anywhere with PLACEHOLDER_MEDIA=off", () => {
    expect(footage("staging", MEDIA, { PLACEHOLDER_MEDIA: "off" })).toBeNull();
    expect(footage("development", MEDIA, { PLACEHOLDER_MEDIA: " off " })).toBeNull();
  });

  it("shows the agency's own footage everywhere, production included", () => {
    const own: SiteMedia = { ...MEDIA, kind: "owner", label: null, note: null };
    for (const env of ["development", "staging", "production"] as const)
      expect(footage(env, own, { PLACEHOLDER_MEDIA: "off" })).toBe(own);
  });

  it("serves every placeholder from the placeholder folder only", () => {
    const paths = [MEDIA.hero.wide, MEDIA.hero.tall, ...Object.values(MEDIA.formats)].flatMap((c) => [
      c.video,
      c.poster,
    ]);
    for (const p of paths) expect(p.startsWith("/placeholder-media/")).toBe(true);
  });
});
