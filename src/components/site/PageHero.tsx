import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb, type CrumbRoot } from "@/components/site/Breadcrumbs";

/**
 * The internal-page hero (decision L8): breadcrumbs, eyebrow, H1, lead, one action. Typographic, no stock imagery.
 * With `aside`, the hero splits in two on wide screens (decision 8a: no half left empty): the text left, a panel
 * right. `media` marks a narrow decorative aside that may sit beside the text from tablet width.
 */
export function PageHero({
  crumb,
  path,
  parent,
  eyebrow,
  title,
  lead,
  children,
  aside,
  media = false,
  pair = false,
  root,
}: {
  crumb: string;
  /** The page's own path, for the breadcrumb's structured data. */
  path: string;
  /** A middle breadcrumb level, e.g. "Проекти" above a case study. */
  parent?: Crumb;
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
  media?: boolean;
  /** A short hero without an aside: from 1024 px the heading left, the lead and the action right. */
  pair?: boolean;
  /** The trail's start and label: the English section passes its own (Home → /en). */
  root?: CrumbRoot;
}) {
  const main = (
    <>
      <Breadcrumbs current={crumb} path={path} parent={parent} root={root} />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="phero__h1">{title}</h1>
      {lead && <p className="phero__lead">{lead}</p>}
      {children && <div className="actions">{children}</div>}
    </>
  );
  if (!aside) return <header className={`phero${pair ? " phero--pair" : ""}`}>{main}</header>;
  return (
    <header className={`phero phero--split${media ? " phero--media" : ""}`}>
      <div className="phero__main">{main}</div>
      <div className="phero__aside">{aside}</div>
    </header>
  );
}
