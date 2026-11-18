import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { EnNav } from "@/components/en/EnNav";
import { MenuDialog } from "@/components/site/MenuDialog";
import { QuoteLink } from "@/components/site/QuoteLink";
import { EN_HOME_PATH, EN_NAV, EN_SHELL, ORDER_CTA } from "@/content/en/site";
import { brandName } from "@/lib/site/brand";

/**
 * The English section's header (decision L38): the wordmark home to /en, its own navigation, the order action that
 * records the page it was pressed on, and below 1024 px the same menu dialog as the Bulgarian site (L7).
 */
export function EnHeader() {
  const brand = brandName();
  const items = EN_NAV.map((i) => ({ label: i.label, href: i.href }));
  return (
    <header className="hdr wrap">
      <Link className="logo" href={EN_HOME_PATH} aria-label={`${brand}, ${EN_SHELL.homeLinkSuffix}`}>
        <Wordmark title={brand} />
      </Link>
      <EnNav items={items} label={EN_SHELL.mainNavLabel} />
      <div className="hdr__end">
        <QuoteLink className="btn btn--pri btn--sm" base="/en/order">
          {ORDER_CTA}
        </QuoteLink>
        <MenuDialog
          brand={brand}
          items={items}
          quoteLabel={ORDER_CTA}
          homeHref={EN_HOME_PATH}
          quoteBase="/en/order"
          labels={{
            open: EN_SHELL.menuOpen,
            close: EN_SHELL.menuClose,
            title: EN_SHELL.menuTitle,
            nav: EN_SHELL.mainNavLabel,
            home: EN_SHELL.homeLinkSuffix,
          }}
        />
      </div>
    </header>
  );
}
