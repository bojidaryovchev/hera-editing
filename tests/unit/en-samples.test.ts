import { describe, expect, it } from "vitest";
import {
  FIXTURE_SAMPLES,
  SAMPLES,
  isPublishableSample,
  isSampleVideoUrl,
  publishedSamples,
  videoPlatform,
  type Sample,
} from "../../src/content/en/samples";
import { EN_WORK } from "../../src/content/en/pages";
import { EN_INDEXABLE_PAGES } from "../../src/lib/en/metadata";

/** A real-looking sample, complete, as the business owner would add it (fictional values). */
const complete: Sample = {
  id: "listing-demo",
  niche: "real-estate",
  title: "Apartment listing",
  kind: "demo",
  videoUrl: "https://vimeo.com/123456789",
  poster: { src: "/samples/listing-demo.jpg", alt: "A living room in daylight", width: 1600, height: 900 },
  description: "A 75-second listing video and its vertical reel.",
  rights: {
    footageSource: "Shot by Hera Editing",
    footageLicence: "The owner's written permission",
    musicLicence: "Royalty-free library licence",
    permissions: "No identifiable people",
  },
  published: true,
};
const env = { APP_ENV: "staging" };

describe("samples are shown only when real, published and rights-complete (decision L38)", () => {
  it("has no real sample yet: the section's portfolio stays empty, /en/work a 404", () => {
    expect(SAMPLES).toEqual([]);
    expect(publishedSamples(env)).toEqual([]);
    expect(EN_INDEXABLE_PAGES.map((p) => p.path)).not.toContain("/en/work");
  });

  it("publishes a complete sample", () => {
    expect(isPublishableSample(complete)).toBe(true);
    expect(publishedSamples(env, [complete])).toEqual([complete]);
  });

  it("never publishes a draft, or a sample with any rights field empty", () => {
    expect(isPublishableSample({ ...complete, published: false })).toBe(false);
    for (const key of ["footageSource", "footageLicence", "musicLicence", "permissions"] as const) {
      expect(isPublishableSample({ ...complete, rights: { ...complete.rights, [key]: null } }), key).toBe(false);
      expect(isPublishableSample({ ...complete, rights: { ...complete.rights, [key]: "  " } }), key).toBe(false);
    }
  });

  it("needs a poster and a YouTube or Vimeo link over https", () => {
    expect(isPublishableSample({ ...complete, poster: null })).toBe(false);
    for (const url of [
      "http://vimeo.com/1",
      "https://example.com/video.mp4",
      "https://vimeo.com.evil.example/1",
      "javascript:alert(1)",
      "https://user:pw@youtube.com/watch?v=1",
    ])
      expect(isSampleVideoUrl(url), url).toBe(false);
    for (const url of ["https://youtu.be/abc", "https://www.youtube.com/watch?v=abc", "https://vimeo.com/1"])
      expect(isSampleVideoUrl(url), url).toBe(true);
    expect(videoPlatform("https://vimeo.com/1")).toBe("vimeo");
    expect(videoPlatform("https://youtu.be/abc")).toBe("youtube");
  });

  it("filters by niche, and labels a demo edit as one", () => {
    const client: Sample = { ...complete, id: "wedding-client", niche: "wedding", kind: "client" };
    expect(publishedSamples(env, [complete, client], "wedding")).toEqual([client]);
    expect(EN_WORK.demoLabel).toBe("Demo edit");
    expect(EN_WORK.clientLabel).toBe("Client work");
  });

  it("shows the fictional fixtures only in tests that ask for them, never from the real list", () => {
    expect(publishedSamples({ APP_ENV: "staging", CONTENT_FIXTURES: "1" })).toEqual([]);
    const inTests = publishedSamples({ APP_ENV: "test", CONTENT_FIXTURES: "1" });
    expect(inTests.map((s) => s.id)).toEqual(["test-wedding-highlight", "test-youtube-story"]);
    expect(publishedSamples(env, [{ ...complete, fixture: true }])).toEqual([]);
    for (const s of FIXTURE_SAMPLES) expect(s.title).toMatch(/fictional data/);
  });
});
