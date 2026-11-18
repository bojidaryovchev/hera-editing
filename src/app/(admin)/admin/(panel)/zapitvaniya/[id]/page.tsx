import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { replyLeadAction, setLeadStatusAction } from "@/app/(admin)/admin/actions";
import { ReplyForm } from "@/components/admin/ReplyForm";
import { GOAL_LABELS, VOLUME_LABELS } from "@/content/forms";
import { formatWhen, NOTIFICATION_LABELS } from "@/lib/admin/format";
import { getLead, LEAD_STATUS_LABELS, LEAD_STATUSES } from "@/lib/admin/leads";
import { replySetup } from "@/lib/admin/mail";
import { getDb } from "@/lib/db/client";
import { singleMailbox } from "@/lib/mailbox/address";
import { findThreadByLead, getThread } from "@/lib/mailbox/store";
import { readableBody } from "@/lib/mailbox/threading";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Запитване" };

const safeLink = (url: string) => (/^https?:\/\//i.test(url) ? url : null);

/** One enquiry: everything the visitor sent, its status, and the email conversation about it. */
export default async function AdminLead({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const db = getDb();
  const lead = await getLead(db, id);
  if (!lead) notFound();
  const threadId = await findThreadByLead(db, lead.id);
  const thread = threadId ? await getThread(db, threadId) : null;
  const setup = replySetup();
  const recipient = lead.email ? singleMailbox(lead.email) : null;
  const blocked = !recipient ? "Запитването няма имейл. Свържете се по телефона." : setup.ok ? null : setup.error;
  const utm = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");
  const profile = lead.profileUrl ? safeLink(lead.profileUrl) : null;

  return (
    <>
      <Link className="adm-back" href="/admin/zapitvaniya">
        ← Всички запитвания
      </Link>
      <div className="adm-head">
        <h1 className="adm-h1">{lead.name}</h1>
        <span className="adm-status" data-status={lead.status}>
          {LEAD_STATUS_LABELS[lead.status]}
        </span>
      </div>
      {saved && <p className="adm-note adm-note--ok">Статусът е запазен.</p>}
      {lead.spamReason && <p className="adm-note adm-note--warn">Отбелязано като вероятен спам ({lead.spamReason}).</p>}

      <section className="adm-sheet" aria-label="Данни от формата">
        <dl className="adm-dl">
          <div>
            <dt>Фирма</dt>
            <dd>{lead.businessName}</dd>
          </div>
          <div>
            <dt>Град</dt>
            <dd>{lead.city}</dd>
          </div>
          <div>
            <dt>Имейл</dt>
            <dd>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "—"}</dd>
          </div>
          <div>
            <dt>Телефон</dt>
            <dd>{lead.phone ? <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}>{lead.phone}</a> : "—"}</dd>
          </div>
          <div>
            <dt>Цел</dt>
            <dd>{GOAL_LABELS[lead.goal]}</dd>
          </div>
          <div>
            <dt>Обем</dt>
            <dd>{lead.volume ? VOLUME_LABELS[lead.volume] : "—"}</dd>
          </div>
          <div className="adm-wide">
            <dt>Профил</dt>
            <dd>
              {profile ? (
                <a href={profile} target="_blank" rel="noopener noreferrer">
                  {lead.profileUrl}
                </a>
              ) : (
                (lead.profileUrl ?? "—")
              )}
            </dd>
          </div>
          <div className="adm-wide">
            <dt>Съобщение</dt>
            <dd>{lead.message ?? "—"}</dd>
          </div>
          <div>
            <dt>Получено</dt>
            <dd>{formatWhen(lead.createdAt)}</dd>
          </div>
          <div>
            <dt>От страница</dt>
            <dd>{lead.sourcePath ?? "—"}</dd>
          </div>
          <div>
            <dt>Кампания</dt>
            <dd>{utm || "—"}</dd>
          </div>
          <div>
            <dt>Известие до вас</dt>
            <dd>{NOTIFICATION_LABELS[lead.notificationStatus]}</dd>
          </div>
        </dl>
      </section>

      <form action={setLeadStatusAction} className="adm-card">
        <input type="hidden" name="leadId" value={lead.id} />
        <label htmlFor="adm-status" className="adm-label">
          Статус
        </label>
        <div className="adm-row">
          <select id="adm-status" name="status" className="adm-select" defaultValue={lead.status}>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button className="btn btn--sec" type="submit">
            Запазете
          </button>
        </div>
      </form>

      <section className="adm-sheet" aria-labelledby="adm-conv">
        <div className="adm-head">
          <h2 id="adm-conv" className="adm-h2">
            Разговор по имейл
          </h2>
          {thread && (
            <Link className="adm-back" href={`/admin/poshta/${thread.id}`}>
              Отворете в пощата →
            </Link>
          )}
        </div>
        {thread && thread.messages.length > 0 ? (
          <ul className="adm-msgs">
            {thread.messages.map((m) => (
              <li key={m.id} className="adm-msg" data-direction={m.direction}>
                <div className="adm-msg__head">
                  <b>{m.direction === "in" ? `От ${m.fromAddress}` : "От нас"}</b>
                  <span>{formatWhen(m.createdAt)}</span>
                </div>
                <p className="adm-msg__body">{readableBody(m)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="adm-empty">Още няма разговор по това запитване.</p>
        )}
      </section>

      <ReplyForm
        action={replyLeadAction}
        hidden={{ leadId: lead.id }}
        to={recipient?.address ?? lead.name}
        blocked={blocked}
      />
    </>
  );
}
