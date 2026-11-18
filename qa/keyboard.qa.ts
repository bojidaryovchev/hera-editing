/**
 * The keyboard pass of the manual QA record (spec/website/02 "Accessibility", website/04 H, spec review §1.5).
 * Run it with `pnpm qa:keyboard` after `pnpm test:e2e` has built the e2e site.
 *
 * It does what a keyboard user does, on every page, at a desktop and a phone width:
 * - presses Tab from the top of the page to its end, and Shift+Tab from the end back to the top;
 * - for each stop, records the role and name a screen reader announces, the focus style, and anything covering the
 *   element;
 * - saves a close-up of the first control of each kind, and of every stop that looks wrong, for a person to judge;
 * - sends the quote form and the English order form with the keyboard only;
 * - opens and closes the phone menu with the keyboard, and walks the homepage with the cookie banner showing.
 *
 * It finds and records, and judging the close-ups is the reviewer's part. Everything goes to qa/record-<date>/:
 * keyboard.json (every stop), summary.md (the counts and the stops to look at), focus/ (close-ups) and aria/ (each
 * page's accessibility tree, as assistive technology receives it).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { ALL_PAGES, EN_ALL_PAGES, presetConsent, stubGoogle } from "../tests/e2e/helpers";

/** The date in Sofia, as the project's documents use it (sv-SE formats it as YYYY-MM-DD). */
const DATE = process.env.QA_DATE ?? new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Sofia" });
const OUT = path.resolve(import.meta.dirname, `record-${DATE}`);
const CLOSEUPS = path.join(OUT, "focus");
const ARIA = path.join(OUT, "aria");

const PAGES = [...ALL_PAGES, ...EN_ALL_PAGES, "/nyama-takava-stranitsa"] as const;
const SIZES = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
} as const;
type Size = keyof typeof SIZES;

type Stop = { n: number; name: string; kind: string; ring: string; covered: string | null; offscreen: boolean };
type Walk = { page: string; size: Size; direction: "forward" | "back"; stops: Stop[] };
type Scenario = { name: string; ok: boolean; notes: string[] };

const walks: Walk[] = [];
const scenarios: Scenario[] = [];
/** One close-up per kind of control, and one per kind of suspicious stop, so one systematic issue cannot flood. */
const kindsShot = new Set<string>();
const flagsShot = new Set<string>();

const slug = (p: string) => (p === "/" ? "home" : p.slice(1).replace(/[^\w-]+/g, "-"));

/** The focused element as a keyboard user meets it. Runs in the page, so it uses nothing from this file. */
function inspect() {
  const el = document.activeElement as HTMLElement | null;
  if (!el || el === document.body || el === document.documentElement) return null;
  if (!el.dataset.qaStop) el.dataset.qaStop = String(document.querySelectorAll("[data-qa-stop]").length + 1);
  const css = getComputedStyle(el);
  const rings: string[] = [];
  if (css.outlineStyle !== "none" && parseFloat(css.outlineWidth) > 0)
    rings.push(`outline ${css.outlineWidth} ${css.outlineStyle} ${css.outlineColor}`);
  if (css.boxShadow !== "none") rings.push(`box-shadow ${css.boxShadow}`);
  for (const pseudo of ["::before", "::after"]) {
    const p = getComputedStyle(el, pseudo);
    if (p.content === "none" || p.content === "normal") continue;
    if ((p.outlineStyle !== "none" && parseFloat(p.outlineWidth) > 0) || p.boxShadow !== "none")
      rings.push(`${pseudo} ring`);
  }
  const r = el.getBoundingClientRect();
  const offscreen =
    r.width === 0 || r.height === 0 || r.bottom <= 0 || r.top >= innerHeight || r.right <= 0 || r.left >= innerWidth;
  let covered: string | null = null;
  if (!offscreen) {
    const x = Math.min(Math.max(r.left + r.width / 2, 0), innerWidth - 1);
    const y = Math.min(Math.max(r.top + r.height / 2, 0), innerHeight - 1);
    const hit = document.elementFromPoint(x, y) as HTMLElement | null;
    if (hit && hit !== el && !el.contains(hit) && !hit.contains(el)) {
      const cls = typeof hit.className === "string" ? hit.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
      covered = hit.tagName.toLowerCase() + (cls ? `.${cls}` : "");
    }
  }
  const cls = typeof el.className === "string" ? (el.className.trim().split(/\s+/)[0] ?? "") : "";
  const type = el instanceof HTMLInputElement ? `[${el.type}]` : "";
  return {
    id: el.dataset.qaStop,
    kind: `${el.tagName.toLowerCase()}${type}${cls ? `.${cls}` : ""}`,
    ring: rings.join("; ") || "none",
    covered,
    offscreen,
    box: { x: r.x, y: r.y, width: r.width, height: r.height },
  };
}

/** What a screen reader announces for the focused element: the first line of its ARIA snapshot. */
async function focusedName(page: Page) {
  const aria = await page
    .locator(":focus")
    .ariaSnapshot({ timeout: 2_000 })
    .catch(() => "");
  return (aria.split("\n")[0] ?? "").replace(/^- /, "").replace(/:$/, "");
}

async function closeup(page: Page, file: string, box: { x: number; y: number; width: number; height: number }) {
  const vp = page.viewportSize()!;
  const pad = 48;
  const x = Math.max(0, box.x - pad);
  const y = Math.max(0, box.y - pad);
  const width = Math.min(vp.width - x, box.width + 2 * pad);
  const height = Math.min(vp.height - y, box.height + 2 * pad);
  if (width <= 0 || height <= 0) return;
  await page.screenshot({ path: path.join(CLOSEUPS, file), type: "jpeg", quality: 72, clip: { x, y, width, height } });
}

/** Tab (or Shift+Tab) until focus leaves the page or comes back to a stop already seen. */
async function walk(page: Page, where: string, size: Size, direction: "forward" | "back", shots: boolean) {
  const stops: Stop[] = [];
  const seen = new Set<string>();
  let last: string | null = null;
  for (let i = 0; i < 400; i++) {
    await page.keyboard.press(direction === "forward" ? "Tab" : "Shift+Tab");
    await page.waitForTimeout(40);
    const s = await page.evaluate(inspect);
    if (!s) {
      if (stops.length > 0) break;
      continue;
    }
    // A date field takes several presses (month, day, year, its calendar button) on one element: one control.
    if (s.id === last) continue;
    if (seen.has(s.id)) break;
    seen.add(s.id);
    last = s.id;
    const stop: Stop = {
      n: stops.length + 1,
      name: await focusedName(page),
      kind: s.kind,
      ring: s.ring,
      covered: s.covered,
      offscreen: s.offscreen,
    };
    stops.push(stop);
    const reason = s.offscreen ? "offscreen" : s.covered ? `under-${s.covered}` : s.ring === "none" ? "no-ring" : null;
    const file = `${size}-${slug(where)}-${direction}-${String(stop.n).padStart(3, "0")}-${s.kind.replace(/[^\w.-]+/g, "_")}.jpg`;
    if (reason && !flagsShot.has(`${size}:${s.kind}:${reason}`)) {
      flagsShot.add(`${size}:${s.kind}:${reason}`);
      if (!s.offscreen) await closeup(page, `flag-${reason.replace(/[^\w.-]+/g, "_")}-${file}`, s.box);
    } else if (shots && !kindsShot.has(`${size}:${s.kind}`)) {
      kindsShot.add(`${size}:${s.kind}`);
      await closeup(page, file, s.box);
    }
  }
  walks.push({ page: where, size, direction, stops });
  return stops;
}

async function freshContext(browser: Browser, size: Size, consent = true) {
  const context = await browser.newContext({ viewport: SIZES[size], locale: "bg-BG" });
  await stubGoogle(context);
  if (consent) await presetConsent(context, false);
  return context;
}

async function open(context: BrowserContext, where: string) {
  const page = await context.newPage();
  await page.goto(where);
  await page.waitForTimeout(700);
  return page;
}

/** Fills a form with the keyboard only: types, Space on radios and checkboxes, typeahead in selects, Enter to send. */
async function fillByKeyboard(page: Page, firstField: string, values: Record<string, string>) {
  const notes: string[] = [];
  for (let i = 0; i < 120; i++) {
    await page.keyboard.press("Tab");
    if (await page.evaluate((id) => document.activeElement?.id === id, firstField)) break;
  }
  for (let i = 0; i < 80; i++) {
    const f = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return null;
      const input = el as HTMLInputElement;
      return {
        id: el.id,
        tag: el.tagName.toLowerCase(),
        type: el instanceof HTMLInputElement ? input.type : "",
        checked: el instanceof HTMLInputElement ? input.checked : false,
        submit: el instanceof HTMLButtonElement && el.type === "submit",
      };
    });
    if (!f) break;
    if (f.submit) {
      notes.push("Enter on the send button");
      await page.keyboard.press("Enter");
      return notes;
    }
    const value = values[f.id];
    if (value !== undefined) {
      await page.keyboard.type(value);
      notes.push(`${f.tag === "select" ? "chose by typing in" : "typed into"} #${f.id}`);
    } else if ((f.type === "radio" || f.type === "checkbox") && !f.checked) {
      await page.keyboard.press("Space");
      notes.push(`Space on ${f.type} #${f.id || "(no id)"}`);
    } else notes.push(`left ${f.tag}${f.type ? `[${f.type}]` : ""}${f.id ? ` #${f.id}` : ""} as it was`);
    await page.keyboard.press("Tab");
  }
  throw new Error(`The send button was never reached:\n${notes.join("\n")}`);
}

async function describeFocus(page: Page) {
  const tag = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}` : "nothing";
  });
  return `${tag} (${await focusedName(page)})`;
}

test.describe.configure({ mode: "serial" });

test.beforeAll(() => {
  mkdirSync(CLOSEUPS, { recursive: true });
  mkdirSync(ARIA, { recursive: true });
});

for (const size of Object.keys(SIZES) as Size[]) {
  test(`Tab and Shift+Tab through every page at ${size} width`, async ({ browser }) => {
    for (const where of PAGES) {
      const context = await freshContext(browser, size);
      const page = await open(context, where);
      if (size === "desktop")
        writeFileSync(path.join(ARIA, `${slug(where)}.yml`), await page.locator("body").ariaSnapshot());
      const forward = await walk(page, where, size, "forward", true);
      expect(forward.length, where).toBeGreaterThan(0);
      // Back from the end of the page: a fresh load, so the walk starts after the last element.
      await page.reload();
      await page.waitForTimeout(700);
      await walk(page, where, size, "back", false);
      await context.close();
    }
  });
}

test("the skip link moves focus to the content", async ({ browser }) => {
  const notes: string[] = [];
  let ok = true;
  for (const where of ["/", "/kontakti", "/en", "/en/order"]) {
    const context = await freshContext(browser, "desktop");
    const page = await open(context, where);
    await page.keyboard.press("Tab");
    const first = await focusedName(page);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const inMain = await page.evaluate(() => Boolean(document.activeElement?.closest("main")));
    // The next Tab must land inside the content, not back in the header.
    await page.keyboard.press("Tab");
    const next = await page.evaluate(() => Boolean(document.activeElement?.closest("main")));
    notes.push(`${where}: first stop ${first}; after Enter focus in main: ${inMain}; next Tab in main: ${next}`);
    ok &&= inMain || next;
    await context.close();
  }
  scenarios.push({ name: "Skip link", ok, notes });
});

test("the phone menu opens, keeps focus inside, and closes with Escape", async ({ browser }) => {
  const notes: string[] = [];
  let ok = true;
  for (const where of ["/", "/en"]) {
    const context = await freshContext(browser, "phone");
    const page = await open(context, where);
    let found = false;
    for (let i = 0; i < 30 && !found; i++) {
      await page.keyboard.press("Tab");
      found = await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup") === "dialog");
    }
    if (!found) {
      notes.push(`${where}: no menu button reached`);
      ok = false;
      await context.close();
      continue;
    }
    const button = await focusedName(page);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(400);
    const stops = await walk(page, `${where} (menu open)`, "phone", "forward", true);
    // A native modal dialog lets focus pass from its last control to the browser's own toolbar (the document, in a
    // headless browser), never to the page behind, which is inert. One more Tab must come back into the dialog.
    const passed = await page.evaluate(
      () => document.activeElement === document.body || Boolean(document.activeElement?.closest("dialog")),
    );
    await page.keyboard.press("Tab");
    const returned = await page.evaluate(() => Boolean(document.activeElement?.closest("dialog")));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const back = await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup") === "dialog");
    notes.push(
      `${where}: ${button}, then Enter, opens the menu with ${stops.length} stops inside. After the last one, focus passes to the browser's controls, never to the page behind: ${passed}; the next Tab comes back into the menu: ${returned}; Escape closes it and returns focus to the button: ${back}`,
    );
    ok &&= passed && returned && back;
    await context.close();
  }
  scenarios.push({ name: "Phone menu", ok, notes });
});

test("the cookie banner can be reached and answered with the keyboard", async ({ browser }) => {
  const notes: string[] = [];
  let ok = true;
  for (const where of ["/", "/en"]) {
    const context = await freshContext(browser, "desktop", false);
    const page = await open(context, where);
    await expect(page.locator(".cb")).toBeVisible();
    const stops = await walk(page, `${where} (cookie banner)`, "desktop", "forward", true);
    const inBanner = await page.evaluate(() => {
      const banner = document.querySelector(".cb");
      return Array.from(banner?.querySelectorAll<HTMLElement>("[data-qa-stop]") ?? []).map((e) =>
        Number(e.dataset.qaStop),
      );
    });
    notes.push(`${where}: ${stops.length} stops; the banner's controls are stops ${inBanner.join(", ") || "none"}`);
    // Answer it: Tab to its first button and press Enter; the banner must close and focus must stay on the page.
    await page.reload();
    await page.waitForTimeout(700);
    let reached = false;
    for (let i = 0; i < 200 && !reached; i++) {
      await page.keyboard.press("Tab");
      reached = await page.evaluate(
        () => document.activeElement instanceof HTMLButtonElement && Boolean(document.activeElement.closest(".cb")),
      );
    }
    if (reached) {
      const label = await focusedName(page);
      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);
      const closed = !(await page.locator(".cb").isVisible());
      const after = await describeFocus(page);
      // The focused button is gone with the banner: the next Tab should carry on from where the banner was.
      await page.keyboard.press("Tab");
      notes.push(
        `${where}: Enter on ${label}: the banner closed: ${closed}; focus then on ${after}; the next Tab goes to ${await describeFocus(page)}`,
      );
      ok &&= closed && inBanner.length > 0;
    } else {
      notes.push(`${where}: no banner button reached with Tab`);
      ok = false;
    }
    await context.close();
  }
  scenarios.push({ name: "Cookie banner", ok, notes });
});

test("the quote form, sent with the keyboard only", async ({ browser }) => {
  const context = await freshContext(browser, "desktop");
  const page = await open(context, "/kontakti");
  const notes = await fillByKeyboard(page, "lf-name", {
    "lf-name": "Клавиатура Тестова",
    "lf-businessName": "Тестова фирма (фиктивна)",
    "lf-city": "София",
    "lf-email": `keyboard-${Date.now()}@example.com`,
    "lf-message": "Проверка, попълнена само с клавиатура.",
  });
  const success = page.getByRole("heading", { name: "Благодарим Ви!" });
  const ok = await success
    .waitFor({ timeout: 15_000 })
    .then(() => true)
    .catch(() => false);
  notes.push(`success shown: ${ok}; focus then on ${await describeFocus(page)}`);
  scenarios.push({ name: "Quote form by keyboard", ok, notes });
  await context.close();
});

test("the English order form, sent with the keyboard only", async ({ browser }) => {
  const context = await freshContext(browser, "desktop");
  const page = await open(context, "/en/order?package=wedding-highlight");
  const notes = await fillByKeyboard(page, "of-name", {
    "of-name": "Keyboard Tester",
    "of-businessName": "Fictional Films LLC",
    "of-email": `keyboard-${Date.now()}@example.com`,
    "of-country": "United States",
    "of-footageUrl": "drive.google.com/drive/folders/fictional",
    "of-couple": "Ann and Bob (fictional)",
  });
  const success = page.getByRole("heading", { name: "Thank you. Your brief is in." });
  const ok = await success
    .waitFor({ timeout: 15_000 })
    .then(() => true)
    .catch(() => false);
  notes.push(`success shown: ${ok}; focus then on ${await describeFocus(page)}`);
  scenarios.push({ name: "Order form by keyboard", ok, notes });
  await context.close();
});

test.afterAll(() => {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(path.join(OUT, "keyboard.json"), JSON.stringify({ date: DATE, walks, scenarios }, null, 2));
  const lines = [
    `# Keyboard pass, ${DATE}: summary`,
    "",
    "Generated by `pnpm qa:keyboard` (qa/keyboard.qa.ts). Chromium (Playwright), desktop 1440×900 and phone 390×844.",
    "",
    "## Scenarios",
    "",
    ...scenarios.flatMap((s) => [`- **${s.name}:** ${s.ok ? "ok" : "**check**"}`, ...s.notes.map((n) => `  - ${n}`)]),
    "",
    "## Tab stops per page",
    "",
    "| Page | Size | Forward | Back | First stop | Stops to look at |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  for (const w of walks.filter((x) => x.direction === "forward")) {
    const back = walks.find((x) => x.page === w.page && x.size === w.size && x.direction === "back");
    const flagged = [...w.stops, ...(back?.stops ?? [])]
      .filter((s) => s.ring === "none" || s.covered || s.offscreen)
      .map((s) => `${s.name} (${s.ring === "none" ? "no ring" : s.covered ? `under ${s.covered}` : "off screen"})`);
    lines.push(
      `| ${w.page} | ${w.size} | ${w.stops.length} | ${back?.stops.length ?? "–"} | ${w.stops[0]?.name ?? "–"} | ${[...new Set(flagged)].join("; ") || "none"} |`,
    );
  }
  writeFileSync(path.join(OUT, "summary.md"), `${lines.join("\n")}\n`);
});
