import type { Route } from "next";
import { PROJECTS } from "@/content/projects";
import { NAV, type NavItem } from "@/content/site";

/** Internal paths are typed routes; content keeps them as plain strings. */
export const route = (path: string) => path as Route;

/** Navigation items that may be shown now: "Проекти" only once real, approved work is published (IA:20). */
export function visibleNav(): readonly NavItem[] {
  return NAV.filter((item) => !item.requiresPublishedProjects || PROJECTS.length > 0);
}

/** Where the quote buttons go, with the page they were pressed on (IA:24, L10). */
export function quoteHref(from: string): Route {
  return route(`/kontakti?from=${encodeURIComponent(from)}`);
}
