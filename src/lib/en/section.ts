import { notFound } from "next/navigation";
import { enSectionEnabled } from "@/lib/config/env";

/**
 * For every /en page: while the section is off it does not exist (404). next.config.ts already rewrites /en to a
 * missing path in that case; this guard keeps a page from ever rendering if that rewrite were removed.
 */
export function requireEnSection(src: Record<string, string | undefined> = process.env): void {
  if (!enSectionEnabled(src)) notFound();
}
