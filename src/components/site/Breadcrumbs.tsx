import type { Route } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { SHELL } from "@/content/site";
import { breadcrumbLd } from "@/lib/site/structured-data";

export type Crumb = { name: string; path: string };

/** Where a trail starts and how it is announced: the Bulgarian site's by default, the English section's at /en. */
export type CrumbRoot = { home: Crumb; label: string };

/**
 * Breadcrumbs on every internal page, not on home (decision L16), with the matching BreadcrumbList for search.
 * `parent` adds a middle level (a case study sits under "Проекти").
 */
export function Breadcrumbs({
  current,
  path,
  parent,
  root,
}: {
  current: string;
  path: string;
  parent?: Crumb;
  root?: CrumbRoot;
}) {
  const trail: Crumb[] = [
    root?.home ?? { name: SHELL.breadcrumbHome, path: "/" },
    ...(parent ? [parent] : []),
    { name: current, path },
  ];
  return (
    <nav className="crumbs" aria-label={root?.label ?? SHELL.breadcrumbLabel}>
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
