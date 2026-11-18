import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { signWebhook } from "../../src/lib/mailbox/webhook";
import { E2E_ADMIN } from "./admin-env";
import { e2eState, fillLead, fillOrder, presetConsent, query, stubGoogle, testEmail, watchConsole } from "./helpers";
import { MAIL_DOWN } from "./ports";

/*
 * The admin panel and the contact@ mailbox (decision L32), on the production build: sign-in, the enquiries with
 * their statuses, answering by email, the inbound webhook's refusals, text-only bodies, accessibility and a phone.
 */

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function violations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  return results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

async function signIn(page: Page) {
  await page.goto("/admin/vhod");
  await page.getByLabel("Парола").fill(E2E_ADMIN.password);
  await page.getByRole("button", { name: "Влезте" }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

/** A thread with one inbound message, written straight into the database (what the webhook would record). */
async function seedThread(opts: { html: string | null; text: string | null; subject?: string }) {
  const id = Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
  const subject = opts.subject ?? `Въпрос ${id}`;
  await query(
    `insert into mail_threads (id, subject, subject_key, correspondent, correspondent_name) values ($1, $2, lower($2), 'maria@example.bg', 'Мария')`,
    [id, subject],
  );
  await query(
    `insert into mail_messages (id, thread_id, created_at, direction, from_address, to_addresses, subject, body_text, body_html, message_id)
     values ($1, $2, now(), 'in', 'maria@example.bg', $3, $4, $5, $6, $7)`,
    [`em_${id}`, id, E2E_ADMIN.mailbox, subject, opts.text, opts.html, `<${id}@mail.example>`],
  );
  return { id, subject };
}

test.beforeEach(async () => {
  // Every sign-in counts towards the login limit, and all tests come from one address.
  await query(`delete from rate_limit_buckets where key like 'admin-login%'`);
});

test.describe("admin panel", () => {
  test("is off without a password: every admin address answers 404", async ({ request }) => {
    expect((await request.get(`${MAIL_DOWN}/admin/vhod`)).status()).toBe(404);
    expect((await request.get(`${MAIL_DOWN}/admin`)).status()).toBe(404);
  });

  test("sends a visitor without a session to the sign-in page, and is never indexed", async ({ page }) => {
    const res = await page.goto("/admin/zapitvaniya");
    await expect(page).toHaveURL(/\/admin\/vhod$/);
    expect(res?.headers()["x-robots-tag"]).toContain("noindex");
    const robots = await page.$$eval('meta[name="robots"]', (ms) => ms.map((m) => m.getAttribute("content") ?? ""));
    expect(robots.some((r) => r.includes("noindex"))).toBe(true);
    // None of the public site's chrome.
    await expect(page.locator(".cb, .hdr, footer")).toHaveCount(0);
  });

  test("refuses a wrong password, signs in with the right one, and signs out", async ({ page }) => {
    const errors = watchConsole(page);
    await page.goto("/admin/vhod");
    await page.getByLabel("Парола").fill("not the password");
    await page.getByRole("button", { name: "Влезте" }).click();
    await expect(page.getByText("Грешна парола.")).toBeVisible();
    await page.getByLabel("Парола").fill(E2E_ADMIN.password);
    await page.getByRole("button", { name: "Влезте" }).click();
    await expect(page.getByRole("heading", { name: "Табло" })).toBeVisible();
    await page.getByRole("button", { name: "Изход" }).click();
    await expect(page).toHaveURL(/\/admin\/vhod$/);
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/vhod$/);
    expect(errors).toEqual([]);
  });

  test("an enquiry from the site appears, takes a status, and gets an answer from contact@", async ({
    page,
    context,
  }) => {
    await stubGoogle(context);
    await presetConsent(context, false);
    const email = testEmail("admin");
    const business = `Пекарна ${Date.now()}`;
    await page.goto("/kontakti");
    await fillLead(page, { name: "Мария Тестова", businessName: business, city: "Пловдив", email, goal: "Друго" });
    await page.getByRole("button", { name: "Изпратете запитването" }).click();
    await expect(page.getByRole("heading", { name: "Благодарим Ви!" })).toBeVisible();

    await signIn(page);
    const nav = page.getByRole("navigation", { name: "Раздели" });
    await nav.getByRole("link", { name: /^Запитвания/ }).click();
    await page.getByRole("link", { name: new RegExp(business) }).click();
    await expect(page.getByRole("heading", { name: "Мария Тестова" })).toBeVisible();

    await page.getByLabel("Статус").selectOption("proposal");
    await page.getByRole("button", { name: "Запазете" }).click();
    await expect(page.getByText("Статусът е запазен.")).toBeVisible();
    const [row] = await query<{ status: string }>(`select status from leads where email = $1`, [email]);
    expect(row?.status).toBe("proposal");

    await page.getByLabel(`Отговор до ${email}`).fill("Здравейте, Мария!\n\nБлагодарим за запитването.");
    await page.getByRole("button", { name: "Изпратете отговора" }).click();
    await expect(page.getByText("Отговорът е изпратен.")).toBeVisible();
    await expect(page.locator(".adm-msg[data-direction='out']")).toContainText("Благодарим за запитването.");

    const outbox = e2eState().outbox;
    const sent = readdirSync(outbox)
      .map(
        (f) => JSON.parse(readFileSync(path.join(outbox, f), "utf8")) as { to: string; from: string; subject: string },
      )
      .filter((m) => m.to === email);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      from: `"Hera Editing" <${E2E_ADMIN.mailbox}>`,
      subject: "Вашето запитване към Hera Editing",
    });

    await nav.getByRole("link", { name: /^Поща/ }).click();
    await expect(page.getByRole("link", { name: /Мария Тестова/ }).first()).toBeVisible();
  });

  test("an English order lands in the same enquiries, badged EN, with its brief, and is answered in English", async ({
    page,
    context,
  }) => {
    await stubGoogle(context);
    await presetConsent(context, false);
    const email = testEmail("admin-en");
    const business = `Fictional Films ${Date.now()}`;
    await page.goto("/en/order?package=wedding-teaser");
    await fillOrder(page, {
      name: "Jane Tester",
      businessName: business,
      email,
      country: "US",
      confirm: true,
      music: "I'll send the track and its licence",
      ai: "Not allowed",
      couple: "Ann and Bob (fictional)",
    });
    await page.getByRole("button", { name: "Send my brief" }).click();
    await expect(page.getByRole("heading", { name: "Thank you. Your brief is in." })).toBeVisible();

    await signIn(page);
    await page.goto("/admin/zapitvaniya");
    const item = page.getByRole("link", { name: new RegExp(business) });
    await expect(item.locator(".adm-badge")).toHaveText("EN");
    await expect(item).toContainText(`${business} · Teaser · US`);
    await item.click();
    await expect(page.getByRole("heading", { name: /Jane Tester/ })).toBeVisible();
    const brief = page.getByRole("region", { name: "Поръчка и бриф" });
    await expect(brief).toContainText("Teaser · $160");
    await expect(brief).toContainText("Съединени щати (US)");
    await expect(brief).toContainText("Ann and Bob (fictional)");
    await expect(brief).not.toContainText("Град");

    await page.getByLabel(`Отговор до ${email}`).fill("Hello Jane,\n\nThe price is $160 and we can start on Monday.");
    await page.getByRole("button", { name: "Изпратете отговора" }).click();
    await expect(page.getByText("Отговорът е изпратен.")).toBeVisible();
    const outbox = e2eState().outbox;
    const sent = readdirSync(outbox)
      .map((f) => JSON.parse(readFileSync(path.join(outbox, f), "utf8")) as { to: string; subject: string })
      .filter((m) => m.to === email);
    expect(sent).toEqual([expect.objectContaining({ subject: "Your brief for Hera Editing" })]);
  });

  test("shows a message's text, never the sender's HTML, and closes and reopens a conversation", async ({ page }) => {
    const { id } = await seedThread({
      text: null,
      html: '<p>Здравейте, искам оферта.</p><img src=x onerror="window.__xss=1"><script>window.__xss=2</script>',
    });
    await signIn(page);
    await page.goto(`/admin/poshta/${id}`);
    const body = page.locator(".adm-msg__body").first();
    await expect(body).toHaveText("Здравейте, искам оферта.");
    await expect(page.locator(".adm-msg img, .adm-msg script")).toHaveCount(0);
    expect(await page.evaluate(() => (window as unknown as { __xss?: number }).__xss)).toBeUndefined();

    await page.getByRole("button", { name: "Приключете разговора" }).click();
    await expect(page.getByRole("button", { name: "Отворете отново" })).toBeVisible();
    const [thread] = await query<{ status: string }>(`select status from mail_threads where id = $1`, [id]);
    expect(thread?.status).toBe("done");
    await page.getByRole("button", { name: "Отворете отново" }).click();
    await expect(page.getByRole("button", { name: "Приключете разговора" })).toBeVisible();
  });

  test("passes axe (WCAG 2.2 A and AA) on its screens", async ({ page }) => {
    await page.goto("/admin/vhod");
    expect(await violations(page)).toEqual([]);
    const { id } = await seedThread({ text: "Здравейте, кога можете да снимате?", html: null });
    await signIn(page);
    for (const p of ["/admin", "/admin/zapitvaniya", "/admin/poshta", `/admin/poshta/${id}`]) {
      await page.goto(p);
      expect(await violations(page), p).toEqual([]);
    }
  });

  test("fits a phone screen: no sideways scroll on any screen @phone", async ({ page }) => {
    const { id } = await seedThread({
      text: `Дълъг адрес и тема без интервали: ${"x".repeat(120)}`,
      html: null,
      subject: `Тема-${"дълга".repeat(20)}`,
    });
    await signIn(page);
    for (const p of ["/admin", "/admin/zapitvaniya", "/admin/poshta", `/admin/poshta/${id}`]) {
      await page.goto(p);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, p).toBeLessThanOrEqual(0);
    }
  });
});

test.describe("the contact@ webhook", () => {
  const send = (request: import("@playwright/test").APIRequestContext, body: string, headers: Record<string, string>) =>
    request.post("/api/inbound", { data: body, headers: { "content-type": "application/json", ...headers } });
  const signed = (body: string) => {
    const t = Math.floor(Date.now() / 1000);
    return {
      "svix-id": "msg_e2e",
      "svix-timestamp": String(t),
      "svix-signature": signWebhook(E2E_ADMIN.webhookSecret, "msg_e2e", t, body),
    };
  };

  test("refuses an unsigned or forged request, and ignores what is not ours, storing nothing", async ({ request }) => {
    const before = await query<{ n: string }>(`select count(*) as n from mail_messages`);
    const body = JSON.stringify({
      type: "email.received",
      data: { email_id: "em_x", from: "a@example.bg", to: ["info@other.example"], cc: [], bcc: [], received_for: [] },
    });
    expect((await send(request, body, {})).status()).toBe(400);
    const forged = { ...signed(body), "svix-signature": "v1,Zm9yZ2Vk" };
    expect((await send(request, body, forged)).status()).toBe(401);
    expect((await send(request, body, signed(body))).status()).toBe(200);
    const sentEvent = JSON.stringify({ type: "email.sent", data: { email_id: "em_y" } });
    expect((await send(request, sentEvent, signed(sentEvent))).status()).toBe(200);
    const after = await query<{ n: string }>(`select count(*) as n from mail_messages`);
    expect(after[0]?.n).toBe(before[0]?.n);
  });
});
