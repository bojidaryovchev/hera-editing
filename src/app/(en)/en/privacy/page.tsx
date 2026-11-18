import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { BUSINESS } from "@/content/business";
import { EN_PRIVACY_NOTICE, EN_PRIVACY_PAGE } from "@/content/en/legal/privacy";
import { EN_CRUMBS } from "@/content/en/site";
import { resolveAppEnv } from "@/lib/config/env";
import { enPageMetadata, enPagePath } from "@/lib/en/metadata";
import { assertEnPrivacyReady } from "@/lib/en/release";
import { requireEnSection } from "@/lib/en/section";
import { route } from "@/lib/site/nav";

const PATH = enPagePath("privacy");

export const metadata: Metadata = enPageMetadata("privacy");

/**
 * /en/privacy: the English privacy notice, the same skeleton of facts as /poveritelnost with the same gates. The
 * controller is named only once the company is registered and verified (decision 10); production refuses a draft.
 */
export default function EnPrivacyPage() {
  requireEnSection();
  const env = resolveAppEnv(process.env);
  assertEnPrivacyReady(env);
  const p = EN_PRIVACY_PAGE;
  const showPending = env !== "production";
  const b = BUSINESS;
  const controller =
    b.verified && b.legalName
      ? [b.legalName, b.companyId && `${p.companyNumber} ${b.companyId}`, b.address].filter(Boolean).join(", ")
      : null;
  return (
    <main id="main" className="page" data-page="en-privacy">
      <div className="doc wrap">
        <div className="doc__col">
          <PageHero crumb={p.breadcrumb} path={PATH} root={EN_CRUMBS} title={p.title} />
          <div className="doc__paper paper">
            <p className="doc__meta">
              <span>
                {p.versionLabel}: {EN_PRIVACY_NOTICE.version}
              </span>
              {EN_PRIVACY_NOTICE.status === "draft" && <span className="gate">{p.draftNotice}</span>}
            </p>
            {p.sections.map((s) => (
              <section key={s.id} id={s.id} className="doc__sec" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.heading}</h2>
                {s.id === "controller" && controller && <p>{controller}</p>}
                {s.body && <p>{s.body}</p>}
                {s.pending && showPending && !(s.id === "controller" && controller) && (
                  <p className="gate">
                    {p.pendingLabel}: {s.pending}
                  </p>
                )}
              </section>
            ))}
            <p className="doc__foot doc__foot--links">
              <Link className="link" href={route("/en/cookies")}>
                {p.cookiesLink}
              </Link>
              <Link className="link" href={route("/en/terms")}>
                {p.termsLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
