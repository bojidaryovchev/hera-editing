import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "@/components/icons";
import { FaqSection } from "@/components/site/FaqSection";
import { OneVideo } from "@/components/site/OneVideo";
import { PageCta } from "@/components/site/PageCta";
import { PageHero } from "@/components/site/PageHero";
import { FAQ_SETS } from "@/content/faq";
import { HOME } from "@/content/home";
import { PACKAGES } from "@/content/packages";
import { SEO } from "@/content/seo";
import { FINAL_CTA, QUOTE_DRIVERS, TIERS, VOLUME_NOTE } from "@/content/shared";
import { QUOTE_CTA } from "@/content/site";
import { quoteHref, route } from "@/lib/site/nav";

const PATH = "/paketi";

export const metadata: Metadata = {
  title: SEO.packages.title,
  description: SEO.packages.description,
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const SEQ: Record<(typeof TIERS)[number]["id"], number> = {
  start: 4,
  rastezh: 8,
  individualno: 12,
};
const tierHref = (volume: string) =>
  route(`${quoteHref(PATH)}&volume=${volume}`);

type Row = (typeof PACKAGES.rows)[number];
const isKey = (r: Row) => "key" in r && r.key === true;
const isPrice = (r: Row) => "price" in r && r.price === true;
/** Rows with the same value in every tier (the price stays in each card: it answers the question asked there). */
const COMMON: readonly Row[] = PACKAGES.rows.filter(
  (r) => !isPrice(r) && r.values.every((v) => v === r.values[0]),
);
const PER_TIER: readonly Row[] = PACKAGES.rows.filter(
  (r) => !COMMON.includes(r),
);

/**
 * /paketi (IA:55-56). The price question comes first (research/05: "колко струва…" searches), answered without a
 * tariff. Then the three illustrative tiers: a comparison table on wide screens, one card per tier on narrow ones
 * (never a sideways scroll, decision 8b), how videos are counted, the packages FAQ and the quote action.
 */
export default function PackagesPage() {
  const p = PACKAGES;
  return (
    <main id="main" className="page" data-page="packages">
      <div className="wrap">
        <PageHero
          crumb={p.breadcrumb}
          eyebrow={p.hero.eyebrow}
          title={p.hero.title}
          lead={p.hero.lead}
          aside={<PriceDrivers />}
        >
          <Link className="btn btn--pri" href={quoteHref(PATH)}>
            {QUOTE_CTA}
          </Link>
        </PageHero>
      </div>

      <section className="paper sv-sec wrap" aria-labelledby="tiers-h">
        <div className="sv-head">
          <h2 className="h2 h2--md" id="tiers-h">
            {p.tiersHeading}
          </h2>
          <p className="sv-note sv-note--ink">{VOLUME_NOTE}</p>
        </div>
        <TierTable />
        <TierCards />
      </section>

      <section className="sv-sec sv-dark wrap" aria-labelledby="count-h">
        <div className="sv-split sv-split--even">
          <div className="sv-col">
            <h2 className="h2 h2--md" id="count-h">
              {p.counting.heading}
            </h2>
            <p className="sv-lead">{p.counting.text}</p>
          </div>
          <OneVideo />
        </div>
      </section>

      <FaqSection
        ids={FAQ_SETS.packages}
        more={{
          href: route("/upravlenie-na-sotsialni-mrezhi"),
          label: HOME.faq.more,
        }}
      />
      <PageCta
        id="pk-cta-h"
        heading={FINAL_CTA.heading}
        body={FINAL_CTA.body}
        action={{ href: quoteHref(PATH), label: QUOTE_CTA }}
      />
    </main>
  );
}

/** Up front: what the price depends on, in a panel beside the hero text. */
function PriceDrivers() {
  const pr = PACKAGES.price;
  return (
    <section className="ipanel" aria-labelledby="price-h">
      <h2 className="ipanel__h" id="price-h">
        {pr.heading}
      </h2>
      <p className="ipanel__p">{pr.answer}</p>
      <ol className="ipanel__list ipanel__list--plain">
        {QUOTE_DRIVERS.map((d, i) => (
          <li key={d}>
            <b aria-hidden="true">{pad2(i + 1)}</b>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Seq({ id }: { id: (typeof TIERS)[number]["id"] }) {
  return (
    <span className="seq" aria-hidden="true">
      {Array.from({ length: SEQ[id] }, (_, i) => (
        <i key={i} />
      ))}
      {id === "individualno" && <i className="more" />}
    </span>
  );
}

function Value({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="yes">
        <Check />
        {PACKAGES.yes}
      </span>
    );
  return <>{v}</>;
}

/** Wide screens: one comparison table, the features as row headers. */
function TierTable() {
  const p = PACKAGES;
  return (
    <div className="ptable">
      <table>
        <caption className="sr-only-x">{p.tableCaption}</caption>
        <thead>
          <tr>
            <td />
            {TIERS.map((t) => (
              <th key={t.id} scope="col">
                <span className="ptable__name">{t.name}</span>
                <span className="ptable__for">{t.for}</span>
                <Seq id={t.id} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {p.rows.map((r) => (
            <tr
              key={r.label}
              className={
                isKey(r) ? "is-key" : isPrice(r) ? "is-price" : undefined
              }
            >
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i}>
                  <Value v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td />
            {TIERS.map((t) => (
              <td key={t.id}>
                <Link className="btn btn--sec" href={tierHref(t.volume)}>
                  {QUOTE_CTA}
                  <span className="sr-only-x"> – {t.name}</span>
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/**
 * Narrow screens: what every tier shares, once; then one card per tier with only what differs (and the price), so
 * nothing needs a sideways scroll and nothing is read three times.
 */
function TierCards() {
  const p = PACKAGES;
  return (
    <div className="tcards">
      <div className="tcommon">
        <h3 className="sv-label">{p.commonHeading}</h3>
        <dl className="tcommon__rows">
          {COMMON.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>
                <Value v={r.values[0] ?? ""} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="tcards__list">
        {TIERS.map((t, ti) => (
          <li key={t.id} className="tcard">
            <div className="tcard__head">
              <h3>{t.name}</h3>
              <p>{t.for}</p>
              <Seq id={t.id} />
            </div>
            <dl className="tcard__rows">
              {PER_TIER.map((r) => (
                <div
                  key={r.label}
                  className={
                    isKey(r) ? "is-key" : isPrice(r) ? "is-price" : undefined
                  }
                >
                  <dt>{r.label}</dt>
                  <dd>
                    <Value v={r.values[ti] ?? ""} />
                  </dd>
                </div>
              ))}
            </dl>
            <Link className="btn btn--sec" href={tierHref(t.volume)}>
              {QUOTE_CTA}
              <span className="sr-only-x"> – {t.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
