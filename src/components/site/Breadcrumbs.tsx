import type { Route } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { SHELL } from "@/content/site";
import { breadcrumbLd } from "@/lib/site/structured-data";

export type Crumb = { name: string; path: string };

/**
 * Breadcrumbs on every internal page, not on home (decision L16), with the matching BreadcrumbList for search.
 * `parent` adds a middle level (a case study sits under "Проекти").
 */
export function Breadcrumbs({ current, path, parent }: { current: string; path: string; parent?: Crumb }) {
  const trail: Crumb[] = [
    { name: SHELL.breadcrumbHome, path: "/" },
    ...(parent ? [parent] : []),
    { name: current, path },
  ];
  return (
    <nav className="crumbs" aria-label={SHELL.breadcrumbLabel}>
      <ol>
        {trail.slice(0, -1).map((c) => (
          <li key={c.path}>
            <Link href={c.path as Route}>{c.name}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
      <JsonLd data={breadcrumbLd(trail)} />
    </nav>
  );
}
