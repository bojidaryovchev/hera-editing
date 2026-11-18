import type { Metadata } from "next";
import Link from "next/link";
import { formatWhen } from "@/lib/admin/format";
import { ORDER_LABELS } from "@/content/admin-orders";
import { isLeadStatus, LEAD_STATUS_LABELS, LEAD_STATUSES, leadMeta, listLeads } from "@/lib/admin/leads";
import { getDb } from "@/lib/db/client";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Запитвания" };

/** The quote requests, newest first, filtered by pipeline status (chips that wrap, never a sideways strip). */
export default async function AdminLeads({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const current = isLeadStatus(status) ? status : undefined;
  const leads = await listLeads(getDb(), current);
  return (
    <>
      <h1 className="adm-h1">Запитвания</h1>
      <ul className="adm-chips" aria-label="Филтър по статус">
        <li>
          <Link href="/admin/zapitvaniya" aria-current={!current ? "page" : undefined}>
            Всички
          </Link>
        </li>
        {LEAD_STATUSES.map((s) => (
          <li key={s}>
            <Link href={`/admin/zapitvaniya?status=${s}`} aria-current={current === s ? "page" : undefined}>
              {LEAD_STATUS_LABELS[s]}
            </Link>
          </li>
        ))}
      </ul>
      {leads.length === 0 ? (
        <p className="adm-empty">{current ? "Няма запитвания с този статус." : "Още няма запитвания."}</p>
      ) : (
        <ul className="adm-list">
          {leads.map((l) => (
            <li key={l.id}>
              <Link className="adm-item" href={`/admin/zapitvaniya/${l.id}`}>
                <span className="adm-item__title">
                  {l.locale === "en" && (
                    <abbr className="adm-badge" title={ORDER_LABELS.badgeLabel}>
                      {ORDER_LABELS.badge}
                    </abbr>
                  )}
                  {l.name}
                </span>
                <span className="adm-item__side">
                  <span className="adm-status" data-status={l.status}>
                    {LEAD_STATUS_LABELS[l.status]}
                  </span>
                  {formatWhen(l.createdAt)}
                </span>
                <span className="adm-item__meta">
                  {leadMeta(l)}
                  {l.email ? ` · ${l.email}` : ""}
                  {l.phone ? ` · ${l.phone}` : ""}
                </span>
                {l.spamReason && <span className="adm-flag">Вероятен спам</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
