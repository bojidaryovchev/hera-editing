import Link from "next/link";
import { SHELL } from "@/content/site";

/** Breadcrumbs on every internal page, not on home (decision L16). */
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="crumbs" aria-label={SHELL.breadcrumbLabel}>
      <ol>
        <li>
          <Link href="/">{SHELL.breadcrumbHome}</Link>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
