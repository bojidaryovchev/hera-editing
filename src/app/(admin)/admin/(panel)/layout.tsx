import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { logoutAction } from "@/app/(admin)/admin/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { adminConfig, requireAdmin } from "@/lib/admin/auth";
import { countNewLeads } from "@/lib/admin/leads";
import { getDb } from "@/lib/db/client";
import { countAwaitingAnswer } from "@/lib/mailbox/store";

/** Every panel screen: signed in, or sent to /admin/vhod. Off entirely (404) without ADMIN_PASSWORD. */
export default async function PanelLayout({ children }: { children: ReactNode }) {
  if (!adminConfig()) notFound();
  await requireAdmin();
  const db = getDb();
  const [newLeads, awaiting] = await Promise.all([countNewLeads(db), countAwaitingAnswer(db)]);
  return (
    <>
      <header className="adm-bar">
        <div className="adm-bar__in">
          <Link className="adm-brand" href="/admin">
            Hera Editing <small>админ</small>
          </Link>
          <AdminNav newLeads={newLeads} awaiting={awaiting} />
          <form action={logoutAction} className="adm-out">
            <button className="btn btn--sec btn--sm" type="submit">
              Изход
            </button>
          </form>
        </div>
      </header>
      <main id="main" className="adm-main">
        {children}
      </main>
    </>
  );
}
