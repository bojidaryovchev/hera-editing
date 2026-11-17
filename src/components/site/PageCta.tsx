import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

type Action = { href: Route; label: string };

/** The closing band of an internal page: one heading, one sentence, the quote action (IA: CTA from every page). */
export function PageCta({
  id,
  heading,
  body,
  action,
  secondary,
}: {
  id: string;
  heading: string;
  body: string;
  action: Action;
  secondary?: Action;
}) {
  return (
    <section className="pcta wrap" aria-labelledby={id}>
      <div className="pcta__in">
        <h2 className="h2" id={id}>
          {heading}
        </h2>
        <p>{body}</p>
        <div className="actions">
          <Link className="btn btn--pri" href={action.href}>
            {action.label}
            <ArrowRight />
          </Link>
          {secondary && (
            <Link className="btn btn--sec" href={secondary.href}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
