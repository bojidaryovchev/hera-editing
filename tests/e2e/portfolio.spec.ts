import { expect, test } from "@playwright/test";
import { presetConsent, stubGoogle } from "./helpers";

test.beforeEach(async ({ context }) => {
  await stubGoogle(context);
  await presetConsent(context, false);
});

test("the portfolio lists approved work only, clearly labelled as test data (TS:Suggested 6)", async ({ page }) => {
  await page.goto("/rabota");
  await expect(page.getByRole("heading", { level: 1, name: "Проекти" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Тестова пекарна (фиктивни данни)" })).toBeVisible();
  await expect(page.getByText("Тестови данни – фиктивен проект").first()).toBeVisible();
  await expect(page.getByText("Тестова чернова")).toHaveCount(0);
  await expect(page.locator("footer").getByRole("link", { name: "Проекти" })).toBeVisible();
});

test("a case study: its story, the client's permission and a quote that remembers the page", async ({ page }) => {
  await page.goto("/rabota");
  await page.getByRole("link", { name: /Вижте проекта/ }).first().click();
  await expect(page).toHaveURL(/\/rabota\/testova-pekarna$/);
  await expect(page.getByRole("heading", { level: 1, name: "Тестова пекарна (фиктивни данни)" })).toBeVisible();
  await expect(page.getByText("Публикувано с разрешение на клиента")).toBeVisible();
  await expect(page.getByText("Тестови данни. Не е реален клиент.")).toBeVisible();
  // No results without a reporting window, a baseline and a method (IA:59): the fixture has none.
  await expect(page.getByRole("heading", { name: "Резултати" })).toHaveCount(0);
  await expect(page.locator("main").getByRole("link", { name: "Поискайте оферта" }).first()).toHaveAttribute("href", "/kontakti?from=%2Frabota%2Ftestova-pekarna");
});
