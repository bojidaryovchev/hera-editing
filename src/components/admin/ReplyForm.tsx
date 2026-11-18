"use client";

import { useActionState, useEffect, useRef } from "react";
import type { FormState } from "@/app/(admin)/admin/actions";

const INITIAL: FormState = { tone: null, message: "" };

/**
 * The answer box under a conversation or an enquiry. It says up front when an answer cannot leave (mail not switched
 * on, or a sender that is not one clear address), rather than after the owner has typed it.
 */
export function ReplyForm({
  action,
  hidden,
  to,
  blocked,
}: {
  action: (prev: FormState, form: FormData) => Promise<FormState>;
  hidden: Record<string, string>;
  to: string;
  blocked?: string | null;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.tone === "ok") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="adm-card" aria-busy={pending || undefined}>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label htmlFor="adm-reply" className="adm-label">
        Отговор до {to}
      </label>
      <textarea
        id="adm-reply"
        name="body"
        className="adm-area"
        required
        maxLength={10_000}
        disabled={Boolean(blocked)}
        aria-describedby="adm-reply-msg"
      />
      <p
        id="adm-reply-msg"
        className="adm-msgline"
        data-tone={state.tone ?? (blocked ? "error" : undefined)}
        role="status"
        aria-live="polite"
      >
        {state.message || blocked || "Тръгва от адреса contact@, с подпис под текста."}
      </p>
      <div className="adm-row">
        <button className="btn btn--pri" type="submit" disabled={pending || Boolean(blocked)}>
          Изпратете отговора
        </button>
      </div>
    </form>
  );
}
