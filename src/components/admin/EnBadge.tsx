import { ORDER_LABELS } from "@/content/admin-orders";

/** The "EN" mark before an English order's name (decision L38), with the space after it read as a pause. */
export function EnBadge() {
  return (
    <>
      <abbr className="adm-badge" title={ORDER_LABELS.badgeLabel}>
        {ORDER_LABELS.badge}
      </abbr>{" "}
    </>
  );
}
