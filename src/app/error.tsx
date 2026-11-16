"use client";

import Link from "next/link";
import { SERVER_ERROR } from "@/content/errors";

/** Errors inside a page: the site's frame stays, a short message and a retry (L14). No error details are shown. */
export default function PageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const e = SERVER_ERROR;
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
            <Link className="btn btn--sec" href="/">
              {e.homeLink}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
