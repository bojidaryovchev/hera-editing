import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { PRIVACY_NOTICE, PRIVACY_PAGE } from "@/content/legal/privacy";
import { resolveAppEnv } from "@/lib/config/env";
import { assertPrivacyReady } from "@/lib/site/release";
import { route } from "@/lib/site/nav";
import { pageMetadata } from "@/lib/site/metadata";

export const metadata: Metadata = pageMetadata("privacy");

/** /poveritelnost (IA:79, acceptance F). A skeleton of facts for the owner's lawyer until the notice is approved. */
export default function PrivacyPage() {
  const env = resolveAppEnv(process.env);
  assertPrivacyReady(env);
  const p = PRIVACY_PAGE;
  const showPending = env !== "production";
  return (
    <main id="main" className="page" data-page="privacy">
      <div className="doc wrap">
        <div className="doc__col">
          <PageHero crumb={p.breadcrumb} path="/poveritelnost" title={p.title} />
          <div className="doc__paper paper">
            <p className="doc__meta">
              <span>
                {p.versionLabel}: {PRIVACY_NOTICE.version}
              </span>
              {PRIVACY_NOTICE.status === "draft" && <span className="gate">{p.draftNotice}</span>}
            </p>
            {p.sections.map((s) => (
              <section key={s.id} id={s.id} className="doc__sec" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}>{s.heading}</h2>
                {s.body && <p>{s.body}</p>}
                {s.pending && showPending && (
                  <p className="gate">
                    {p.pendingLabel}: {s.pending}
                  </p>
                )}
              </section>
            ))}
            <p className="doc__foot">
              <Link className="link" href={route("/biskvitki")}>
                {p.cookiesLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
