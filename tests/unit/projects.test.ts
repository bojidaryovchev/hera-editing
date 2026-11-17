import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "../../src/app/sitemap";
import { PROJECTS, isPublishable, publishedProject, publishedProjects } from "../../src/content/projects";
import { FIXTURE_PROJECTS } from "../../src/content/projects/fixtures";
import type { Project } from "../../src/content/projects/types";
import { visibleNav } from "../../src/lib/site/nav";

const approved = FIXTURE_PROJECTS.find((p) => p.status === "approved")!;
const real = (over: Partial<Project> = {}, rights: Partial<Project["rights"]> = {}): Project => ({
  ...approved,
  fixture: undefined,
  slug: "realen-proekt",
  ...over,
  rights: { ...approved.rights, ...rights },
});

afterEach(() => vi.unstubAllEnvs());

describe("portfolio publication rules (IA:21, acceptance B, E and F)", () => {
  it("publishes only approved work with every rights flag and the client's recorded approval", () => {
    expect(isPublishable(real())).toBe(true);
    expect(isPublishable(real({ status: "draft" }))).toBe(false);
    expect(isPublishable(real({}, { clientPermission: false }))).toBe(false);
    expect(isPublishable(real({}, { footageCleared: false }))).toBe(false);
    expect(isPublishable(real({}, { musicCleared: false }))).toBe(false);
    expect(isPublishable(real({}, { approvedBy: null }))).toBe(false);
    expect(isPublishable(real({}, { approvedAt: " " }))).toBe(false);
  });

  it("publishes nothing today: no real projects exist yet", () => {
    expect(PROJECTS).toEqual([]);
    for (const env of ["development", "staging", "production"]) expect(publishedProjects({ APP_ENV: env })).toEqual([]);
  });

  it("shows the fictional fixtures only in tests with CONTENT_FIXTURES=1, and never their drafts", () => {
    expect(publishedProjects({ APP_ENV: "test", CONTENT_FIXTURES: "1" }).map((p) => p.slug)).toEqual([
      "testova-pekarna",
    ]);
    expect(publishedProjects({ APP_ENV: "test" })).toEqual([]);
    expect(publishedProjects({ APP_ENV: "staging", CONTENT_FIXTURES: "1" })).toEqual([]);
    expect(publishedProjects({ APP_ENV: "production", CONTENT_FIXTURES: "1" })).toEqual([]);
    expect(publishedProject("testov-chernova", { APP_ENV: "test", CONTENT_FIXTURES: "1" })).toBeNull();
  });

  it("never publishes a fixture from the real list, and publishes real approved work everywhere", () => {
    const list = [real(), real({ slug: "fixture-by-mistake", fixture: true })];
    for (const env of ["staging", "production"])
      expect(publishedProjects({ APP_ENV: env }, list).map((p) => p.slug)).toEqual(["realen-proekt"]);
  });

  it("lists /rabota and each published case in the sitemap, and nothing else", () => {
    expect(sitemap().some((e) => e.url.includes("/rabota"))).toBe(false);
    vi.stubEnv("APP_ENV", "test");
    vi.stubEnv("CONTENT_FIXTURES", "1");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain("https://www.example.bg/rabota");
    expect(urls).toContain("https://www.example.bg/rabota/testova-pekarna");
    expect(urls.some((u) => u.includes("testov-chernova"))).toBe(false);
  });

  it("shows the menu link only when something is published", () => {
    expect(visibleNav(false).some((i) => i.href === "/rabota")).toBe(false);
    expect(visibleNav(true).some((i) => i.href === "/rabota")).toBe(true);
  });
});
