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

test("the homepage shows approved work between the process and the formats (IA:30, decision L41) @phone", async ({
  page,
}) => {
  await page.goto("/");
  const work = page.locator("section.hwork");
  await expect(work.getByRole("heading", { level: 2, name: "Проекти" })).toBeVisible();
  // Each card: the clip or still, the business category, the project, the client's permission, a link to the case.
  const card = work.locator(".wcard");
  await expect(card).toHaveCount(1);
  await expect(card.getByRole("heading", { level: 3, name: "Тестова пекарна (фиктивни данни)" })).toBeVisible();
  await expect(card.getByText("Тестови данни – фиктивен проект")).toBeVisible();
  await expect(card.locator(".wcard__cat")).toHaveText("Вид бизнес Пекарна");
  await expect(card.getByText("Публикувано с разрешение на клиента")).toBeVisible();
  await expect(card.getByRole("link", { name: /Вижте проекта/ })).toHaveAttribute("href", "/rabota/testova-pekarna");
  await expect(work.getByRole("link", { name: "Всички проекти" })).toHaveAttribute("href", "/rabota");
  await expect(work.getByText("Тестова чернова")).toHaveCount(0);
  // The spec's order (IA:26-37): the process, then the work, then the formats.
  const order = await page.locator("main h2[id]").evaluateAll((hs) => hs.map((h) => h.id));
  expect(order.indexOf("work-h")).toBe(order.indexOf("proc-h") + 1);
  expect(order.indexOf("bin-h")).toBe(order.indexOf("work-h") + 1);
});

test("a case study: its story, the client's permission and a quote that remembers the page", async ({ page }) => {
  await page.goto("/rabota");
  await page
    .getByRole("link", { name: /Вижте проекта/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/rabota\/testova-pekarna$/);
  await expect(page.getByRole("heading", { level: 1, name: "Тестова пекарна (фиктивни данни)" })).toBeVisible();
  await expect(page.getByText("Публикувано с разрешение на клиента")).toBeVisible();
  await expect(page.getByText("Тестови данни. Не е реален клиент.")).toBeVisible();
  // No results without a reporting window, a baseline and a method (IA:59): the fixture has none.
  await expect(page.getByRole("heading", { name: "Резултати" })).toHaveCount(0);
  await expect(page.locator("main").getByRole("link", { name: "Поискайте оферта" }).first()).toHaveAttribute(
    "href",
    "/kontakti?from=%2Frabota%2Ftestova-pekarna",
  );
});
