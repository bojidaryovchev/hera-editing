"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/app/(admin)/admin/actions";

const INITIAL: FormState = { tone: null, message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, INITIAL);
  return (
    <form action={action} className="adm-card" aria-busy={pending || undefined}>
      <label htmlFor="adm-pass" className="adm-label">
        Парола
      </label>
      <input
        id="adm-pass"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="adm-input"
        aria-invalid={state.tone === "error" || undefined}
        aria-describedby="adm-pass-msg"
      />
      <p id="adm-pass-msg" className="adm-msgline" data-tone={state.tone ?? undefined} role="status" aria-live="polite">
        {state.message}
      </p>
      <button className="btn btn--pri" type="submit" disabled={pending}>
        Влезте
      </button>
    </form>
  );
}
