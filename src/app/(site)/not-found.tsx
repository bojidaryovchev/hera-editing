import type { Metadata } from "next";
import { NotFoundView } from "@/components/site/NotFoundView";
import { NOT_FOUND_TITLE } from "@/content/seo";

export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
  robots: { index: false },
};

/** A page inside the site that calls notFound() (an unpublished case study, say). Next.js answers with status 404. */
export default function NotFound() {
  return <NotFoundView />;
}
