import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { replyThreadAction, setThreadStatusAction } from "@/app/(admin)/admin/actions";
import { ReplyForm } from "@/components/admin/ReplyForm";
import { formatWhen, kilobytes } from "@/lib/admin/format";
import { getLead } from "@/lib/admin/leads";
import { replySetup } from "@/lib/admin/mail";
import { getDb } from "@/lib/db/client";
import { singleMailbox } from "@/lib/mailbox/address";
import { REPLY_ERRORS } from "@/lib/mailbox/reply";
import { getThread } from "@/lib/mailbox/store";
import { readableBody } from "@/lib/mailbox/threading";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Разговор" };

/**
 * One conversation and the box to answer it from. Bodies are TEXT, never the sender's HTML: this page belongs to
 * the one session that can send mail as the company, and a stranger's markup here would be a stored-XSS hole.
 */
export default async function AdminThread({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const thread = await getThread(db, id);
  if (!thread) notFound();
  const lead = thread.leadId ? await getLead(db, thread.leadId) : null;
  const recipient = singleMailbox(thread.correspondent);
  const setup = replySetup();
  const blocked = !recipient ? REPLY_ERRORS.unclear : setup.ok ? null : setup.error;
  const next = thread.status === "open" ? "done" : "open";

  return (
    <>
      <Link className="adm-back" href="/admin/poshta">
        ← Всички разговори
      </Link>
      <div className="adm-head">
        <h1 className="adm-h1">{thread.subject}</h1>
        <form action={setThreadStatusAction}>
          <input type="hidden" name="threadId" value={thread.id} />
          <input type="hidden" name="status" value={next} />
          <button className="btn btn--sec btn--sm" type="submit">
            {next === "done" ? "Приключете разговора" : "Отворете отново"}
          </button>
        </form>
      </div>
      <p className="adm-lead">
        {thread.correspondentName ? `${thread.correspondentName} · ` : ""}
        {thread.correspondent}
        {thread.status === "done" ? " · приключен" : ""}
        {lead && (
          <>
            {" · "}
            <Link href={`/admin/zapitvaniya/${lead.id}`}>запитване от {lead.name}</Link>
          </>
        )}
      </p>

      <ul className="adm-msgs">
        {thread.messages.map((m) => (
          <li key={m.id} className="adm-msg" data-direction={m.direction}>
            <div className="adm-msg__head">
              <b>{m.direction === "in" ? `От ${m.fromAddress}` : `От нас до ${m.toAddresses}`}</b>
              <span>{formatWhen(m.createdAt)}</span>
            </div>
            <p className="adm-msg__body">{readableBody(m)}</p>
            {m.attachments && m.attachments.length > 0 && (
              <p className="adm-msg__files">
                Прикачени файлове (остават в Resend):{" "}
                {m.attachments.map((a) => `${a.filename} (${kilobytes(a.size)})`).join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>

      <ReplyForm
        action={replyThreadAction}
        hidden={{ threadId: thread.id }}
        to={recipient?.address ?? thread.correspondent}
        blocked={blocked}
      />
    </>
  );
}
