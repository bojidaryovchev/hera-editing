"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { quoteHref } from "@/lib/site/nav";

/**
 * A quote button in the shared header or menu: it records the page it was pressed on (IA:24, L10), like every quote
 * button in a page's own sections, so the lead's source is that page and not the homepage.
 */
export function QuoteLink({ className, children, onClick }: { className: string; children: ReactNode; onClick?: () => void }) {
  const path = usePathname() || "/";
  return (
    <Link className={className} href={quoteHref(path)} onClick={onClick}>
      {children}
    </Link>
  );
}
