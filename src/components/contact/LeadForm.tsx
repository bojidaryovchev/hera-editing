"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, useWatch, type FieldErrors, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";
import { submitLeadAction } from "@/app/kontakti/actions";
import { TurnstileField } from "@/components/contact/TurnstileField";
import { Check } from "@/components/icons";
import { CONTACT, checkFields, summaryCount } from "@/content/contact";
import { GOAL_LABELS, LEAD_FIELD_LABELS, LEAD_FORM_STATUS, VOLUME_LABELS, leadErrorMessage, leadErrorShort } from "@/content/forms";
import {
  EMPTY_LEAD_FORM,
  HIDDEN,
  INITIAL_LEAD_STATE,
  LEAD_FORM_FIELDS,
  splitErrors,
  type LeadActionState,
  type LeadFormField,
  type LeadFormValues,
} from "@/lib/leads/form";
import { track } from "@/lib/analytics";
import { route } from "@/lib/site/nav";
import { GOALS, LEAD_LIMITS, VOLUMES, leadFormSchema, type LeadErrorCode } from "@/lib/validation/lead";

/*
 * The quote request (website/03, decisions L5, L6, L13). React Hook Form validates in the browser with the same Zod
 * rules the server uses (leadFormSchema); the server action runs the durable pipeline. Without script the same form
 * posts to the same server action and the page renders the result.
 * No layout shift: every field has a fixed one-line message slot (hint or error), errors have one-line short forms
 * for narrow fields, the submit button keeps its width, the success panel keeps the form's height.
 */

type Props = {
  requestId: string;
  sourcePath: string;
  utm: { source: string; medium: string; campaign: string };
  defaultVolume: string;
  /** Cloudflare Turnstile's public key, only when Turnstile is configured. */
  turnstileSiteKey?: string | null;
};

const resolver = zodResolver(leadFormSchema) as unknown as Resolver<LeadFormValues>;
const TOAST_ID = "lead-form";
/** How many things to fix: email and phone missing together is one problem (reach us somehow), not two. */
function problemCount(codes: Partial<Record<LeadFormField, LeadErrorCode | undefined>>): number {
  const names = LEAD_FORM_FIELDS.filter((f) => codes[f]);
  const pair = codes.email === "contact_required" && codes.phone === "contact_required" ? 1 : 0;
  return names.length - pair;
}
const subscribeNever = () => () => {};
const codeOf = (message: unknown): LeadErrorCode | undefined => (typeof message === "string" && message ? (message as LeadErrorCode) : undefined);

/** The message slot under a field: the hint, or the error in place of the hint (one line, never wraps). */
function Slot({ id, field, code, hint, aside }: { id: string; field: LeadFormField; code?: LeadErrorCode; hint?: ReactNode; aside?: ReactNode }) {
  return (
    <p id={id} className="lf__msg" data-error={code ? "" : undefined}>
      <span className="lf__msgtext">
        {code ? (
          <>
            <span className="m-long">{leadErrorMessage(field, code)}</span>
            <span className="m-short">{leadErrorShort(field, code)}</span>
          </>
        ) : (
          hint
        )}
      </span>
      {aside}
    </p>
  );
}

/** What was sent, so the visitor can check it at a glance. */
function Summary({ values }: { values: LeadFormValues }) {
  const contact = [values.email, values.phone].filter(Boolean).join(" · ");
  const rows: Array<[string, string]> = [
    [LEAD_FIELD_LABELS.name, values.name],
    [LEAD_FIELD_LABELS.businessName, values.businessName],
    [LEAD_FIELD_LABELS.city, values.city],
    [CONTACT.form.contactLegend, contact],
    [LEAD_FIELD_LABELS.goal, GOAL_LABELS[values.goal as keyof typeof GOAL_LABELS] ?? ""],
    [LEAD_FIELD_LABELS.volume, VOLUME_LABELS[values.volume as keyof typeof VOLUME_LABELS] ?? ""],
  ];
  return (
    <section className="lf__sum" aria-labelledby="lf-sum-h">
      <h3 id="lf-sum-h">{CONTACT.form.summaryTitle}</h3>
      <dl>
        {rows
          .filter(([, v]) => v.trim())
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
    </section>
  );
}

export function LeadForm({ requestId, sourcePath, utm, defaultVolume, turnstileSiteKey = null }: Props) {
  // Without script the form posts to formAction and the server renders `serverState`; with script the action is
  // called directly (so a network failure can be handled) and the result kept in `state`.
  const [serverState, formAction] = useActionState(submitLeadAction, INITIAL_LEAD_STATE);
  const [state, setState] = useState<LeadActionState>(serverState);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const handled = useRef(0);

  const initial: LeadFormValues = "values" in serverState ? serverState.values : { ...EMPTY_LEAD_FORM, volume: defaultVolume };
  const {
    register,
    handleSubmit,
    setError,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ resolver, defaultValues: initial, mode: "onTouched", reValidateMode: "onChange", shouldFocusError: true });

  // False in the server render and while hydrating, true once the form runs in the browser.
  const hydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  // Analytics (only with consent): the form was shown. Codes only, never what was typed.
  useEffect(() => track({ name: "lead_form_view" }), []);

  // React to a server result once: field errors into the form, everything else as a notification.
  useEffect(() => {
    if (state.seq === 0 || state.seq === handled.current) return;
    handled.current = state.seq;
    if (state.status !== "idle")
      track(state.status === "success" ? { name: "lead_form_success" } : { name: "lead_form_error", params: { code: state.status } });
    if (state.status === "success") {
      toast.success(CONTACT.form.sentToast, { id: TOAST_ID });
      requestAnimationFrame(() => doneRef.current?.focus());
      return;
    }
    if (state.status === "invalid") {
      const { fields, request } = splitErrors(state.errors);
      const names = Object.keys(fields) as LeadFormField[];
      names.forEach((name, i) => setError(name, { type: "server", message: fields[name] }, { shouldFocus: i === 0 }));
      if (request && names.length === 0) toast.error(LEAD_FORM_STATUS.invalidRequest, { id: TOAST_ID, duration: 9000 });
      else toast.error(`${CONTACT.form.summaryHeading}. ${checkFields(problemCount(fields))}`, { id: TOAST_ID });
      return;
    }
    const message = state.status === "rate_limited" ? LEAD_FORM_STATUS.rateLimited : LEAD_FORM_STATUS.error;
    toast.error(message, { id: TOAST_ID, duration: 10000 });
  }, [state, setError]);

  const busy = isSubmitting;
  const onValid = async () => {
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    track({ name: "lead_form_attempt" });
    try {
      const result = await submitLeadAction(state, fd);
      setState(result);
    } catch {
      // The request never reached the pipeline (offline, timeout): keep everything typed and say so.
      setState((s) => ({ status: "unavailable", seq: s.seq + 1, values: getValues() }));
    }
  };
  const onInvalid = (errs: FieldErrors<LeadFormValues>) => {
    const codes = Object.fromEntries(LEAD_FORM_FIELDS.map((f) => [f, codeOf(errs[f]?.message)])) as Partial<Record<LeadFormField, LeadErrorCode | undefined>>;
    const n = problemCount(codes);
    track({ name: "lead_form_error", params: { code: "invalid_client" } });
    toast.error(`${CONTACT.form.summaryHeading}. ${checkFields(n)}`, { id: TOAST_ID });
  };

  // Errors: from the form once it runs; before that (no script) from the server's answer.
  const serverErrors = state.status === "invalid" ? splitErrors(state.errors).fields : {};
  const err = (f: LeadFormField): LeadErrorCode | undefined => codeOf(errors[f]?.message) ?? (hydrated ? undefined : serverErrors[f]);
  const contactMissing = err("email") === "contact_required" || err("phone") === "contact_required";
  const message = useWatch({ control, name: "message" }) ?? "";

  if (state.status === "success") {
    return (
      <div className="lf__card">
        <p className="lf__bar" aria-hidden="true">
          <span>
            <i className="dot" />
            {CONTACT.form.window}
          </span>
        </p>
        <div className="lf__done" role="status">
          <span className="lf__tick" aria-hidden="true">
            <Check />
          </span>
          <h2 ref={doneRef} tabIndex={-1}>
            {CONTACT.form.successHeading}
          </h2>
          <p>{LEAD_FORM_STATUS.success}</p>
          <Summary values={state.values} />
          <div className="actions">
            <Link className="btn btn--pri" href="/">
              {CONTACT.form.successBackHome}
            </Link>
            <Link className="btn btn--sec" href={route("/kontakti")}>
              {CONTACT.form.sendAnother}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Without script there is no toast: the server's answer is shown at the top of the form instead.
  const staticNotice =
    !hydrated && state.status !== "idle"
      ? state.status === "invalid"
        ? `${CONTACT.form.summaryHeading}. ${summaryCount(problemCount(splitErrors(state.errors).fields)).replace(/:$/, ".")}`
        : state.status === "rate_limited"
          ? LEAD_FORM_STATUS.rateLimited
          : LEAD_FORM_STATUS.error
      : null;

  const field = (
    name: Exclude<LeadFormField, "goal" | "volume" | "message">,
    opts: {
      type?: string;
      autoComplete?: string;
      inputMode?: "email" | "tel" | "url" | "text";
      optional?: boolean;
      max: number;
      /** Fields in a group share the group's one message line instead of their own. */
      inGroup?: string;
    },
  ) => {
    const id = `lf-${name}`;
    const code = name === "email" || name === "phone" ? (contactMissing ? undefined : err(name)) : err(name);
    const msgId = opts.inGroup ?? `${id}-msg`;
    return (
      <div className="lf__field">
        <label className="lf__label" htmlFor={id}>
          {LEAD_FIELD_LABELS[name]}
        </label>
        <input
          id={id}
          className="lf__input"
          type={opts.type ?? "text"}
          autoComplete={opts.autoComplete}
          inputMode={opts.inputMode}
          maxLength={opts.max}
          spellCheck={name === "profileUrl" ? false : undefined}
          autoCapitalize={name === "profileUrl" || name === "email" ? "none" : undefined}
          aria-invalid={code || (contactMissing && (name === "email" || name === "phone")) ? true : undefined}
          aria-describedby={msgId}
          defaultValue={initial[name]}
          {...register(name, name === "email" ? { deps: ["phone"] } : name === "phone" ? { deps: ["email"] } : undefined)}
        />
        {!opts.inGroup && <Slot id={msgId} field={name} code={code} hint={opts.optional ? CONTACT.form.optionalHint : undefined} />}
      </div>
    );
  };
  // The contact pair has one message line: "reach us somehow" first, then a bad email, then a bad phone.
  const contactField: LeadFormField = contactMissing || err("email") ? "email" : "phone";
  const contactCode = contactMissing ? "contact_required" : (err("email") ?? err("phone"));

  const chips = (name: "goal" | "volume", values: readonly string[], labels: Record<string, string>, hint?: string) => {
    const id = `lf-${name}`;
    const code = err(name);
    return (
      <fieldset className="lf__group lf__span" role="radiogroup" data-invalid={code ? "" : undefined} aria-invalid={code ? true : undefined} aria-describedby={`${id}-msg`}>
        <legend className="lf__legend">{LEAD_FIELD_LABELS[name]}</legend>
        <div className="lf__chips">
          {values.map((v) => (
            <label key={v} className="lf__chip">
              <input type="radio" value={v} defaultChecked={initial[name] === v} {...register(name)} />
              <span>{labels[v]}</span>
            </label>
          ))}
        </div>
        <Slot id={`${id}-msg`} field={name} code={code} hint={hint} />
      </fieldset>
    );
  };

  return (
    <div className="lf__card">
      <p className="lf__bar" aria-hidden="true">
        <span>
          <i className="dot" />
          {CONTACT.form.window}
        </span>
      </p>
      <form ref={formRef} className="lf" action={formAction} onSubmit={(e) => handleSubmit(onValid, onInvalid)(e)} noValidate aria-label={CONTACT.form.label} aria-busy={busy || undefined}>
        {staticNotice && (
          <p className="lf__status" role="alert">
            {staticNotice}
          </p>
        )}
        <div className="lf__grid">
          {field("name", { autoComplete: "name", max: LEAD_LIMITS.name.max })}
          {field("businessName", { autoComplete: "organization", max: LEAD_LIMITS.businessName.max })}
          {field("city", { autoComplete: "address-level2", max: LEAD_LIMITS.city.max })}
          {field("profileUrl", { autoComplete: "url", inputMode: "url", optional: true, max: LEAD_LIMITS.profileUrl.max })}

          <fieldset className="lf__group lf__span" aria-describedby="lf-contact-msg">
            <legend className="lf__legend">{CONTACT.form.contactLegend}</legend>
            <div className="lf__pair">
              {field("email", { type: "email", autoComplete: "email", inputMode: "email", max: LEAD_LIMITS.email.max, inGroup: "lf-contact-msg" })}
              {field("phone", { type: "tel", autoComplete: "tel", inputMode: "tel", max: LEAD_LIMITS.phone.max, inGroup: "lf-contact-msg" })}
            </div>
            <Slot id="lf-contact-msg" field={contactField} code={contactCode} hint={CONTACT.form.contactHint} />
          </fieldset>

          {chips("goal", GOALS, GOAL_LABELS)}
          {chips("volume", VOLUMES, VOLUME_LABELS, `${CONTACT.form.optionalHint} ${CONTACT.form.volumeHint}`)}

          <div className="lf__field lf__span">
            <label className="lf__label" htmlFor="lf-message">
              {LEAD_FIELD_LABELS.message}
            </label>
            <textarea
              id="lf-message"
              className="lf__input lf__area"
              rows={4}
              maxLength={LEAD_LIMITS.message.max}
              placeholder={CONTACT.form.messagePlaceholderHint}
              aria-invalid={err("message") ? true : undefined}
              aria-describedby="lf-message-msg"
              defaultValue={initial.message}
              {...register("message")}
            />
            <Slot
              id="lf-message-msg"
              field="message"
              code={err("message")}
              hint={CONTACT.form.optionalHint}
              aside={
                <span className="lf__count" aria-hidden="true">
                  {message.length} / {LEAD_LIMITS.message.max}
                </span>
              }
            />
          </div>
        </div>

        <input type="hidden" name={HIDDEN.requestId} value={requestId} />
        <input type="hidden" name={HIDDEN.sourcePath} value={sourcePath} />
        <input type="hidden" name={HIDDEN.utmSource} value={utm.source} />
        <input type="hidden" name={HIDDEN.utmMedium} value={utm.medium} />
        <input type="hidden" name={HIDDEN.utmCampaign} value={utm.campaign} />
        <input type="hidden" name={HIDDEN.privacy} value="true" />
        <input type="hidden" name={HIDDEN.locale} value="bg" />
        <div className="lf__hp" aria-hidden="true">
          <label htmlFor="lf-hp">{CONTACT.form.honeypotLabel}</label>
          <input id="lf-hp" name={HIDDEN.honeypot} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        {turnstileSiteKey && <TurnstileField siteKey={turnstileSiteKey} resetKey={state.seq} />}

        <div className="lf__foot">
          <p className="lf__privacy">
            {CONTACT.form.privacyBefore}{" "}
            <Link href={route("/poveritelnost")}>{CONTACT.form.privacyLink}</Link>.
          </p>
          <button type="submit" className="btn btn--pri lf__submit" disabled={busy} data-busy={busy ? "true" : "false"}>
            <span className="is-idle" aria-hidden={busy}>
              {CONTACT.form.submit}
            </span>
            <span className="is-busy" aria-hidden={!busy}>
              {CONTACT.form.submitting}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
