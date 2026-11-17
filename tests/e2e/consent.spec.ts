import { expect, test } from "@playwright/test";
import { ALL_PAGES, fillLead, stubGoogle, testEmail } from "./helpers";

const REJECT = "Само необходимите";
const ACCEPT = "Приемете всички";

test("refusing analytics: browsing every page and sending a lead makes no tracking request (TS:Suggested 7, acceptance F)", async ({
  page,
  context,
}) => {
  const hits = await stubGoogle(context);
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Бисквитки" }).or(page.locator(".cb"));
  await expect(banner.first()).toBeVisible();
  await page.getByRole("button", { name: REJECT }).click();
  await expect(page.locator(".cb")).toHaveCount(0);

  for (const path of ALL_PAGES) {
    await page.goto(path);
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(200);
  }
  await page.goto("/kontakti");
  await fillLead(page, {
    name: "Без проследяване",
    businessName: "Фирма Р",
    city: "Ловеч",
    email: testEmail("reject"),
    goal: "Друго",
  });
  await page.getByRole("button", { name: "Изпратете запитването" }).click();
  await expect(page.getByRole("heading", { name: "Благодарим Ви!" })).toBeVisible();

  expect(hits).toEqual([]);
  expect(await page.evaluate(() => typeof window.gtag)).toBe("undefined");
  const cookies = (await context.cookies()).map((c) => c.name);
  expect(cookies.filter((n) => n.startsWith("_ga"))).toEqual([]);
});

test("accepting loads analytics; withdrawing on /biskvitki stops it and removes its cookies", async ({
  page,
  context,
}) => {
  const hits = await stubGoogle(context);
  await page.goto("/");
  await page.getByRole("button", { name: ACCEPT }).click();
  await expect.poll(() => hits.some((u) => u.includes("gtag/js?id=G-TEST1234"))).toBe(true);

  await context.addCookies([{ name: "_ga", value: "GA1.1.123.456", url: "http://127.0.0.1:3200" }]);
  await page.goto("/biskvitki");
  await page.getByRole("button", { name: REJECT }).first().click();
  await expect.poll(async () => (await context.cookies()).some((c) => c.name === "_ga")).toBe(false);
  expect(await page.evaluate(() => (window as unknown as Record<string, unknown>)["ga-disable-G-TEST1234"])).toBe(true);
});

test("with consent, events carry pages, tiers and codes only, never what was typed (TS:Analytics)", async ({
  page,
  context,
}) => {
  await stubGoogle(context);
  await page.goto("/");
  await page.getByRole("button", { name: ACCEPT }).click();
  const events = () =>
    page.evaluate(() =>
      ((window.dataLayer ?? []) as IArguments[])
        .map((a) => Array.from(a))
        .filter((a) => a[0] === "event")
        .map((a) => ({ name: a[1] as string, params: (a[2] ?? {}) as Record<string, string> })),
    );

  await page.locator('a[href*="/kontakti?from=%2F&volume=8"]').first().click();
  await expect(page).toHaveURL(/\/kontakti/);
  await expect.poll(async () => (await events()).map((e) => e.name)).toContain("lead_form_view");
  let ev = await events();
  expect(ev.find((e) => e.name === "cta_quote_click")?.params).toEqual({ source_page: "/" });
  expect(ev.find((e) => e.name === "package_interest")?.params).toEqual({ tier: "rastezh", source_page: "/" });

  await page.getByRole("button", { name: "Изпратете запитването" }).click();
  await expect
    .poll(async () => (await events()).find((e) => e.name === "lead_form_error")?.params)
    .toEqual({ code: "invalid_client" });

  const email = testEmail("events");
  await fillLead(page, { name: "Събитие Тестово", businessName: "Фирма Е", city: "Добрич", email, goal: "Друго" });
  await page.getByRole("button", { name: "Изпратете запитването" }).click();
  await expect(page.getByRole("heading", { name: "Благодарим Ви!" })).toBeVisible();
  ev = await events();
  const names = ev.map((e) => e.name);
  expect(names.indexOf("lead_form_success")).toBeGreaterThan(names.indexOf("lead_form_attempt"));
  expect(JSON.stringify(ev)).not.toMatch(/Събитие|Фирма|Добрич|example\.com/);
});

test("the form works whatever the visitor chose", async ({ page, context }) => {
  await stubGoogle(context);
  await page.goto("/kontakti");
  // No choice made at all: the banner is open, the form still sends.
  await fillLead(page, {
    name: "Без избор",
    businessName: "Фирма Ж",
    city: "Видин",
    email: testEmail("nochoice"),
    goal: "Друго",
  });
  await page.getByRole("button", { name: "Изпратете запитването" }).click();
  await expect(page.getByRole("heading", { name: "Благодарим Ви!" })).toBeVisible();
});
