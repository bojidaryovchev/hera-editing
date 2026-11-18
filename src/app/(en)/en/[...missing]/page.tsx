import { notFound } from "next/navigation";

/**
 * Any /en address without a page of its own: the English 404 (app/(en)/not-found.tsx), inside the English layout.
 * Without this route an unknown /en address would match nothing and get the Bulgarian global 404.
 */
export default function MissingEnPage() {
  notFound();
}
