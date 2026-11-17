import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "../../src/app/robots";
import sitemap from "../../src/app/sitemap";
import { BUSINESS } from "../../src/content/business";
import { SEO } from "../../src/content/seo";
import { fitSize, fontMeasure, lineCount } from "../../src/lib/site/font-metrics";
import { INDEXABLE_PAGES, pageMetadata, pagePath } from "../../src/lib/site/metadata";
import { SHARE, shareAlt } from "../../src/lib/site/share";
import { breadcrumbLd, homeGraph, jsonLdString, organizationLd } from "../../src/lib/site/structured-data";
import { absoluteUrl, isIndexable, siteOrigin } from "../../src/lib/site/url";

const APP = path.resolve(import.meta.dirname, "../../src/app");

/** Every page route under src/app (folders with a page.tsx), as URL paths. */
function pageRoutes(dir = APP, prefix = ""): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory() || name === "api") continue;
    if (existsSync(path.join(full, "page.tsx"))) out.push(`${prefix}/${name}`);
    out.push(...pageRoutes(full, `${prefix}/${name}`));
  }
  return out;
}

afterEach(() => vi.unstubAllEnvs());

describe("site URL and indexing (TS:SEO)", () => {
  it("takes the origin of NEXT_PUBLIC_SITE_URL and falls back to localhost", () => {
    expect(siteOrigin({ NEXT_PUBLIC_SITE_URL: "https://www.example.bg/some/path?x=1" })).toBe("https://www.example.bg");
    expect(siteOrigin({ NEXT_PUBLIC_SITE_URL: "not a url" })).toBe("http://localhost:3000");
    expect(siteOrigin({})).toBe("http://localhost:3000");
    expect(absoluteUrl("/paketi", { NEXT_PUBLIC_SITE_URL: "https://www.example.bg" })).toBe(
      "https://www.example.bg/paketi",
    );
  });

  it("indexes production only", () => {
    expect(isIndexable({ APP_ENV: "production" })).toBe(true);
    expect(isIndexable({ VERCEL_ENV: "production" })).toBe(true);
    for (const env of ["development", "test", "staging"]) expect(isIndexable({ APP_ENV: env })).toBe(false);
    expect(isIndexable({ VERCEL_ENV: "preview" })).toBe(false);
  });
});

describe("page metadata (acceptance E)", () => {
  it("lists every page route once; only the portfolio is conditional", () => {
    const listed = INDEXABLE_PAGES.map((p) => p.path).filter((p) => p !== "/");
    expect(new Set(INDEXABLE_PAGES.map((p) => p.path)).size).toBe(INDEXABLE_PAGES.length);
    expect(pageRoutes().sort()).toEqual([...listed, "/rabota", "/rabota/[slug]"].sort());
  });

  it("gives each page a unique title, description, canonical and share card", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const { key, path: p } of INDEXABLE_PAGES) {
      const m = pageMetadata(key);
      expect(m.alternates?.canonical).toBe(p);
      expect(m.openGraph).toMatchObject({
        url: p,
        locale: "bg_BG",
        type: "website",
        title: SEO[key].title,
        description: SEO[key].description,
      });
      expect(m.twitter).toMatchObject({ card: "summary_large_image" });
      titles.add(SEO[key].title);
      descriptions.add(SEO[key].description);
    }
    expect(titles.size).toBe(INDEXABLE_PAGES.length);
    expect(descriptions.size).toBe(INDEXABLE_PAGES.length);
  });

  it("puts the brand after the search phrase on home; other pages get it from the layout template", () => {
    expect(pageMetadata("home").title).toEqual({ absolute: `${SEO.home.title} | Hera Editing` });
    expect(pageMetadata("packages").title).toBe(SEO.packages.title);
  });

  it("has a share image route with alt text for every indexable page", () => {
    for (const { key, path: p } of INDEXABLE_PAGES) {
      const file = path.join(APP, p === "/" ? "" : p, "opengraph-image.tsx");
      expect(existsSync(file), file).toBe(true);
      expect(readFileSync(file, "utf8")).toContain(`ogAlt("${key}")`);
      expect(shareAlt(key)).toMatch(/^Hera Editing: \S/);
      expect(SHARE[key].title.length).toBeGreaterThan(0);
    }
  });

  it("rejects an unknown page key", () => {
    expect(() => pagePath("nope" as never)).toThrow();
    expect(pagePath("work")).toBe("/rabota");
  });
});

describe("sitemap and robots", () => {
  it("lists exactly the indexable pages, as absolute URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    const urls = sitemap().map((e) => e.url);
    expect(urls).toEqual(
      INDEXABLE_PAGES.map((p) => (p.path === "/" ? "https://www.example.bg/" : `https://www.example.bg${p.path}`)),
    );
    expect(urls.some((u) => /\/(rabota|api)\b/.test(u))).toBe(false);
  });

  it("keeps crawlers out outside production", () => {
    vi.stubEnv("APP_ENV", "staging");
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("invites crawling in production and points to the sitemap", () => {
    vi.stubEnv("APP_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/", disallow: "/api/" },
      sitemap: "https://www.example.bg/sitemap.xml",
    });
  });
});

describe("structured data claims only verified facts (acceptance E)", () => {
  const base = { brand: "Hera Editing", contacts: { email: null, phone: null }, business: BUSINESS };

  it("names the brand, URL and logo, and nothing unverified", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    const org = organizationLd(base);
    expect(org).toEqual({
      "@type": "Organization",
      "@id": "https://www.example.bg/#organization",
      name: "Hera Editing",
      url: "https://www.example.bg/",
      logo: "https://www.example.bg/brand/icon-512.png",
    });
  });

  it("adds contacts only when configured, and company facts only once verified", () => {
    const socials = { facebook: "https://facebook.com/x", instagram: null, tiktok: null, youtube: null };
    const withContacts = organizationLd({
      ...base,
      contacts: { email: "office@example.bg", phone: "+359 2 000 0000" },
    });
    expect(withContacts).toMatchObject({ email: "office@example.bg", telephone: "+359 2 000 0000" });

    const unverified = organizationLd({ ...base, business: { ...BUSINESS, legalName: "Хера ЕООД", socials } });
    expect(unverified).not.toHaveProperty("legalName");
    expect(unverified).not.toHaveProperty("sameAs");

    const verified = organizationLd({
      ...base,
      business: { ...BUSINESS, legalName: "Хера ЕООД", socials, verified: true },
    });
    expect(verified).toMatchObject({ legalName: "Хера ЕООД", sameAs: ["https://facebook.com/x"] });
  });

  it("never claims ratings, reviews, FAQ answers or a local business", () => {
    const text = JSON.stringify(homeGraph());
    for (const word of ["aggregateRating", "review", "FAQPage", "LocalBusiness", "address"])
      expect(text).not.toContain(word);
  });

  it("builds breadcrumbs that match the visible trail", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.example.bg");
    expect(
      breadcrumbLd([
        { name: "Начало", path: "/" },
        { name: "Пакети", path: "/paketi" },
      ]),
    ).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Начало", item: "https://www.example.bg/" },
        { "@type": "ListItem", position: 2, name: "Пакети", item: "https://www.example.bg/paketi" },
      ],
    });
  });

  it("cannot be broken out of its script tag", () => {
    expect(jsonLdString({ name: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});

describe("share image headlines fit (font metrics)", () => {
  const display = fontMeasure(
    readFileSync(path.resolve(import.meta.dirname, "../../src/assets/fonts/SofiaSansExtraCondensed-ExtraBold.ttf")),
  );

  it("measures Cyrillic text in proportion to its size", () => {
    const w = display("Пакети", 100);
    expect(w).toBeGreaterThan(100);
    expect(display("Пакети", 200)).toBeCloseTo(w * 2, 5);
    expect(display("Пакети за бизнеса", 100)).toBeGreaterThan(w);
  });

  it("wraps greedily and picks a smaller size for a longer headline", () => {
    expect(lineCount(display, ["Пакети"], 100, 2000)).toBe(1);
    expect(lineCount(display, "Пакети според нуждите на Вашия бизнес".split(" "), 136, 600)).toBeGreaterThan(1);
    const box = { width: 1072, height: 262, lineHeight: 0.92, maxLines: 3 };
    const sizes = [136, 120, 104, 88, 72];
    const short = fitSize(display, ["За", "нас"], box, sizes);
    const long = fitSize(
      display,
      "Вашият бизнес има какво да покаже. Ние се грижим хората да го видят.".split(" "),
      box,
      sizes,
    );
    expect(short).toBe(136);
    expect(long).toBeLessThan(short);
  });

  it("fits every page's headline within three lines", () => {
    const box = { width: 1072, height: 262, lineHeight: 0.92, maxLines: 3 };
    for (const card of Object.values(SHARE)) {
      const words = `${card.title} ${card.accent ?? ""}`.trim().split(/\s+/);
      const size = fitSize(display, words, box, [136, 128, 120, 112, 104, 96, 88, 80, 72]);
      expect(lineCount(display, words, size, box.width)).toBeLessThanOrEqual(3);
      expect(size).toBeGreaterThanOrEqual(80);
    }
  });
});
