import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

/**
 * The internal-page hero (decision L8): breadcrumbs, eyebrow, H1, lead, one action. Typographic, no stock imagery.
 * With `aside`, the hero splits in two on wide screens (decision 8a: no half left empty): the text left, a panel
 * right. `media` marks a narrow decorative aside that may sit beside the text from tablet width.
 */
export function PageHero({
  crumb,
  path,
  eyebrow,
  title,
  lead,
  children,
  aside,
  media = false,
}: {
  crumb: string;
  /** The page's own path, for the breadcrumb's structured data. */
  path: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
  media?: boolean;
}) {
  const main = (
    <>
      <Breadcrumbs current={crumb} path={path} />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="phero__h1">{title}</h1>
      {lead && <p className="phero__lead">{lead}</p>}
      {children && <div className="actions">{children}</div>}
    </>
  );
  if (!aside) return <header className="phero">{main}</header>;
  return (
    <header className={`phero phero--split${media ? " phero--media" : ""}`}>
      <div className="phero__main">{main}</div>
      <div className="phero__aside">{aside}</div>
    </header>
  );
}
