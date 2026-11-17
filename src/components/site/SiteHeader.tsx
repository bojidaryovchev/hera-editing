import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { MenuDialog } from "@/components/site/MenuDialog";
import { QuoteLink } from "@/components/site/QuoteLink";
import { publishedProjects } from "@/content/projects";
import { QUOTE_CTA, SHELL } from "@/content/site";
import { brandName } from "@/lib/site/brand";
import { route, visibleNav } from "@/lib/site/nav";

/** The site header: an editor menu bar. Below 1024 px the links move into the menu dialog (L7). */
export function SiteHeader() {
  const brand = brandName();
  const items = visibleNav(publishedProjects().length > 0).map((i) => ({ label: i.label, href: i.href }));
  return (
    <header className="hdr wrap">
      <Link className="logo" href="/" aria-label={`${brand}, ${SHELL.homeLinkSuffix}`}>
        <Wordmark title={brand} />
      </Link>
      {/* Its own class: the menu dialog below also holds a nav, which header rules must never reach. */}
      <nav className="hdr__nav" aria-label={SHELL.mainNavLabel}>
        {items.map((i) => (
          <Link key={i.href} href={route(i.href)}>
            {i.label}
          </Link>
        ))}
      </nav>
      <div className="hdr__end">
        <span className="hdr__tc" aria-hidden="true">
          <b>●</b> <span data-tc>00:00:00:00</span>
        </span>
        <QuoteLink className="btn btn--pri btn--sm">{QUOTE_CTA}</QuoteLink>
        <MenuDialog
          brand={brand}
          items={items}
          quoteLabel={QUOTE_CTA}
          labels={{ open: SHELL.menuOpen, close: SHELL.menuClose, title: SHELL.menuTitle, nav: SHELL.mainNavLabel, home: SHELL.homeLinkSuffix }}
        />
      </div>
    </header>
  );
}
