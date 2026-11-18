import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { closeDb, e2eState, fillLead, presetConsent, query, stubGoogle, testEmail } from "./helpers";
import { DB_DOWN, MAIL_DOWN } from "./ports";

const SUBMIT = "Изпратете запитването";
const SUCCESS = "Благодарим Ви!";

type LeadRow = {
  id: string;
  name: string;
  business_name: string;
  city: string;
  email: string | null;
  phone: string | null;
  volume: string | null;
  source_path: string | null;
  notification_status: string;
  notification_attempts: number;
};
const leadsByEmail = (email: string) => query<LeadRow>("select * from leads where email = $1", [email]);
const leadsByBusiness = (name: string) => query<LeadRow>("select * from leads where business_name = $1", [name]);

/** Outbox files (the dev mail provider) that mention a lead id. */
function outboxFor(id: string): string[] {
  const dir = e2eState().outbox;
  return readdirSync(dir).filter((f) => readFileSync(path.join(dir, f), "utf8").includes(id));
}

async function waitForStatus(email: string, status: string) {
  await expect.poll(async () => (await leadsByEmail(email))[0]?.notification_status, { timeout: 15_000 }).toBe(status);
}

async function submit(page: Page) {
  await page.getByRole("button", { name: SUBMIT }).click();
}

test.beforeEach(async ({ context }) => {
  await stubGoogle(context);
  await presetConsent(context, false);
});
test.afterAll(async () => closeDb());

test("home → package → form with the tier preselected → errors → stored lead and owner alert (TS:Suggested 1)", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('a[href*="/kontakti?from=%2F&volume=8"]').first().click();
  await expect(page).toHaveURL(/\/kontakti\?from=%2F&volume=8/);
  await expect(page.getByRole("radio", { name: "8 на месец" })).toBeChecked();

  // Nothing filled: inline errors on the required fields, focus on the first, input kept.
  await submit(page);
  await expect(page.locator("#lf-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#lf-name")).toBeFocused();
  await expect(page.getByText(SUCCESS)).toHaveCount(0);

  const email = testEmail("home");
  await fillLead(page, {
    name: "Тест Тестов",
    businessName: "Тестова фирма",
    city: "Пловдив",
    email,
    goal: "Повече запитвания",
  });
  await submit(page);
  await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();

  const [lead] = await leadsByEmail(email);
  expect(lead).toMatchObject({
    name: "Тест Тестов",
    business_name: "Тестова фирма",
    city: "Пловдив",
    volume: "8",
    source_path: "/",
  });
  await waitForStatus(email, "sent");
  expect(outboxFor(lead!.id)).toHaveLength(1);
});

test("phone only and email only are both enough; neither is refused (TS:Suggested 4)", async ({ page }) => {
  const business = `Фирма с телефон ${Date.now()}`;
  await page.goto("/kontakti");
  await fillLead(page, {
    name: "Само телефон",
    businessName: business,
    city: "Варна",
    phone: "+359 88 123 4567",
    goal: "Не знам",
  });
  await submit(page);
  await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
  const [byPhone] = await leadsByBusiness(business);
  expect(byPhone?.phone).toBeTruthy();
  expect(byPhone?.email).toBeNull();

  const email = testEmail("only");
  await page.goto("/kontakti");
  await fillLead(page, { name: "Само имейл", businessName: "Фирма И", city: "Бургас", email, goal: "Друго" });
  await submit(page);
  await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
  expect(await leadsByEmail(email)).toHaveLength(1);

  await page.goto("/kontakti");
  await fillLead(page, { name: "Без контакт", businessName: "Фирма Б", city: "Русе", goal: "Друго" });
  await submit(page);
  await expect(page.locator("#lf-email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#lf-phone")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(SUCCESS)).toHaveCount(0);
});

test("email or phone: «neither» shows only once both are left empty, or on sending", async ({ page }) => {
  await page.goto("/kontakti");
  const name = page.locator("#lf-name");
  // The form validates in the browser once it runs: leaving the empty name flags it.
  await expect(async () => {
    await name.focus();
    await page.locator("#lf-businessName").focus();
    await expect(name).toHaveAttribute("aria-invalid", "true", { timeout: 500 });
  }).toPass();
  const email = page.locator("#lf-email");
  const phone = page.locator("#lf-phone");
  const message = page.locator("#lf-contact-msg");
  // Leaving the email empty for the phone: nothing is marked yet, and the hint stays.
  await email.focus();
  await page.keyboard.press("Tab");
  await expect(phone).toBeFocused();
  await expect(phone).not.toHaveAttribute("aria-invalid", "true");
  await expect(email).not.toHaveAttribute("aria-invalid", "true");
  await expect(message).toHaveText("Достатъчно е едно от двете.");
  // Leaving the phone empty too: now the pair is missing.
  await page.keyboard.press("Tab");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(phone).toHaveAttribute("aria-invalid", "true");
  await expect(message).toContainText("Посочете имейл или телефон");
});

test("an unsafe or malformed profile address is refused", async ({ page }) => {
  await page.goto("/kontakti");
  await fillLead(page, {
    name: "Тест",
    businessName: "Фирма",
    city: "София",
    email: testEmail("url"),
    profileUrl: "javascript:alert(1)",
    goal: "Друго",
  });
  await submit(page);
  await expect(page.locator("#lf-profileUrl")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(SUCCESS)).toHaveCount(0);
});

test("the same request sent twice is stored once and alerted once (TS:Suggested 3)", async ({ request }) => {
  const email = testEmail("dupe");
  const body = {
    name: "Двоен",
    businessName: "Фирма Д",
    city: "Плевен",
    email,
    phone: null,
    profileUrl: null,
    goal: "consistency",
    volume: null,
    message: null,
    privacyNoticeAcknowledged: true,
    sourcePath: "/paketi",
    utm: { source: null, medium: null, campaign: null },
    requestId: crypto.randomUUID(),
    locale: "bg",
  };
  const first = await request.post("/api/leads", { data: body });
  const second = await request.post("/api/leads", { data: body });
  expect(first.status()).toBe(201);
  expect(second.status()).toBe(201);
  expect((await first.json()).id).toBe((await second.json()).id);
  expect(await leadsByEmail(email)).toHaveLength(1);
  await waitForStatus(email, "sent");
  expect(outboxFor((await leadsByEmail(email))[0]!.id)).toHaveLength(1);
});

test("mail provider down: the lead is still stored and the alert is delivered by the retry (TS:Suggested 2)", async ({
  page,
}) => {
  const email = testEmail("maildown");
  await page.goto(`${MAIL_DOWN}/upravlenie-na-sotsialni-mrezhi`);
  await page.locator('main a[href^="/kontakti?from="]').first().click();
  await fillLead(page, {
    name: "Пощата не работи",
    businessName: "Фирма П",
    city: "Шумен",
    email,
    goal: "Повече запитвания",
  });
  await submit(page);
  await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();

  await expect
    .poll(async () => (await leadsByEmail(email))[0]?.notification_attempts ?? 0, { timeout: 20_000 })
    .toBeGreaterThan(0);
  const [lead] = await leadsByEmail(email);
  expect(lead!.source_path).toBe("/upravlenie-na-sotsialni-mrezhi");
  expect(lead!.notification_status).not.toBe("sent");

  // The operator's retry (cron or CLI) with a working provider delivers it, once.
  execFileSync("pnpm", ["exec", "tsx", "scripts/leads-retry.ts", "--include-failed"], {
    cwd: path.resolve(import.meta.dirname, "../.."),
    env: {
      ...process.env,
      APP_ENV: "test",
      DATABASE_URL: e2eState().databaseUrl,
      MAIL_PROVIDER: "dev",
      MAIL_DEV_OUTBOX_DIR: e2eState().outbox,
      NOTIFICATION_EMAIL_TO: "owner@example.com",
    },
    stdio: "pipe",
    shell: process.platform === "win32",
  });
  await waitForStatus(email, "sent");
  expect(outboxFor(lead!.id)).toHaveLength(1);
});

test("database down: an error with the contact alternative, never a false success (acceptance C)", async ({ page }) => {
  await page.goto(`${DB_DOWN}/kontakti`);
  await fillLead(page, {
    name: "Базата не работи",
    businessName: "Фирма Б",
    city: "Стара Загора",
    email: testEmail("dbdown"),
    goal: "Друго",
  });
  await submit(page);
  await expect(page.getByText(/Не успяхме да изпратим запитването/)).toBeVisible();
  await expect(page.getByRole("heading", { name: SUCCESS })).toHaveCount(0);
  // Everything typed is kept for another try.
  await expect(page.locator("#lf-name")).toHaveValue("Базата не работи");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the form still posts, validates on the server and confirms", async ({ page }) => {
    const email = testEmail("nojs");
    await page.goto("/kontakti");
    await page.getByRole("button", { name: SUBMIT }).click();
    await expect(page.locator("#lf-name")).toHaveAttribute("aria-invalid", "true");
    await page.locator("#lf-name").fill("Без скрипт");
    await page.locator("#lf-businessName").fill("Фирма Н");
    await page.locator("#lf-city").fill("Габрово");
    await page.locator("#lf-email").fill(email);
    await page
      .getByRole("radiogroup", { name: "Какво искате да постигнете?" })
      .getByRole("radio", { name: "Друго", exact: true })
      .check();
    await page.getByRole("button", { name: SUBMIT }).click();
    await expect(page.getByRole("heading", { name: SUCCESS })).toBeVisible();
    expect(await leadsByEmail(email)).toHaveLength(1);
  });
});
