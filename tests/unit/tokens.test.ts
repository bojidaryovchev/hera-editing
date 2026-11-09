import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/** WCAG 2.2 contrast for every text/ground pair the design uses (DS:22 "tested contrast"). */
const css = readFileSync(join(__dirname, "../../src/app/globals.css"), "utf8");
const token = (name: string): string => {
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m?.[1]) throw new Error(`token --color-${name} not found`);
  return m[1];
};
const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p) as [number, number];
  return (x + 0.05) / (y + 0.05);
};

// [text, ground, minimum, where]
const PAIRS: Array<[string, string, number, string]> = [
  [token("tx"), token("ed"), 4.5, "body text on the editor ground"],
  [token("tx-2"), token("ed"), 4.5, "secondary text on the editor ground"],
  [token("tx-3"), token("ed"), 4.5, "labels and timecodes on the editor ground"],
  [token("tx-3"), token("ed-2"), 4.5, "labels on panels"],
  [token("tx-2"), token("ed-2"), 4.5, "inspector notes"],
  [token("lime"), token("ed"), 4.5, "lime text on the editor ground (eyebrow, headline accent)"],
  [token("ink"), token("lime"), 4.5, "button text on lime"],
  [token("ink"), token("paper"), 4.5, "body text on paper"],
  [token("ink-2"), token("paper"), 4.5, "secondary text on paper"],
  [token("ink-3"), token("paper"), 4.5, "notes on paper"],
  [token("ink"), "#ffffff", 4.5, "package cards"],
  [token("ink-2"), "#ffffff", 4.5, "package card details"],
  [token("ink"), token("warn"), 4.5, "staging badge"],
  [token("warn"), "#08090a", 4.5, "launch gates in the footer"],
  [token("warn"), "#3a2f14", 4.5, "pending chip"],
  [token("lime"), "#1f3a1c", 4.5, "approved chip"],
  [token("rec"), token("ed"), 3, "record dot and cut marks (graphics, 3:1)"],
];

describe("design tokens meet WCAG contrast", () => {
  it.each(PAIRS)("%s on %s ≥ %s (%s)", (fg, bg, min) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(min);
  });

  it("keeps the brand red identical to the logo's record light", () => {
    expect(token("rec").toLowerCase()).toBe("#ff5a47");
  });
});
