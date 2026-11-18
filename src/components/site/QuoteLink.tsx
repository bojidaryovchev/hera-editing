"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { quoteHref, route } from "@/lib/site/nav";

/**
 * A quote button in the shared header or menu: it records the page it was pressed on (IA:24, L10), like every quote
 * button in a page's own sections, so the lead's source is that page and not the homepage. `base` is the form it
 * leads to: the Bulgarian quote form by default, or the English order form (/en/order).
 */
export function QuoteLink({
  className,
  children,
  onClick,
  base,
}: {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  base?: "/en/order";
}) {
  const path = usePathname() || "/";
  const href = base ? route(`${base}?from=${encodeURIComponent(path)}`) : quoteHref(path);
  return (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
