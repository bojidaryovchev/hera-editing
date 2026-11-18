import type { Metadata } from "next";
import { NotFoundView } from "@/components/site/NotFoundView";
import { EN_NOT_FOUND } from "@/content/en/pages";
import { EN_NOT_FOUND_TITLE } from "@/content/en/seo";

export const metadata: Metadata = {
  title: EN_NOT_FOUND_TITLE,
  robots: { index: false },
};

/** An /en address that does not exist, or an English page that calls notFound() (/en/work without samples). */
export default function EnNotFound() {
  return <NotFoundView copy={EN_NOT_FOUND} home="/en" />;
}
