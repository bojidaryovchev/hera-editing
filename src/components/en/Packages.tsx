import Link from "next/link";
import type { CSSProperties } from "react";
import { Check } from "@/components/icons";
import { NICHE_LABELS } from "@/content/en/niches";
import { priceText, turnaroundText, type EnPackage } from "@/content/en/packages";
import { route } from "@/lib/site/nav";

const pad2 = (n: number) => String(n).padStart(2, "0");

/** The order form with this package chosen, recording the page the button was on. */
export function orderHref(packageId: string | null, from: string) {
  const q = new URLSearchParams();
  if (packageId) q.set("package", packageId);
  q.set("from", from);
  return route(`/en/order?${q.toString()}`);
}

/**
 * Columns per width for `n` cards, so no row is ever left half empty (decision 8a): wide screens show them all in
 * one row (up to four), then pairs or a single column, never a lone card beside an empty space.
 */
export function gridColumns(n: number): CSSProperties {
  return {
    "--cols-lg": Math.min(n, 4),
    "--cols-md": n === 3 ? 3 : Math.min(n, 2),
    "--cols-sm": n % 2 === 0 ? 2 : 1,
  } as CSSProperties;
}

/** One package: what it includes, its limits, turnaround and revisions, the price, and the order button. */
export function PackageCard({ pkg, from, level = 3 }: { pkg: EnPackage; from: string; level?: 3 | 4 }) {
  const L = NICHE_LABELS;
  const H = level === 3 ? "h3" : "h4";
  const facts: Array<[string, string]> = [
    ...(pkg.limits.footage ? [[L.footage, pkg.limits.footage] as [string, string]] : []),
    ...(pkg.limits.length ? [[L.length, pkg.limits.length] as [string, string]] : []),
    ...(pkg.limits.validity ? [[L.validity, pkg.limits.validity] as [string, string]] : []),
    [L.turnaround, turnaroundText(pkg.turnaround)],
    [L.revisions, pkg.revisions],
  ];
  return (
    <li className="en-pkg" id={pkg.id}>
      <div className="en-pkg__head">
        <H className="en-pkg__name">{pkg.name}</H>
        <p className="en-pkg__sum">{pkg.summary}</p>
      </div>
      <p className="en-pkg__price">{priceText(pkg)}</p>
      <dl className="en-pkg__facts">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="en-pkg__inc">
        <p className="sv-label">{L.includes}</p>
        <ul className="ticks ticks--sm">
          {pkg.includes.map((i) => (
            <li key={i}>
              <Check />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link className="btn btn--sec en-pkg__cta" href={orderHref(pkg.id, from)}>
        {L.orderPackage}
        <span className="sr-only-x">: {pkg.name}</span>
      </Link>
    </li>
  );
}

export function PackageGrid({
  packages,
  from,
  level = 3,
}: {
  packages: readonly EnPackage[];
  from: string;
  /** The cards' heading level: 3 under a section's h2, 4 under a group's h3 (the pricing page). */
  level?: 3 | 4;
}) {
  return (
    <ul className="en-pkgs" style={gridColumns(packages.length)}>
      {packages.map((p) => (
        <PackageCard key={p.id} pkg={p} from={from} level={level} />
      ))}
    </ul>
  );
}

/** Beside a niche page's hero (8a: no empty half): the niche's packages, prices and turnaround at a glance. */
export function PricePanel({
  heading,
  note,
  packages,
}: {
  heading: string;
  note: string;
  packages: readonly EnPackage[];
}) {
  return (
    <section className="ipanel" aria-labelledby="panel-h">
      <h2 className="ipanel__h" id="panel-h">
        {heading}
      </h2>
      <ol className="en-plist">
        {packages.map((p, i) => (
          <li key={p.id}>
            <b aria-hidden="true">{pad2(i + 1)}</b>
            <span className="en-plist__name">
              <a href={`#${p.id}`}>{p.name}</a>
              <small>{turnaroundText({ days: p.turnaround.days, maxDays: p.turnaround.maxDays })}</small>
            </span>
            <span className="en-plist__price">{priceText(p)}</span>
          </li>
        ))}
      </ol>
      <p className="ipanel__p">{note}</p>
    </section>
  );
}
