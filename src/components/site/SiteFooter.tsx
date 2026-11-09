import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { PROJECTS } from "@/content/projects";
import { FOOTER, GATES, QUOTE_CTA, SHELL, copyrightLine } from "@/content/site";
import { resolveAppEnv } from "@/lib/config/env";
import { brandName, publicContacts } from "@/lib/site/brand";
import { quoteHref, route } from "@/lib/site/nav";

/** Global footer (IA:79): site map, legal pages, cookie settings, contacts once verified. */
export function SiteFooter() {
  const brand = brandName();
  const { email, phone } = publicContacts();
  const showGates = resolveAppEnv(process.env) !== "production";
  const columns = FOOTER.columns.map((c) => ({
    ...c,
    links: c.links.filter((l) => !("requiresPublishedProjects" in l && l.requiresPublishedProjects) || PROJECTS.length > 0),
  }));
  return (
    <footer className="ftr">
      <div className="ftr__grid wrap">
        <div className="ftr__brand">
          <Link className="logo" href="/" aria-label={`${brand}, ${SHELL.homeLinkSuffix}`}>
            <Wordmark title={brand} />
          </Link>
          <p>{FOOTER.tagline}</p>
          <Link className="btn btn--pri btn--sm" href={quoteHref("/")}>
            {QUOTE_CTA}
          </Link>
        </div>
        <nav className="ftr__cols" aria-label={SHELL.footerNavLabel}>
          {columns.map((c) => (
            <div key={c.heading}>
              <h2>{c.heading}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={route(l.href)}>{l.label}</Link>
                  </li>
                ))}
                {c.links.some((l) => l.href === "/poveritelnost") && (
                  <li>
                    <Link href={route("/biskvitki")}>{FOOTER.cookieSettings}</Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div>
            <h2>{FOOTER.contactHeading}</h2>
            <ul>
              {email && (
                <li>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                </li>
              )}
              {!email && !phone && showGates && (
                <li>
                  <p className="gate">{GATES.contact}</p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div className="ftr__bottom wrap">
        <span>{copyrightLine(brand, new Date().getFullYear())}</span>
      </div>
    </footer>
  );
}
