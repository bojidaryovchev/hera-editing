import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { BUSINESS } from "@/content/business";
import { FAQ, FAQ_HEADING, faqOutsideCity, type FaqItem } from "@/content/faq";

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * FAQ (IA:35, L3, L12): native details/summary, several may be open. A heading row like the other sections, the
 * questions in two independent columns, so opening one never moves the other column. Question 3 names the base
 * city once the owner supplies it (CPY:54).
 */
export function FaqSection({ ids, more }: { ids: readonly string[]; more?: { href: Route; label: string } }) {
  const items = ids
    .map((id) => (id === "q3" && BUSINESS.baseCity ? faqOutsideCity(BUSINESS.baseCity) : FAQ[id]))
    .filter((x): x is FaqItem => Boolean(x));
  return <FaqList heading={FAQ_HEADING} items={items} more={more} />;
}

/** The FAQ's markup for any list of questions (the Bulgarian pages through FaqSection, the English ones directly). */
export function FaqList({
  heading,
  items,
  more,
  id = "faq-h",
}: {
  heading: string;
  items: readonly FaqItem[];
  more?: { href: Route; label: string };
  id?: string;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];
  return (
    <section className="paper faq wrap" aria-labelledby={id}>
      <div className="faq__head">
        <h2 className="h2" id={id}>
          {heading}
        </h2>
        {more && (
          <Link className="link" href={more.href}>
            {more.label}
            <ArrowRight />
          </Link>
        )}
      </div>
      <div className="faq__cols">
        {columns.map((col, c) => (
          <div key={c} className="faq__list">
            {col.map((item, i) => (
              <details key={item.id}>
                <summary>
                  <b aria-hidden="true">{pad2(c * half + i + 1)}</b>
                  {item.q}
                  <i aria-hidden="true" />
                </summary>
                <p className="faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
