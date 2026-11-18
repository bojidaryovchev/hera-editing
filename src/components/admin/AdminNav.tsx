"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** The three sections, with what waits in each: new enquiries, conversations that owe an answer. */
export function AdminNav({ newLeads, awaiting }: { newLeads: number; awaiting: number }) {
  const path = usePathname();
  const items = [
    { href: "/admin", label: "Табло", count: 0, current: path === "/admin" },
    {
      href: "/admin/zapitvaniya",
      label: "Запитвания",
      count: newLeads,
      current: path.startsWith("/admin/zapitvaniya"),
    },
    { href: "/admin/poshta", label: "Поща", count: awaiting, current: path.startsWith("/admin/poshta") },
  ] as const;
  return (
    <nav className="adm-nav" aria-label="Раздели">
      {items.map((item) => (
        <Link key={item.href} href={item.href} aria-current={item.current ? "page" : undefined}>
          {item.label}
          {item.count > 0 && (
            <span className="adm-count" aria-label={`${item.count} чакат`}>
              {item.count}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
