import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { ALL_PAGES, presetConsent, stubGoogle } from "./helpers";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function violations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

test.describe("axe: WCAG 2.2 A and AA (acceptance D, G)", () => {
  for (const path of ALL_PAGES) {
    test(`${path} @phone`, async ({ page, context }) => {
      await stubGoogle(context);
      await presetConsent(context, false);
      await page.goto(path);
      await page.waitForTimeout(400);
      expect(await violations(page)).toEqual([]);
    });
  }

  test("home with the cookie banner open @phone", async ({ page, context }) => {
    await stubGoogle(context);
    await page.goto("/");
    await expect(page.locator(".cb")).toBeVisible();
    expect(await violations(page)).toEqual([]);
  });

  test("the quote form showing its errors @phone", async ({ page, context }) => {
    await stubGoogle(context);
    await presetConsent(context, false);
    await page.goto("/kontakti");
    await page.getByRole("button", { name: "Изпратете запитването" }).click();
    await expect(page.locator("#lf-name")).toHaveAttribute("aria-invalid", "true");
    expect(await violations(page)).toEqual([]);
  });

  test("home with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    await stubGoogle(context);
    await presetConsent(context, false);
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3200/");
    expect(await violations(page)).toEqual([]);
    await context.close();
  });
});
