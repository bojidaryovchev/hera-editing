import type { Route } from "next";
import { NAV, type NavItem } from "@/content/site";

/** Internal paths are typed routes; content keeps them as plain strings. */
export const route = (path: string) => path as Route;

/**
 * Navigation items that may be shown now: "Проекти" only once real, approved work is published (IA:20). The caller
 * (a server component) says whether any is, so this module stays free of server configuration for the browser.
 */
export function visibleNav(hasPublishedProjects: boolean): readonly NavItem[] {
  return NAV.filter((item) => !item.requiresPublishedProjects || hasPublishedProjects);
}

/** Where the quote buttons go, with the page they were pressed on (IA:24, L10). */
export function quoteHref(from: string): Route {
  return route(`/kontakti?from=${encodeURIComponent(from)}`);
}
