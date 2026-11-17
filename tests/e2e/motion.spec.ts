import { expect, test } from "@playwright/test";
import { presetConsent, stubGoogle } from "./helpers";

test("reduced motion: the finished edit, nothing moving or playing (acceptance D)", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  await stubGoogle(context);
  await presetConsent(context, false);
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3200/");
  await expect(page.locator("html")).not.toHaveClass(/\bmotion\b/);
  await expect(page.locator("[data-chip]")).toHaveText("Публикувано");
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(800);
  expect(await page.$$eval("video", (vs) => vs.filter((v) => !(v as HTMLVideoElement).paused).length)).toBe(0);
  await context.close();
});

test("videos never play with sound, and every clip can be started and paused from the keyboard", async ({
  page,
  context,
}) => {
  await stubGoogle(context);
  await presetConsent(context, false);
  // Decoding is not under test (test browsers may lack the codec): play() and pause() only record their state.
  await page.addInitScript(() => {
    const state = new WeakMap<HTMLMediaElement, boolean>();
    Object.defineProperty(HTMLMediaElement.prototype, "paused", {
      configurable: true,
      get() {
        return !state.get(this);
      },
    });
    HTMLMediaElement.prototype.play = function () {
      state.set(this, true);
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {
      state.set(this, false);
    };
  });
  await page.goto("/");
  expect(
    await page.$$eval("video", (vs) =>
      vs.every((v) => (v as HTMLVideoElement).muted && !(v as HTMLVideoElement).autoplay),
    ),
  ).toBe(true);

  const first = page.locator("[data-bin]").first();
  const button = first.locator("[data-vbtn]");
  await button.scrollIntoViewIfNeeded();
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("data-playing", "true");
  await expect(button).toHaveAttribute("aria-label", /^Спрете видеото/);
  expect(await first.locator("video").evaluate((v) => (v as HTMLVideoElement).paused)).toBe(false);
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("data-playing", "false");
  await expect(button).toHaveAttribute("aria-label", /^Пуснете видеото/);
  expect(await first.locator("video").evaluate((v) => (v as HTMLVideoElement).paused)).toBe(true);
});
