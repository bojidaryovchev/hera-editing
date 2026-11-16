import type { Metadata } from "next";
import Link from "next/link";
import { NOT_FOUND } from "@/content/errors";
import { NOT_FOUND_TITLE } from "@/content/seo";
import { route } from "@/lib/site/nav";

export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
  robots: { index: false },
};

/** 404 (IA:19, L14): a timeline with one clip missing, then the way back. Next.js answers with status 404. */
export default function NotFound() {
  const n = NOT_FOUND;
  return (
    <main id="main" className="page" data-page="404">
      <div className="wrap">
        <div className="nf">
          <div className="nf__tl" aria-hidden="true">
            <span className="nf__clip" />
            <span className="nf__clip" />
            <span className="nf__gap">
              <i className="nf__ph" />
              <b>404</b>
              <small>{n.visualLabel}</small>
            </span>
            <span className="nf__clip" />
          </div>
          <h1 className="nf__h1">{n.title}</h1>
          <p className="nf__text">{n.text}</p>
          <div className="actions">
            <Link className="btn btn--pri" href="/">
              {n.homeLink}
            </Link>
          </div>
          <nav className="nf__links" aria-labelledby="nf-links-h">
            <h2 id="nf-links-h">{n.linksHeading}</h2>
            <ul>
              {n.links.map((l) => (
                <li key={l.href}>
                  <Link href={route(l.href)}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
