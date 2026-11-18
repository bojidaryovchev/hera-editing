/** How the admin panel writes dates, sizes and the owner-alert state: Bulgarian, Sofia time. */

const WHEN = new Intl.DateTimeFormat("bg-BG", {
  timeZone: "Europe/Sofia",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatWhen = (d: Date): string => WHEN.format(d);

export const kilobytes = (bytes: number): string =>
  bytes < 1_000_000 ? `${Math.max(1, Math.round(bytes / 1000))} KB` : `${(bytes / 1_000_000).toFixed(1)} MB`;

export const NOTIFICATION_LABELS: Record<"pending" | "sent" | "failed" | "suppressed", string> = {
  pending: "чака изпращане",
  sent: "изпратено",
  failed: "неуспешно",
  suppressed: "спряно (вероятен спам)",
};

/** The form fields a server action reads, never trusted beyond being a short string. */
export const field = (form: FormData, name: string, max = 64): string => {
  const value = form.get(name);
  return typeof value === "string" ? value.slice(0, max) : "";
};
