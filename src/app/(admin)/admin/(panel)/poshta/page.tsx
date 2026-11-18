import type { Metadata } from "next";
import Link from "next/link";
import { formatWhen } from "@/lib/admin/format";
import { replySetup } from "@/lib/admin/mail";
import { getDb } from "@/lib/db/client";
import { listThreads } from "@/lib/mailbox/store";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Поща" };

/** The contact@ mailbox: open conversations first, the ones that owe an answer marked with the recording dot. */
export default async function AdminMail({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const current = status === "done" ? "done" : "open";
  const threads = await listThreads(getDb(), current);
  const setup = replySetup();
  return (
    <>
      <h1 className="adm-h1">Поща</h1>
      {!setup.ok && <p className="adm-note adm-note--warn">{setup.error}</p>}
      <ul className="adm-chips" aria-label="Разговори">
        <li>
          <Link href="/admin/poshta" aria-current={current === "open" ? "page" : undefined}>
            Отворени
          </Link>
        </li>
        <li>
          <Link href="/admin/poshta?status=done" aria-current={current === "done" ? "page" : undefined}>
            Приключени
          </Link>
        </li>
      </ul>
      {threads.length === 0 ? (
        <p className="adm-empty">{current === "open" ? "Няма отворени разговори." : "Няма приключени разговори."}</p>
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
                  {formatWhen(t.lastMessageAt)}
                </span>
                <span className="adm-item__meta">
                  {t.subject}
                  {t.messageCount > 1 ? ` · ${t.messageCount} писма` : ""}
                </span>
                {t.snippet && <span className="adm-item__snip">{t.snippet}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
