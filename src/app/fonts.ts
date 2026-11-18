import { IBM_Plex_Mono, Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";

// Self-hosted at build time by next/font (DS:22); Sofia Sans has Bulgarian letterforms by default. Only the weights
// the stylesheets use. The mono face sets small labels, never a headline, so it is not preloaded: it would only
// compete with the headline fonts for bandwidth on a slow connection.
// Shared by the two root layouts (the site and the admin) and the global 404, which renders without a layout.
export const sans = Sofia_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});
export const display = Sofia_Sans_Extra_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["800"],
  variable: "--ff-display",
  display: "swap",
});
export const mono = IBM_Plex_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  variable: "--ff-mono",
  display: "swap",
  preload: false,
});

/** The CSS variables of all three faces, for an `<html>` className. */
export const fontVariables = `${sans.variable} ${display.variable} ${mono.variable}`;
