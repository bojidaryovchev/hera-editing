import type { Lead } from "@/db/schema";
import { GOAL_LABELS, LEAD_FIELD_LABELS, VOLUME_LABELS } from "@/content/forms";

/** HTML-escape a value for the owner alert (no raw interpolation, ever). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** bg-BG date and 24-hour time in Sofia time: 07.11.2026, 17:42 */
export function formatSofiaDateTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")}.${get("month")}.${get("year")}, ${get("hour")}:${get("minute")}`;
}

export type LeadAlert = { subject: string; text: string; html: string };

export function buildLeadAlert(lead: Lead, options: { brandName: string | null }): LeadAlert {
  const rows: Array<[string, string]> = [
    [LEAD_FIELD_LABELS.name, lead.name],
    [LEAD_FIELD_LABELS.businessName, lead.businessName],
    [LEAD_FIELD_LABELS.city, lead.city],
    [LEAD_FIELD_LABELS.email, lead.email ?? "—"],
    [LEAD_FIELD_LABELS.phone, lead.phone ?? "—"],
    [LEAD_FIELD_LABELS.profileUrl, lead.profileUrl ?? "—"],
    [LEAD_FIELD_LABELS.goal, GOAL_LABELS[lead.goal]],
    [LEAD_FIELD_LABELS.volume, lead.volume ? VOLUME_LABELS[lead.volume] : "—"],
  ];
  const meta: Array<[string, string]> = [
    ["Получено", formatSofiaDateTime(lead.createdAt)],
    ["Страница", lead.sourcePath ?? "—"],
    [
      "Кампания (UTM)",
      [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || "—",
    ],
    ["Номер на запитването", lead.id],
    ["Версия на информацията за поверителност", lead.privacyNoticeVersion],
  ];

  const subject = `Ново запитване: ${lead.businessName}, ${lead.city}`.slice(0, 140);
  const heading = options.brandName ? `Ново запитване за оферта · ${options.brandName}` : "Ново запитване за оферта";

  const text = [
    heading,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `${LEAD_FIELD_LABELS.message}:`,
    lead.message ?? "—",
    "",
    ...meta.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const row = ([k, v]: [string, string]) =>
    `<tr><th align="left" style="padding:6px 16px 6px 0;color:#5B6265;font-weight:600;vertical-align:top">${escapeHtml(k)}</th><td style="padding:6px 0;color:#13191C">${escapeHtml(v)}</td></tr>`;

  const html = `<!doctype html><html lang="bg"><body style="margin:0;padding:24px;background:#F7F6F2;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#13191C">
<h1 style="margin:0 0 16px;font-size:20px">${escapeHtml(heading)}</h1>
<table role="presentation" cellspacing="0" cellpadding="0">${rows.map(row).join("")}</table>
<h2 style="margin:20px 0 6px;font-size:15px">${escapeHtml(LEAD_FIELD_LABELS.message)}</h2>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.message ?? "—")}</p>
<table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:20px;font-size:13px">${meta.map(row).join("")}</table>
</body></html>`;

  return { subject, text, html };
}
