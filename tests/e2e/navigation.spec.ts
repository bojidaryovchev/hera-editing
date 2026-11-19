import { expect, test } from "@playwright/test";
import { presetConsent, stubGoogle } from "./helpers";

test.beforeEach(async ({ context }) => {
  await stubGoogle(context);
  await presetConsent(context, false);
});

test("the skip link comes first and moves focus to the content", async ({ page }) => {
  await page.goto("/paketi");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Към основното съдържание" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("desktop: the header links every main page, and its quote button records the page", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Основна навигация" });
  for (const name of ["Услуга", "Как работим", "Пакети", "Проекти", "За нас", "Контакти"])
    await expect(nav.getByRole("link", { name })).toBeVisible();
  // The header's own button comes first (the closed phone menu holds the other).
  const quote = page.locator("header").getByRole("link", { name: "Поискайте оферта" }).first();
  await expect(quote).toHaveAttribute("href", "/kontakti?from=%2F");
  await page.goto("/paketi");
  await expect(quote).toHaveAttribute("href", "/kontakti?from=%2Fpaketi");
  // The footer button records the page too, not the homepage (spec review gap 2.3).
  const footerQuote = page.locator("footer").getByRole("link", { name: "Поискайте оферта" });
  await expect(footerQuote).toHaveAttribute("href", "/kontakti?from=%2Fpaketi");
});

/** Opens the phone menu once the page is interactive (a click before hydration does nothing). */
async function openMenu(page: import("@playwright/test").Page) {
  const open = page.getByRole("button", { name: "Отворете менюто" });
  const dialog = page.getByRole("dialog", { name: "Меню" });
  await expect(async () => {
    if (!(await dialog.isVisible())) await open.click();
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 15_000 });
  return { open, dialog };
}

test("phone menu: opens as a dialog, traps focus, closes on Escape and returns focus (acceptance B) @phone-only", async ({
  page,
}) => {
  await page.goto("/");
  const { open, dialog } = await openMenu(page);
  // The page behind is inert: focus stays in the dialog (or passes to the browser's own controls, as a native modal allows).
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => document.activeElement === document.body || Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
});

test("phone menu: lists every page, its quote records the page, a link navigates and closes it @phone-only", async ({
  page,
}) => {
  await page.goto("/za-nas");
  const { dialog } = await openMenu(page);
  for (const name of ["Услуга", "Как работим", "Пакети", "Проекти", "За нас", "Контакти"])
    await expect(dialog.getByRole("link", { name })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Поискайте оферта" })).toHaveAttribute(
    "href",
    "/kontakti?from=%2Fza-nas",
  );
  await dialog.getByRole("link", { name: "Пакети" }).click();
  await expect(page).toHaveURL(/\/paketi$/);
  await expect(page.getByRole("dialog", { name: "Меню" })).toBeHidden();
});

/*
 * The homepage's motion (owner report 2026-11-18): GSAP arrives after the browser or the router has already scrolled
 * to a #link or restored a position, so the page must not change length when it does. With script-added pins it grew
 * by several screens and "Как работим" ended up in the middle of the hero.
 */
test.describe("homepage links and history with motion", () => {
  /** Motion is set up once HomeMotion has reset the final render's counter (the server renders it finished). */
  async function motionReady(page: import("@playwright/test").Page) {
    await expect(page.locator("[data-pct]")).toHaveText("0%", { timeout: 20_000 });
  }
  const processTop = (page: import("@playwright/test").Page) =>
    page.locator("#kak-rabotim").evaluate((el) => el.getBoundingClientRect().top);

  test("«Как работим» from another page lands on the process and stays there once motion is set up @phone", async ({
    page,
  }, testInfo) => {
    await page.goto("/paketi");
    if (testInfo.project.name === "phone") {
      const { dialog } = await openMenu(page);
      await dialog.getByRole("link", { name: "Как работим" }).click();
    } else {
      await page
        .getByRole("navigation", { name: "Основна навигация" })
        .getByRole("link", { name: "Как работим" })
        .click();
    }
    await expect(page).toHaveURL(/\/#kak-rabotim$/);
    await motionReady(page);
    await page.waitForTimeout(500);
    // Wide screens land where the section's hold starts (its top, give or take the scroll's rounding to a pixel);
    // narrow ones just below the fixed header.
    expect(await processTop(page)).toBeGreaterThan(-1);
    expect(await processTop(page)).toBeLessThan(120);
  });

  test("opening /#kak-rabotim lands on the process, and so does a refresh of it @phone", async ({ page }) => {
    const onProcess = async () => {
      await motionReady(page);
      await page.waitForTimeout(500);
      expect(await processTop(page)).toBeGreaterThan(-1);
      expect(await processTop(page)).toBeLessThan(120);
    };
    await page.goto("/#kak-rabotim");
    await onProcess();
    // A refresh restores the position the browser kept for the page (as on any site); the page must not move after.
    await page.reload();
    await onProcess();
  });

  test("from further down, «Как работим» lands at the start of the process, not at its end", async ({ page }) => {
    await page.goto("/");
    await motionReady(page);
    await page.locator("#paketi").evaluate((el) => el.scrollIntoView());
    await page
      .getByRole("navigation", { name: "Основна навигация" })
      .getByRole("link", { name: "Как работим" })
      .click();
    await expect(page.locator(".pclip").first()).toHaveClass(/\bon\b/);
    await expect(page.locator(".pclip").last()).not.toHaveClass(/\bon\b/);
    expect(Math.abs(await processTop(page))).toBeLessThan(1);
  });

  test("Back returns to where the visitor left the homepage @phone", async ({ page }) => {
    await page.goto("/");
    await motionReady(page);
    await page.locator("#paketi").evaluate((el) => el.scrollIntoView());
    await page.waitForTimeout(300);
    const left = await page.evaluate(() => window.scrollY);
    await page.locator("#paketi .pk__head").getByRole("link").click();
    await expect(page).toHaveURL(/\/paketi$/);
    await page.goBack();
    await motionReady(page);
    await page.waitForTimeout(500);
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - left)).toBeLessThanOrEqual(2);
  });

  test("opening answers in the FAQ keeps the final render in step with the scroll @phone", async ({ page }) => {
    await page.goto("/");
    await motionReady(page);
    // The final section's top at 45% of the screen: half way between the render's start (75%) and end (15%).
    const renderHalfWay = async () => {
      await page.evaluate(() => {
        const top = document.querySelector("#oferta")!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - window.innerHeight * 0.45);
      });
      await page.waitForTimeout(500);
      return parseInt((await page.locator("[data-pct]").textContent()) ?? "", 10);
    };
    expect(Math.abs((await renderHalfWay()) - 50)).toBeLessThanOrEqual(10);
    for (const question of await page.locator(".faq summary").all()) await question.click();
    await page.waitForTimeout(400);
    expect(Math.abs((await renderHalfWay()) - 50)).toBeLessThanOrEqual(10);
  });
});

test("breadcrumbs lead back up, and the case study back to the portfolio", async ({ page }) => {
  await page.goto("/rabota/testova-pekarna");
  const crumbs = page.getByRole("navigation", { name: "Навигационна пътека" });
  await expect(crumbs.getByRole("link")).toHaveText(["Начало", "Проекти"]);
  // The separators are drawn, not read: no "/" before an item (QA record, qa/record-2026-11-19).
  await expect(crumbs.getByRole("listitem").last()).toMatchAriaSnapshot(`- listitem: /^Тестова пекарна/`);
  await expect(crumbs.getByRole("listitem").nth(1)).toMatchAriaSnapshot(`
    - listitem:
      - /children: equal
      - link "Проекти"
  `);
  await crumbs.getByRole("link", { name: "Проекти" }).click();
  await expect(page).toHaveURL(/\/rabota$/);
});
