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

test("breadcrumbs lead back up, and the case study back to the portfolio", async ({ page }) => {
  await page.goto("/rabota/testova-pekarna");
  const crumbs = page.getByRole("navigation", { name: "Навигационна пътека" });
  await expect(crumbs.getByRole("link")).toHaveText(["Начало", "Проекти"]);
  await crumbs.getByRole("link", { name: "Проекти" }).click();
  await expect(page).toHaveURL(/\/rabota$/);
});
