import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";
import { BUSINESS } from "@/content/business";
import { EN_TERMS, EN_TERMS_PAGE, TERMS_GATE_TEXT, type TermsBlock, type TermsInline } from "@/content/en/terms";
import { longDate } from "@/content/en/packages";
import { EN_CRUMBS } from "@/content/en/site";
import { resolveAppEnv } from "@/lib/config/env";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { assertEnTermsSignedOff } from "@/lib/en/release";
import { requireEnSection } from "@/lib/en/section";
import { brandName } from "@/lib/site/brand";
import { route } from "@/lib/site/nav";

const PATH = enPagePath("terms");

export const metadata: Metadata = enPageMetadata("terms");

/** A gated company fact: the verified value, or neutral words (never the document's placeholder, decision 10). */
function gate(which: "company" | "courtCity"): string {
  const b = BUSINESS;
  if (b.verified) {
    if (which === "company" && b.legalName && b.companyId && b.address)
      return `${b.legalName}, ${EN_TERMS_PAGE.companyNumber} ${b.companyId}, ${EN_TERMS_PAGE.registeredAt} ${b.address}, Bulgaria`;
    if (which === "courtCity" && b.registeredCity) return b.registeredCity;
  }
  return TERMS_GATE_TEXT[which];
}

function Inline({ part }: { part: TermsInline }): ReactNode {
  if (typeof part === "string") return part;
  if ("b" in part) return <strong>{part.b}</strong>;
  if ("link" in part)
    return (
      <Link className="link--inline" href={route(part.link)}>
        {part.text}
      </Link>
    );
  if ("email" in part) return <a href={`mailto:${part.email}`}>{part.email}</a>;
  if ("brand" in part) return <strong>{brandName()}</strong>;
  return gate(part.gate);
}

const line = (parts: readonly TermsInline[]) =>
  parts.map((p, i) => (
    <Fragment key={i}>
      <Inline part={p} />
    </Fragment>
  ));

function Block({ block }: { block: TermsBlock }) {
  if ("p" in block) return <p>{line(block.p)}</p>;
  if ("ul" in block)
    return (
      <ul className="doc__list">
        {block.ul.map((item, i) => (
          <li key={i}>{line(item)}</li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol className="doc__list">
        {block.ol.map((item, i) => (
          <li key={i}>{line(item)}</li>
        ))}
      </ol>
    );
  return (
    <table className="doc__table">
      <thead>
        <tr>
          <th scope="col">{block.table.head[0]}</th>
          <th scope="col">{block.table.head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {block.table.rows.map(([a, b]) => (
          <tr key={a}>
            <th scope="row">{a}</th>
            <td>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * /en/terms: the package terms (docs/contracts/terms-of-service.md, rendered from src/content/en/terms.ts). Production
 * refuses them until the business owner signs them off; until then every other environment shows them, labelled.
 * The Data Processing Agreement they refer to is available on request, not published here.
 */
export default function TermsPage() {
  requireEnSection();
  const env = resolveAppEnv(process.env);
  assertEnTermsSignedOff(env);
  const t = EN_TERMS;
  const P = EN_TERMS_PAGE;
  const showGates = env !== "production";
  return (
    <main id="main" className="page" data-page="en-terms">
      <div className="doc wrap">
        <div className="doc__col">
          <PageHero crumb={P.breadcrumb} path={PATH} root={EN_CRUMBS} title={t.title} />
          <div className="doc__paper paper">
            <p className="doc__meta">
              <span>
                {P.versionLabel} {t.version} · {longDate(t.date)}
              </span>
              {!t.signedOff && <span className="gate">{P.draftNotice}</span>}
              {!BUSINESS.verified && showGates && <span className="gate">{P.companyGate}</span>}
            </p>
            <div className="doc__sec doc__sec--intro">
              {t.intro.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>
            {t.sections.map((s) => (
              <section key={s.id} id={s.id} className="doc__sec" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>
                  {s.n}. {s.heading}
                </h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
                {s.id === "personal-data" && (
                  <aside className="doc__note" aria-labelledby="dpa-h">
                    <h3 id="dpa-h">{P.dpaHeading}</h3>
                    <p>
                      {P.dpaText}{" "}
                      <a href={`mailto:${P.dpaEmail}?subject=${encodeURIComponent(P.dpaSubject)}`}>{P.dpaEmail}</a>.
                    </p>
                  </aside>
                )}
              </section>
            ))}
            <p className="doc__foot">
              <Link className="link" href={route("/en/privacy")}>
                {P.privacyLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
