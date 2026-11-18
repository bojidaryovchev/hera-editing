import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { OrderForm, type CountryOption, type PackageGroup } from "@/components/en/OrderForm";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EN_ORDER } from "@/content/en/order";
import { CUSTOMERS, nicheOf, packageById, packagesFor, priceText } from "@/content/en/packages";
import { EN_CRUMBS, EN_GATES } from "@/content/en/site";
import { euOrdersEnabled, getServerEnv, resolveAppEnv } from "@/lib/config/env";
import { COUNTRY_CODES, CUSTOM_PACKAGE } from "@/lib/en/order-fields";
import { enOrdersOpen } from "@/lib/en/release";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { publicContacts } from "@/lib/site/brand";
import { normalizeOrderSource } from "@/lib/validation/order";

const PATH = enPagePath("order");

export const metadata: Metadata = enPageMetadata("order");

/** Turnstile's public key when both keys are configured; the server then requires its token. */
function turnstileSiteKey(): string | null {
  try {
    return getServerEnv().turnstile?.siteKey ?? null;
  } catch {
    return null;
  }
}

const NAMES = new Intl.DisplayNames(["en"], { type: "region" });
/** Every country by its English name, alphabetically. */
const COUNTRIES: readonly CountryOption[] = COUNTRY_CODES.map((code) => ({ code, name: NAMES.of(code) ?? code })).sort(
  (a, b) => a.name.localeCompare(b.name, "en"),
);

/** The package menu: every package of the pricing data, grouped by customer, with its price. */
const GROUPS: readonly PackageGroup[] = CUSTOMERS.map((c) => ({
  label: c.name,
  options: packagesFor(c.id).map((p) => ({ value: p.id, label: `${p.name}: ${priceText(p)}`, niche: nicheOf(p) })),
}));

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * /en/order: the brief form (sales kit §5). Every order button lands here with `package` and `from`. Closed (404)
 * while the section is off, and in production until the package terms are signed off (decision L38). No card
 * payment: the reply states the price and the start date, and the invoice is paid by bank transfer.
 */
export default async function OrderPage({ searchParams }: { searchParams: SearchParams }) {
  if (!enOrdersOpen()) notFound();
  const sp = await searchParams;
  const one = (key: string) => {
    const v = sp[key];
    return (typeof v === "string" ? v : Array.isArray(v) ? (v[0] ?? "") : "").trim();
  };
  const wanted = one("package");
  const chosen = packageById(wanted);
  const defaultPackage = chosen ? chosen.id : wanted === CUSTOM_PACKAGE ? CUSTOM_PACKAGE : "";
  const sourcePath = normalizeOrderSource(one("from")) ?? "";
  const utm = {
    source: one("utm_source").slice(0, 100),
    medium: one("utm_medium").slice(0, 100),
    campaign: one("utm_campaign").slice(0, 100),
  };
  const { email } = publicContacts();
  const showGates = resolveAppEnv(process.env) !== "production";
  const o = EN_ORDER;

  return (
    <main id="main" className="page" data-page="en-order">
      <div className="contact wrap">
        <div className="contact__col">
          <Breadcrumbs current={o.breadcrumb} path={PATH} root={EN_CRUMBS} />
          <header className="contact__head">
            <h1 className="contact__h1">{o.hero.title}</h1>
            <p className="contact__lead">{o.hero.lead}</p>
            {chosen && (
              <p className="contact__src">
                <span>
                  {o.fromPackage}: {chosen.name}, {priceText(chosen)}
                </span>
              </p>
            )}
          </header>

          <section className="en-next" aria-labelledby="next-h">
            <h2 className="sv-label" id="next-h">
              {o.next.heading}
            </h2>
            <ol>
              {o.next.steps.map((s, i) => (
                <li key={s}>
                  <b aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <OrderForm
            requestId={randomUUID()}
            sourcePath={sourcePath}
            utm={utm}
            defaultPackage={defaultPackage}
            groups={GROUPS}
            countries={COUNTRIES}
            euOrders={euOrdersEnabled(process.env)}
            turnstileSiteKey={turnstileSiteKey()}
          />

          {(email || showGates) && (
            <section className="contact__direct" aria-labelledby="direct-h">
              <h2 id="direct-h">{o.direct.heading}</h2>
              {email ? (
                <ul>
                  <li>
                    <span>{o.direct.emailLabel}</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                </ul>
              ) : (
                <p className="gate">{EN_GATES.contact}</p>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
