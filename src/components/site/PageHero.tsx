import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

/** The internal-page hero (decision L8): breadcrumbs, eyebrow, H1, lead, one action. Typographic, no stock imagery. */
export function PageHero({ crumb, eyebrow, title, lead, children }: { crumb: string; eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="phero">
      <Breadcrumbs current={crumb} />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="phero__h1">{title}</h1>
      {lead && <p className="phero__lead">{lead}</p>}
      {children && <div className="actions">{children}</div>}
    </header>
  );
}
