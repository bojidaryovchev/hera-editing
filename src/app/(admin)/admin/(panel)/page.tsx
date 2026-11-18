import type { Metadata } from "next";
import Link from "next/link";
import { formatWhen } from "@/lib/admin/format";
import { ORDER_LABELS } from "@/content/admin-orders";
import { countNewLeads, LEAD_STATUS_LABELS, leadMeta, listLeads } from "@/lib/admin/leads";
import { getDb } from "@/lib/db/client";
import { countAwaitingAnswer, listThreads } from "@/lib/mailbox/store";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Табло" };

/** What needs the owner now: new enquiries and conversations that owe an answer, then the latest of each. */
export default async function AdminDashboard() {
  await requireAdmin();
  const db = getDb();
  const [newLeads, awaiting, leads, threads] = await Promise.all([
    countNewLeads(db),
    countAwaitingAnswer(db),
    listLeads(db, undefined, 5),
    listThreads(db, "open", 5),
  ]);
  return (
    <>
      <h1 className="adm-h1">Табло</h1>
      <div className="adm-tiles">
        <Link className={`adm-tile${newLeads > 0 ? " adm-tile--hot" : ""}`} href="/admin/zapitvaniya?status=new">
          <b>{newLeads}</b>
          <span>Нови запитвания</span>
        </Link>
        <Link className={`adm-tile${awaiting > 0 ? " adm-tile--hot" : ""}`} href="/admin/poshta">
          <b>{awaiting}</b>
          <span>Разговори чакат отговор</span>
        </Link>
      </div>

      <section className="adm-sheet" aria-labelledby="adm-recent-leads">
        <h2 id="adm-recent-leads" className="adm-h2">
          Последни запитвания
        </h2>
        {leads.length === 0 ? (
          <p className="adm-empty">Още няма запитвания.</p>
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
                  </span>
                  <span className="adm-item__meta">
                    {leadMeta(l)} · {formatWhen(l.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="adm-sheet" aria-labelledby="adm-recent-mail">
        <h2 id="adm-recent-mail" className="adm-h2">
          Отворени разговори
        </h2>
        {threads.length === 0 ? (
          <p className="adm-empty">Няма отворени разговори.</p>
        ) : (
          <ul className="adm-list">
            {threads.map((t) => (
              <li key={t.id}>
                <Link className="adm-item" href={`/admin/poshta/${t.id}`}>
                  <span className="adm-item__title">{t.correspondentName ?? t.correspondent}</span>
                  <span className="adm-item__side">
                    {t.lastDirection === "in" && (
                      <span className="adm-status" data-status="waiting">
                        чака отговор
                      </span>
                    )}
                  </span>
                  <span className="adm-item__meta">
                    {t.subject} · {formatWhen(t.lastMessageAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
