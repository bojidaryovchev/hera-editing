import { mkdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { ALL_PAGES, presetConsent, stubGoogle } from "./helpers";

/** Acceptance D's widths (plus a landscape tablet). SCREENSHOTS=1 also saves full-page screenshots to qa/screenshots/full. */
const SIZES = [
  [360, 740],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
] as const;
const SHOTS = process.env.SCREENSHOTS === "1" ? path.resolve(import.meta.dirname, "../../qa/screenshots/full") : null;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

test.describe("no horizontal overflow at any width or scroll position (acceptance D, decision 8b)", () => {
  for (const [w, h] of SIZES) {
    test(`${w}×${h}`, async ({ browser }) => {
      test.setTimeout(180_000);
      const context = await browser.newContext({ viewport: { width: w, height: h } });
      await stubGoogle(context);
      await presetConsent(context, false);
      const page = await context.newPage();
      const failures: string[] = [];
      for (const p of ALL_PAGES) {
        await page.goto(p);
        const total = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y <= total; y += Math.round(h * 0.8)) {
          await page.evaluate((top) => window.scrollTo(0, top), y);
          await page.waitForTimeout(60);
          const over = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          if (over > 0) {
            failures.push(`${p} at y=${y}: ${over}px`);
            break;
          }
        }
      }
      expect(failures).toEqual([]);
      await context.close();
    });
  }
});

test.describe("hero on wide and tall screens (owner report 2026-11-17)", () => {
  for (const [w, h] of [
    [1920, 1080],
    [2545, 1280],
    [2560, 1440],
    [3840, 2160],
  ] as const) {
    test(`${w}×${h}: the title card is full width inside a 16:9 monitor`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: w, height: h } });
      await stubGoogle(context);
      await presetConsent(context, false);
      const page = await context.newPage();
      await page.goto("/");
      const m = await page.evaluate(() => {
        const r = (q: string) => document.querySelector(q)!.getBoundingClientRect();
        const mon = r(".mon");
        const card = r(".card");
        const hdr = r(".hdr");
        return {
          ratio: mon.width / mon.height,
          cardW: card.width,
          inside: card.left >= mon.left && card.right <= mon.right,
          belowHeader: card.top >= hdr.bottom,
        };
      });
      expect(m.ratio).toBeGreaterThan(1.72);
      expect(m.ratio).toBeLessThan(1.84);
      expect(m.cardW).toBeGreaterThan(600);
      expect(m.inside).toBe(true);
      expect(m.belowHeader).toBe(true);
      await context.close();
    });
  }
});

if (SHOTS) {
  test.describe("screenshots for the QA record", () => {
    for (const [w, h] of SIZES) {
      test(`${w}px`, async ({ browser }) => {
        test.setTimeout(240_000);
        // Reduced motion: the finished edit, so a full-page capture shows every section as laid out.
        const context = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
        await stubGoogle(context);
        await presetConsent(context, false);
        const page = await context.newPage();
        for (const p of ALL_PAGES) {
          await page.goto(p);
          await page.waitForTimeout(400);
          const name = p === "/" ? "home" : p.slice(1).replace(/\//g, "-");
          await page.screenshot({ path: path.join(SHOTS, `${name}-${w}.png`), fullPage: true });
        }
        await context.close();
      });
    }
  });
}
