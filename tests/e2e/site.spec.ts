import { expect, test } from "@playwright/test";
import { ALL_PAGES, EN_ALL_PAGES, FIXTURE_CASE, PAGES, presetConsent, stubGoogle, watchConsole } from "./helpers";
import { BASE } from "./ports";

const strip = (u: string) => u.replace(/\/$/, "");

test.beforeEach(async ({ context }) => {
  await stubGoogle(context);
  await presetConsent(context, false);
});

test.describe("every page (acceptance B, E, G)", () => {
  for (const path of ALL_PAGES) {
    test(`${path}: renders, one H1, its own metadata and share image, no console errors`, async ({ page, request }) => {
      const errors = watchConsole(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "bg");
      await expect(page.locator("h1")).toHaveCount(1);

      const head = await page.evaluate(() => {
        const meta = (sel: string) => document.querySelector(sel)?.getAttribute("content") ?? null;
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
          ogImage: meta('meta[property="og:image"]'),
          ogAlt: meta('meta[property="og:image:alt"]'),
          ogUrl: meta('meta[property="og:url"]'),
          twitter: meta('meta[name="twitter:card"]'),
          robots: meta('meta[name="robots"]'),
        };
      });
      expect(head.title).toMatch(/Hera Editing/);
      expect(head.description?.length ?? 0).toBeGreaterThan(50);
      expect(strip(head.canonical ?? "")).toBe(strip(new URL(path, BASE).href));
      expect(strip(head.ogUrl ?? "")).toBe(strip(new URL(path, BASE).href));
      expect(head.twitter).toBe("summary_large_image");
      expect(head.ogAlt).toMatch(/^Hera Editing: \S/);
      // Outside production every page says noindex (only production is indexed).
      expect(head.robots).toBe("noindex, nofollow");

      const image = await request.get(head.ogImage ?? "");
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toBe("image/png");

      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
    });
  }

  test("titles and descriptions are unique across pages", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const path of ALL_PAGES) {
      await page.goto(path);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(ALL_PAGES.length);
    expect(descriptions.size).toBe(ALL_PAGES.length);
  });

  test("no dead internal links", async ({ page, request }) => {
    const seen = new Set<string>();
    for (const path of ALL_PAGES) {
      await page.goto(path);
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
      for (const href of hrefs) {
        const u = new URL(href);
        if (u.origin !== new URL(BASE).origin) continue;
        u.hash = "";
        seen.add(u.toString());
      }
    }
    for (const url of seen) {
      const res = await request.get(url);
      expect(res.status(), url).toBeLessThan(400);
    }
  });
});

test.describe("not found and unpublished (acceptance B, E)", () => {
  test("an unknown address answers 404 with a way back, and is not indexed", async ({ page }) => {
    const res = await page.goto("/niama-takava-stranica");
    expect(res?.status()).toBe(404);
    // Next.js adds its own noindex to a 404 beside the page's; every robots tag must say noindex.
    const robots = await page.$$eval('meta[name="robots"]', (ms) => ms.map((m) => m.getAttribute("content") ?? ""));
    expect(robots.length).toBeGreaterThan(0);
    for (const r of robots) expect(r).toMatch(/noindex/);
    await expect(page.locator("main a[href='/']").first()).toBeVisible();
  });

  test("a draft case study does not exist", async ({ request }) => {
    expect((await request.get("/rabota/testov-chernova")).status()).toBe(404);
  });
});

test.describe("crawling and structured data (acceptance E)", () => {
  test("robots.txt keeps crawlers out of this non-production build", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toMatch(/User-Agent: \*\s+Disallow: \//);
  });

  test("the sitemap lists exactly the published pages", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => strip(new URL(m[1]!).pathname) || "/");
    // The English section is on in this build, with its fictional samples (decision L38; en.spec.ts has the rest).
    expect(locs.sort()).toEqual(
      [...PAGES.map((p) => strip(p) || "/"), "/rabota", FIXTURE_CASE, ...EN_ALL_PAGES].sort(),
    );
  });

  test("home describes the site and the brand; internal pages their breadcrumbs", async ({ page }) => {
    const ld = async () =>
      page.$$eval('script[type="application/ld+json"]', (ss) =>
        ss.map((s) => JSON.parse(s.textContent ?? "{}") as Record<string, unknown>),
      );
    await page.goto("/");
    const home = JSON.stringify(await ld());
    expect(home).toContain('"@type":"WebSite"');
    expect(home).toContain('"@type":"Organization"');
    for (const claim of ["aggregateRating", "Review", "FAQPage", "LocalBusiness"]) expect(home).not.toContain(claim);

    await page.goto(FIXTURE_CASE);
    const crumbs = (await ld()).find((d) => d["@type"] === "BreadcrumbList") as { itemListElement: { name: string }[] };
    expect(crumbs.itemListElement.map((i) => i.name)).toEqual([
      "Начало",
      "Проекти",
      "Тестова пекарна (фиктивни данни)",
    ]);
  });

  test("security headers on every response", async ({ request }) => {
    const h = (await request.get("/")).headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["content-security-policy"]).toContain("https://*.googletagmanager.com");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-robots-tag"]).toBe("noindex, nofollow");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("leads can only be posted, never listed", async ({ request }) => {
    expect((await request.get("/api/leads")).status()).toBe(405);
  });
});
