import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { QuoteLink } from "@/components/site/QuoteLink";
import { BUSINESS } from "@/content/business";
import { publishedSamples } from "@/content/en/samples";
import { EN_FOOTER, EN_GATES, EN_HOME_PATH, EN_SHELL, ORDER_CTA, enCopyrightLine } from "@/content/en/site";
import { resolveAppEnv } from "@/lib/config/env";
import { brandName, publicContacts } from "@/lib/site/brand";
import { route } from "@/lib/site/nav";

/**
 * The English footer: the section's map, the legal pages and cookie settings, contacts and company details gated as
 * on the Bulgarian site (decision 10: shown only once verified, a labelled gap outside production), and the way
 * back to the Bulgarian site.
 */
export function EnFooter() {
  const brand = brandName();
  const { email, phone } = publicContacts();
  const showGates = resolveAppEnv(process.env) !== "production";
  const hasSamples = publishedSamples().length > 0;
  const b = BUSINESS;
  const company = b.verified
    ? [
        b.legalName,
        b.companyId ? `${EN_FOOTER.companyIdLabel}: ${b.companyId}` : null,
        b.vatId ? `${EN_FOOTER.vatIdLabel}: ${b.vatId}` : null,
        b.address,
      ].filter((x): x is string => Boolean(x))
    : [];
  const columns = EN_FOOTER.columns.map((c) => ({
    ...c,
    links: c.links.filter((l) => !("requiresSamples" in l && l.requiresSamples) || hasSamples),
  }));
  return (
    <footer className="ftr">
      <div className="ftr__grid wrap">
        <div className="ftr__brand">
          <Link className="logo" href={EN_HOME_PATH} aria-label={`${brand}, ${EN_SHELL.homeLinkSuffix}`}>
            <Wordmark title={brand} />
          </Link>
          <p>{EN_FOOTER.tagline}</p>
          <QuoteLink className="btn btn--pri btn--sm" base="/en/order">
            {ORDER_CTA}
          </QuoteLink>
        </div>
        <nav className="ftr__cols" aria-label={EN_SHELL.footerNavLabel}>
          {columns.map((c) => (
            <div key={c.heading}>
              <h2>{c.heading}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={route(l.href)}>{l.label}</Link>
                  </li>
                ))}
                {c.links.some((l) => l.href === "/en/cookies") && (
                  <li>
                    <Link href={route("/en/cookies")}>{EN_FOOTER.cookieSettings}</Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div>
            <h2>{EN_FOOTER.contactHeading}</h2>
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
                  <p className="gate">{EN_GATES.contact}</p>
                </li>
              )}
              {company.map((line) => (
                <li key={line}>
                  <p>{line}</p>
                </li>
              ))}
              {company.length === 0 && showGates && (
                <li>
                  <p className="gate">{EN_GATES.company}</p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div className="ftr__bottom wrap">
        <span>{enCopyrightLine(brand, new Date().getFullYear())}</span>
        <Link className="ftr__lang" href="/" hrefLang="bg">
          {EN_FOOTER.bulgarian.before} (<span lang="bg">{EN_FOOTER.bulgarian.language}</span>)
        </Link>
      </div>
    </footer>
  );
}
