import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfig, isSignedIn } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Вход" };

/** Sign in with the one admin password. The panel does not exist (404) until ADMIN_PASSWORD is set. */
export default async function AdminLoginPage() {
  if (!adminConfig()) notFound();
  if (await isSignedIn()) redirect("/admin");
  return (
    <main id="main" className="adm-login">
      <div className="adm-login__box">
        <h1 className="adm-h1">Вход в панела</h1>
        <p className="adm-lead">Запитванията и пощата contact@ на Hera Editing.</p>
        <LoginForm />
      </div>
    </main>
  );
}
