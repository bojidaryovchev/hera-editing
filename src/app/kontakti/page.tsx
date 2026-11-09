import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import { LeadForm } from "@/components/contact/LeadForm";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT, SOURCE_PAGE_NAMES } from "@/content/contact";
import { SEO } from "@/content/seo";
import { TIERS } from "@/content/shared";
import { GATES } from "@/content/site";
import { resolveAppEnv } from "@/lib/config/env";
import { publicContacts } from "@/lib/site/brand";
import { VOLUMES, normalizeSourcePath } from "@/lib/validation/lead";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** /kontakti: the quote request (IA:62-76). Every quote button on the site lands here with `from` (and `volume`). */
export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const one = (key: string) => {
    const v = sp[key];
    return (typeof v === "string" ? v : Array.isArray(v) ? (v[0] ?? "") : "").trim();
  };
  const sourcePath = normalizeSourcePath(one("from")) ?? "";
  const volume = (VOLUMES as readonly string[]).includes(one("volume")) ? one("volume") : "";
  const tier = TIERS.find((t) => t.volume === volume);
  const fromName = sourcePath && sourcePath !== "/kontakti" ? (SOURCE_PAGE_NAMES[sourcePath] ?? null) : null;
  const utm = { source: one("utm_source").slice(0, 100), medium: one("utm_medium").slice(0, 100), campaign: one("utm_campaign").slice(0, 100) };
  const { email, phone } = publicContacts();
  const showGates = resolveAppEnv(process.env) !== "production";

  return (
    <main id="main" className="page" data-page="contact">
      <div className="contact wrap">
        <div className="contact__col">
          <Breadcrumbs current={CONTACT.breadcrumb} />
          <header className="contact__head">
            <h1 className="contact__h1">{CONTACT.hero.title}</h1>
            <p className="contact__lead">{CONTACT.hero.lead}</p>
            {(fromName || tier) && (
              <p className="contact__src">
                {fromName && (
                  <span>
                    {CONTACT.source.fromPage}: {fromName}
                  </span>
                )}
                {tier && (
                  <span>
                    {CONTACT.source.fromPackage}: {tier.name}
                  </span>
                )}
              </p>
            )}
          </header>

          <LeadForm requestId={randomUUID()} sourcePath={sourcePath} utm={utm} defaultVolume={volume} />

          {(email || phone || showGates) && (
            <section className="contact__direct" aria-labelledby="direct-h">
              <h2 id="direct-h">{CONTACT.direct.heading}</h2>
              {email || phone ? (
                <ul>
                  {email && (
                    <li>
                      <span>{CONTACT.direct.emailLabel}</span>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <span>{CONTACT.direct.phoneLabel}</span>
                      <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="gate">{GATES.contact}</p>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
