import { expect, test, type Page } from "@playwright/test";
import { EN_LINK_FROM_BG } from "../../src/content/en/site";
import {
  EN_ALL_PAGES,
  EN_PAGES,
  PAGES,
  closeDb,
  fillOrder,
  presetConsent,
  query,
  stubGoogle,
  testEmail,
  watchConsole,
} from "./helpers";
import { BASE, EN_OFF } from "./ports";

/*
 * The English section /en (decision L38) on the production-built e2e site: every page, its metadata, navigation and
 * the phone menu, the order form (validation, the EU rule, success and the stored order), consent in English, and
 * the gating against a second build with the section switched off. tests/e2e/responsive.spec.ts and a11y.spec.ts
 * cover the same pages at every width and with axe.
 */

const strip = (u: string) => u.replace(/\/$/, "");
const SEND = "Send my brief";
const SUCCESS = "Thank you. Your brief is in.";

type OrderRow = {
  id: string;
  locale: string;
  email: string;
  source_path: string | null;
  details: Record<string, unknown>;
};
const ordersByEmail = (email: string) => query<OrderRow>("select * from leads where email = $1", [email]);

test.beforeEach(async ({ context }) => {
  await stubGoogle(context);
  await presetConsent(context, false);
});
test.afterAll(async () => closeDb());

test.describe("every English page (acceptance B, E, G)", () => {
  for (const path of EN_ALL_PAGES) {
    test(`${path}: renders in English, one H1, its own metadata and share image, no console errors`, async ({
      page,
      request,
    }) => {
      const errors = watchConsole(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("h1")).toHaveCount(1);
      const head = await page.evaluate(() => {
        const meta = (sel: string) => document.querySelector(sel)?.getAttribute("content") ?? null;
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
          ogImage: meta('meta[property="og:image"]'),
          ogAlt: meta('meta[property="og:image:alt"]'),
          ogLocale: meta('meta[property="og:locale"]'),
          twitter: meta('meta[name="twitter:card"]'),
          robots: meta('meta[name="robots"]'),
          hreflang: document.querySelectorAll("link[hreflang]").length,
        };
      });
      expect(head.title).toMatch(/Hera Editing$/);
      expect(head.description?.length ?? 0).toBeGreaterThan(100);
      expect(strip(head.canonical ?? "")).toBe(strip(new URL(path, BASE).href));
      expect(head.ogLocale).toBe("en_US");
      expect(head.ogAlt).toMatch(/^Hera Editing: \S/);
      expect(head.twitter).toBe("summary_large_image");
      expect(head.robots).toBe("noindex, nofollow");
      expect(head.hreflang).toBe(0);
      const image = await request.get(head.ogImage ?? "");
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toBe("image/png");
      await page.waitForTimeout(300);
      expect(errors).toEqual([]);
    });
  }

  test("titles and descriptions are unique across both sections", async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const all = [...EN_ALL_PAGES, ...PAGES];
    for (const path of all) {
      await page.goto(path);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(all.length);
    expect(descriptions.size).toBe(all.length);
  });

  test("no dead internal links", async ({ page, request }) => {
    const seen = new Set<string>();
    for (const path of EN_ALL_PAGES) {
      await page.goto(path);
      const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
      for (const href of hrefs) {
        const u = new URL(href);
        if (u.origin !== new URL(BASE).origin) continue;
        u.hash = "";
        seen.add(u.toString());
      }
    }
    for (const url of seen) expect((await request.get(url)).status(), url).toBeLessThan(400);
  });

  test("structured data: the organisation on /en, breadcrumbs from Home on internal pages, no ratings", async ({
    page,
  }) => {
    const ld = () =>
      page.$$eval('script[type="application/ld+json"]', (ss) =>
        ss.map((s) => JSON.parse(s.textContent ?? "{}") as Record<string, unknown>),
      );
    await page.goto("/en");
    const home = JSON.stringify(await ld());
    expect(home).toContain('"@type":"Organization"');
    for (const claim of ["aggregateRating", "Review", "FAQPage", "Offer"]) expect(home).not.toContain(claim);
    await page.goto("/en/pricing");
    const crumbs = (await ld()).find((d) => d["@type"] === "BreadcrumbList") as {
      itemListElement: { name: string; item: string }[];
    };
    expect(crumbs.itemListElement.map((i) => i.name)).toEqual(["Home", "Pricing"]);
    expect(strip(crumbs.itemListElement[0]!.item)).toBe(`${BASE}/en`);
  });

  test("an unknown /en address answers 404 in English, with a way back", async ({ page }) => {
    const res = await page.goto("/en/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    await expect(page.locator("main a[href='/en']").first()).toBeVisible();
    const robots = await page.$$eval('meta[name="robots"]', (ms) => ms.map((m) => m.getAttribute("content") ?? ""));
    for (const r of robots) expect(r).toMatch(/noindex/);
  });

  test("the sitemap lists the English pages and the published samples page", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => strip(new URL(m[1]!).pathname) || "/");
    for (const p of EN_ALL_PAGES) expect(locs).toContain(p);
  });
});

test.describe("navigation", () => {
  test("desktop: the header links the section, marks the current page, and its order button records the page", async ({
    page,
  }) => {
    await page.goto("/en/pricing");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const name of ["Weddings", "YouTube", "Real estate", "Pricing", "How it works"])
      await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");
    const order = page.locator("header").getByRole("link", { name: "Order an edit" }).first();
    await expect(order).toHaveAttribute("href", "/en/order?from=%2Fen%2Fpricing");
    // The header's own logo (the closed phone menu inside the header has another).
    await expect(page.locator("header.hdr > a.logo")).toHaveAttribute("href", "/en");
    await nav.getByRole("link", { name: "Weddings" }).click();
    await expect(page).toHaveURL(/\/en\/wedding-editing$/);
    await expect(page.locator("h1")).toHaveText("Wedding video editing for filmmakers");
  });

  test("the footer leads back to the Bulgarian site, and to the legal pages", async ({ page }) => {
    await page.goto("/en");
    const footer = page.locator("footer");
    const back = footer.getByRole("link", { name: "Hera Editing in Bulgaria (Български)" });
    await expect(back).toHaveAttribute("href", "/");
    await expect(back).toHaveAttribute("hreflang", "bg");
    for (const name of ["Terms of service", "Privacy notice", "Cookies", "Cookie settings"])
      await expect(footer.getByRole("link", { name, exact: true })).toBeVisible();
  });

  test("phone menu: a dialog with the section's links; its order button records the page; Escape returns focus @phone-only", async ({
    page,
  }) => {
    await page.goto("/en/how-it-works");
    const open = page.getByRole("button", { name: "Open the menu" });
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(async () => {
      if (!(await dialog.isVisible())) await open.click();
      await expect(dialog).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15_000 });
    for (const name of ["Weddings", "YouTube", "Real estate", "Pricing", "How it works"])
      await expect(dialog.getByRole("link", { name })).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Order an edit" })).toHaveAttribute(
      "href",
      "/en/order?from=%2Fen%2Fhow-it-works",
    );
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
    await open.click();
    await dialog.getByRole("link", { name: "Real estate" }).click();
    await expect(page).toHaveURL(/\/en\/real-estate-editing$/);
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  });

  test("breadcrumbs lead back to the English home", async ({ page }) => {
    await page.goto("/en/terms");
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(crumbs.getByRole("link")).toHaveText(["Home"]);
    await crumbs.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/en$/);
  });
});

async function send(page: Page) {
  await page.getByRole("button", { name: SEND }).click();
}

test.describe("the order form (sales kit §5)", () => {
  test("a niche page's package → the form with it chosen → errors → a stored order with its brief", async ({
    page,
  }) => {
    await page.goto("/en/wedding-editing");
    await page.locator('a[href^="/en/order?package=wedding-highlight"]').first().click();
    await expect(page).toHaveURL(/\/en\/order\?package=wedding-highlight&from=%2Fen%2Fwedding-editing/);
    await expect(page.locator("#of-package")).toHaveValue("wedding-highlight");
    await expect(page.locator("#of-couple")).toBeVisible();
    await expect(page.locator("#of-script")).toBeHidden();
    await expect(page.locator("#of-scope")).toBeHidden();

    await send(page);
    await expect(page.locator("#of-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#of-name")).toBeFocused();
    await expect(page.locator("#of-businessConfirmed")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText(SUCCESS)).toHaveCount(0);

    const email = testEmail("en-order");
    await fillOrder(page, {
      name: "Test Filmmaker",
      businessName: "Fictional Films LLC",
      email,
      country: "US",
      confirm: true,
      music: "I'll send the track and its licence",
      ai: "Not allowed",
      footageUrl: "drive.google.com/drive/folders/fictional",
      couple: "Ann and Bob (fictional)",
    });
    await send(page);
    await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
    await expect(
      page.getByText(
        "We'll reply in writing within 1 business day with the exact price and your start date. Payment by bank transfer, in advance.",
      ),
    ).toBeVisible();

    const [row] = await ordersByEmail(email);
    expect(row).toMatchObject({ locale: "en", source_path: "/en/wedding-editing" });
    expect(row!.details).toMatchObject({
      package: "wedding-highlight",
      country: "US",
      music: "client",
      aiVisuals: "not_allowed",
      wedding: { couple: "Ann and Bob (fictional)" },
    });
    expect(row!.details).not.toHaveProperty("youtube");
  });

  test("the questions follow the package: real estate, then a custom quote's description", async ({ page }) => {
    await page.goto("/en/order");
    await expect(page.locator("#of-listing")).toBeHidden();
    await page.locator("#of-package").selectOption("listing-video");
    await expect(page.locator("#of-listing")).toBeVisible();
    await expect(page.locator("#of-couple")).toBeHidden();
    await page.locator("#of-package").selectOption("custom");
    await expect(page.locator("#of-scope")).toBeVisible();
    await expect(page.locator("#of-listing")).toBeHidden();

    const email = testEmail("en-custom");
    await fillOrder(page, {
      name: "Test Producer",
      businessName: "Fictional Events Ltd",
      email,
      country: "GB",
      confirm: true,
      music: "No music",
      ai: "Allowed",
    });
    await send(page);
    await expect(page.locator("#of-scope")).toHaveAttribute("aria-invalid", "true");
    await page.locator("#of-scope").fill("A 3-minute recap from 4 hours of two-camera event footage.");
    await send(page);
    await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
    const [row] = await ordersByEmail(email);
    expect(row!.details).toMatchObject({ package: "custom", priceUsd: null, scope: expect.stringContaining("recap") });
  });

  test("businesses in other EU states are told plainly, and nothing is stored", async ({ page, request }) => {
    await page.goto("/en/order?package=youtube-story");
    const email = testEmail("en-eu");
    await fillOrder(page, {
      name: "Test Creator",
      businessName: "Fictional Kanal GmbH",
      email,
      country: "DE",
      confirm: true,
      music: "No music",
      ai: "Allowed",
    });
    await expect(page.locator(".of__eu")).toContainText("We can't take orders from businesses in the EU yet.");
    await send(page);
    await expect(page.locator("#of-country")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText(SUCCESS)).toHaveCount(0);
    expect(await ordersByEmail(email)).toHaveLength(0);

    // The server applies the same rule, whatever the browser does.
    const res = await request.post("/api/orders", {
      data: {
        package: "youtube-story",
        name: "Test Creator",
        businessName: "Fictional Kanal GmbH",
        email,
        country: "FR",
        businessConfirmed: true,
        music: "none",
        aiVisuals: "allowed",
        privacyNoticeAcknowledged: true,
        locale: "en",
      },
    });
    expect(res.status()).toBe(400);
    expect(await res.json()).toMatchObject({ fieldErrors: { country: "eu_unavailable" } });
    expect(await ordersByEmail(email)).toHaveLength(0);

    // Bulgaria is not refused.
    await page.locator("#of-country").selectOption("BG");
    await expect(page.locator(".of__eu")).toBeEmpty();
  });

  test("works without JavaScript: the server validates, then stores the order", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    await presetConsent(context, false);
    const page = await context.newPage();
    await page.goto("/en/order?package=listing-video");
    await send(page);
    await expect(page.locator(".lf__status")).toContainText("Your brief was not sent");
    const email = testEmail("en-nojs");
    await page.locator("#of-name").fill("No Script");
    await page.locator("#of-businessName").fill("Fictional Realty LLC");
    await page.locator("#of-email").fill(email);
    await page.locator("#of-country").selectOption("CA");
    await page.locator("#of-businessConfirmed").check();
    await page.locator('input[name="music"][value="library"]').check();
    await page.locator('input[name="aiVisuals"][value="allowed"]').check();
    await page.locator("#of-listing").fill("1 Fictional Avenue");
    await send(page);
    await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
    const [row] = await ordersByEmail(email);
    expect(row!.details).toMatchObject({ package: "listing-video", realEstate: { listing: "1 Fictional Avenue" } });
    await context.close();
  });

  test("orders can only be posted, never listed", async ({ request }) => {
    expect((await request.get("/api/orders")).status()).toBe(405);
  });
});

test.describe("consent in English", () => {
  test("the banner speaks English, refusing closes it, and /en/cookies keeps the same choice", async ({ browser }) => {
    const context = await browser.newContext();
    await stubGoogle(context);
    const page = await context.newPage();
    await page.goto("/en");
    const banner = page.getByRole("region", { name: "Cookies" });
    await expect(banner).toContainText("We use analytics cookies only with your consent.");
    await banner.getByRole("button", { name: "Only necessary" }).click();
    await expect(page.locator(".cb")).toHaveCount(0);
    await page.goto("/en/cookies");
    await expect(page.getByRole("heading", { name: "Necessary" })).toBeVisible();
    await expect(page.getByRole("switch", { name: "Analytics cookies" })).not.toBeChecked();
    // One site, one choice: the Bulgarian pages do not ask again.
    await page.goto("/");
    await expect(page.locator(".cb")).toHaveCount(0);
    await context.close();
  });
});

test.describe("motion (decision 7)", () => {
  test("the scroll drives a playhead along the steps; with reduced motion the track is simply complete", async ({
    browser,
  }) => {
    const moving = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await presetConsent(moving, false);
    const page = await moving.newPage();
    await page.goto("/en/how-it-works");
    await page.locator(".en-track").scrollIntoViewIfNeeded();
    await expect(page.locator(".en-steps.is-live")).toHaveCount(1);
    await expect(page.locator(".en-track__ph")).toBeVisible();
    await moving.close();

    const still = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    await presetConsent(still, false);
    const calm = await still.newPage();
    await calm.goto("/en/how-it-works");
    await calm.locator(".en-track").scrollIntoViewIfNeeded();
    await calm.waitForTimeout(500);
    await expect(calm.locator(".en-steps.is-live")).toHaveCount(0);
    await expect(calm.locator(".en-track__ph")).toBeHidden();
    await still.close();
  });
});

test.describe("samples (strategy §8)", () => {
  test("only published, rights-complete samples show, each labelled; the one without a music licence never", async ({
    page,
  }) => {
    await page.goto("/en/work");
    const cards = page.locator(".en-sample");
    await expect(cards).toHaveCount(2);
    await expect(cards.nth(0)).toContainText("Demo edit");
    await expect(cards.nth(1)).toContainText("Client work");
    await expect(page.getByText("Test sample without its music licence")).toHaveCount(0);
    const watch = cards.nth(0).getByRole("link", { name: /Watch on Vimeo/ });
    await expect(watch).toHaveAttribute("target", "_blank");
    await expect(watch).toHaveAttribute("rel", "noopener noreferrer");
    await page.goto("/en/wedding-editing");
    await expect(page.locator(".en-sample")).toHaveCount(1);
  });
});

test.describe("the Bulgarian site changes only by its footer link (decision L38)", () => {
  test("every Bulgarian page links to /en once, from the footer, in English", async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "bg");
      const links = page.locator('a[href="/en"], a[href^="/en/"]');
      await expect(links, path).toHaveCount(1);
      const link = page.locator("footer").getByRole("link", { name: EN_LINK_FROM_BG });
      await expect(link, path).toHaveAttribute("href", "/en");
      await expect(link, path).toHaveAttribute("hreflang", "en");
    }
  });

  test("their header and content are the same as on a build without the section", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    await presetConsent(context, false);
    const page = await context.newPage();
    const text = async (base: string, path: string) => {
      await page.goto(`${base}${path}`);
      // With reduced motion the homepage's script shows the finished edit (HomeMotion's setupStatic: the last stage,
      // the "published" chip, the full timecode). Read once it has, or the result depends on which build hydrated
      // first.
      const chip = page.locator("[data-chip]");
      if ((await chip.count()) > 0) await expect(chip).toHaveText(/Публикувано/);
      return page.evaluate(() => ({
        header: document.querySelector("header.hdr")?.textContent ?? "",
        main: document.querySelector("main")?.textContent?.replace(/\s+/g, " ") ?? "",
        footer: (document.querySelector("footer")?.textContent ?? "").replace(/\s+/g, " "),
      }));
    };
    // Request ids differ per render, and timecodes are stripped too in case a counter ever runs; the visible copy
    // may not differ.
    const stable = (s: string) => s.replace(/[0-9a-f]{8}-[0-9a-f-]{27}/g, "").replace(/\d{2}:\d{2}:\d{2}:\d{2}/g, "TC");
    for (const path of PAGES) {
      const on = await text(BASE, path);
      const off = await text(EN_OFF, path);
      expect(stable(on.header), path).toBe(stable(off.header));
      expect(stable(on.main), path).toBe(stable(off.main));
      expect(on.footer.replace(EN_LINK_FROM_BG, ""), path).toBe(off.footer);
    }
    await context.close();
  });
});

test.describe("gating: a build with the section off (EN_SECTION_ENABLED=false, production's default)", () => {
  test("no /en address exists: the site's own 404 answers", async ({ request, page }) => {
    for (const path of [...EN_PAGES, "/en/work", "/en/no-such-page"])
      expect((await request.get(`${EN_OFF}${path}`)).status(), path).toBe(404);
    await page.goto(`${EN_OFF}/en/pricing`);
    await expect(page.locator("html")).toHaveAttribute("lang", "bg");
  });

  test("the order API does not exist, and stores nothing", async ({ request }) => {
    const email = testEmail("en-off");
    const res = await request.post(`${EN_OFF}/api/orders`, {
      data: { package: "wedding-teaser", email, locale: "en" },
      headers: { origin: EN_OFF },
    });
    expect(res.status()).toBe(404);
    expect(await ordersByEmail(email)).toHaveLength(0);
  });

  test("the sitemap leaves /en out, and the Bulgarian footer does not link to it", async ({ request, page }) => {
    const xml = await (await request.get(`${EN_OFF}/sitemap.xml`)).text();
    expect(xml).not.toContain("/en");
    for (const path of PAGES) {
      await page.goto(`${EN_OFF}${path}`);
      await expect(page.locator('a[href="/en"], a[href^="/en/"]'), path).toHaveCount(0);
    }
  });
});
