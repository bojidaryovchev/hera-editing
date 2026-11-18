"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { route } from "@/lib/site/nav";

/** The English header's links, the current page marked with aria-current and the underline (decision L7). */
export function EnNav({ items, label }: { items: readonly { label: string; href: string }[]; label: string }) {
  const path = usePathname();
  return (
    <nav className="hdr__nav" aria-label={label}>
      {items.map((i) => (
        <Link key={i.href} href={route(i.href)} aria-current={path === i.href ? "page" : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
