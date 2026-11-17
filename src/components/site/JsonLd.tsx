import { jsonLdString, type Thing } from "@/lib/site/structured-data";

/** Structured data for search engines. A data block, never executed, so the CSP's script rules do not apply. */
export function JsonLd({ data }: { data: Thing }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(data) }} />;
}
