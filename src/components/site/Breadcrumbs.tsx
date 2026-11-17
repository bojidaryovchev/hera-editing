import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { SHELL } from "@/content/site";
import { breadcrumbLd } from "@/lib/site/structured-data";

/** Breadcrumbs on every internal page, not on home (decision L16), with the matching BreadcrumbList for search. */
export function Breadcrumbs({ current, path }: { current: string; path: string }) {
  return (
    <nav className="crumbs" aria-label={SHELL.breadcrumbLabel}>
      <ol>
        <li>
          <Link href="/">{SHELL.breadcrumbHome}</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
      <JsonLd
        data={breadcrumbLd([
          { name: SHELL.breadcrumbHome, path: "/" },
          { name: current, path },
        ])}
      />
    </nav>
  );
}
