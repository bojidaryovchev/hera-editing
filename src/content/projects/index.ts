import { resolveAppEnv } from "@/lib/config/env";
import { FIXTURE_PROJECTS } from "./fixtures";
import type { Project } from "./types";

/**
 * Real case studies. Empty until the owner supplies approved, rights-cleared work:
 * no fake case studies may ever be added here (README exclusions, IA:21).
 * Add an entry with status "approved", every rights flag true and the client's approval recorded to publish it.
 */
export const PROJECTS: readonly Project[] = [];

/** Approved, every rights flag set, and the client's approval recorded (who and when): IA:21, acceptance F. */
export function isPublishable(p: Project): boolean {
  const r = p.rights;
  return (
    p.status === "approved" &&
    r.clientPermission &&
    r.footageCleared &&
    r.musicCleared &&
    Boolean(r.approvedBy?.trim()) &&
    Boolean(r.approvedAt?.trim())
  );
}

/**
 * The projects the site shows: publishable ones only, in the order listed. The clearly fictional fixtures appear
 * only in tests with CONTENT_FIXTURES=1 (refused by the configuration anywhere else), and an entry marked as a
 * fixture is never published from the real list. Nothing published: no /rabota, no menu link, no sitemap entry.
 */
export function publishedProjects(
  src: Record<string, string | undefined> = process.env,
  real: readonly Project[] = PROJECTS,
): readonly Project[] {
  const fixtures = resolveAppEnv(src) === "test" && src.CONTENT_FIXTURES?.trim() === "1";
  return [...real.filter((p) => !p.fixture), ...(fixtures ? FIXTURE_PROJECTS : [])].filter(isPublishable);
}

export function publishedProject(slug: string, src: Record<string, string | undefined> = process.env): Project | null {
  return publishedProjects(src).find((p) => p.slug === slug) ?? null;
}
