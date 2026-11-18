"use client";

import Link from "next/link";
import { EN_SERVER_ERROR } from "@/content/en/pages";

/** Errors inside an English page: the section's frame stays, a short message and a retry (as in app/(site)/error). */
export default function EnPageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const e = EN_SERVER_ERROR;
  return (
    <main id="main" className="page" data-page="error">
      <div className="wrap">
        <div className="nf">
          <h1 className="nf__h1">{e.title}</h1>
          <p className="nf__text">{e.text}</p>
          <div className="actions">
            <button type="button" className="btn btn--pri" onClick={reset}>
              {e.retry}
            </button>
            <Link className="btn btn--sec" href="/en">
              {e.homeLink}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
