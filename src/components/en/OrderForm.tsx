"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { useForm, useWatch, type FieldErrors, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";
import { submitOrderAction } from "@/app/(en)/en/order/actions";
import { TurnstileField } from "@/components/contact/TurnstileField";
import { Check } from "@/components/icons";
import { EN_ORDER, checkFieldsEn, orderErrorMessage, orderErrorShort } from "@/content/en/order";
import {
  AI_CHOICES,
  CUSTOM_PACKAGE,
  MUSIC_CHOICES,
  ORDER_LIMITS,
  VERSION_CHOICES,
  isEuBlocked,
  type OrderField,
} from "@/lib/en/order-fields";
import {
  EMPTY_ORDER_FORM,
  INITIAL_ORDER_STATE,
  ORDER_FORM_FIELDS,
  ORDER_HIDDEN,
  splitOrderErrors,
  type OrderActionState,
  type OrderFormValues,
} from "@/lib/leads/order-form";
import { track } from "@/lib/analytics";
import { route } from "@/lib/site/nav";
import type { OrderErrorCode } from "@/lib/validation/order";

/*
 * The English order and brief (decision L38; the sales kit's fields, §5), built like the Bulgarian quote form
 * (decisions L6, L25): React Hook Form validates with the server's own rules (orderFormSchema), loaded on the
 * visitor's first touch of the form; the server action runs the durable pipeline; without script the same form posts
 * to the same action. Fixed one-line message slots, so errors never move the form. The questions for one niche
 * appear when a package of that niche is chosen (CSS :has on the chosen option, so this works without script too),
 * and the server ignores whatever does not belong to the chosen package.
 */

export type PackageOption = { value: string; label: string; niche: string | null };
export type PackageGroup = { label: string; options: readonly PackageOption[] };
export type CountryOption = { code: string; name: string };

type Props = {
  requestId: string;
  sourcePath: string;
  utm: { source: string; medium: string; campaign: string };
  defaultPackage: string;
  groups: readonly PackageGroup[];
  countries: readonly CountryOption[];
  /** Whether businesses in other EU states may order (EN_EU_ORDERS); the server applies the same rule. */
  euOrders: boolean;
  turnstileSiteKey?: string | null;
};

const F = EN_ORDER.form;

let rules: { eu: boolean; resolver: Promise<Resolver<OrderFormValues>> } | undefined;
const loadRules = (eu: boolean) => {
  if (!rules || rules.eu !== eu)
    rules = {
      eu,
      resolver: Promise.all([import("@hookform/resolvers/zod"), import("@/lib/validation/order")]).then(
        ([{ zodResolver }, { orderFormSchema }]) =>
          zodResolver(orderFormSchema({ euOrders: eu }) as never) as unknown as Resolver<OrderFormValues>,
      ),
    };
  return rules.resolver;
};

const TOAST_ID = "order-form";
const codeOf = (message: unknown): OrderErrorCode | undefined =>
  typeof message === "string" && message ? (message as OrderErrorCode) : undefined;
const countProblems = (codes: Partial<Record<OrderField, OrderErrorCode | undefined>>) =>
  ORDER_FORM_FIELDS.filter((f) => codes[f]).length;

/** The message slot under a field: the hint, or the error in place of the hint (one line, never wraps). */
function Slot({ id, field, code, hint }: { id: string; field: OrderField; code?: OrderErrorCode; hint?: ReactNode }) {
  return (
    <p id={id} className="lf__msg" data-error={code ? "" : undefined}>
      <span className="lf__msgtext">
        {code ? (
          <>
            <span className="m-long">{orderErrorMessage(field, code)}</span>
            <span className="m-short">{orderErrorShort(field, code)}</span>
          </>
        ) : (
          hint
        )}
      </span>
    </p>
  );
}

/** What was sent, so the client can check it at a glance. */
function Summary({
  values,
  groups,
  countries,
}: {
  values: OrderFormValues;
  groups: Props["groups"];
  countries: Props["countries"];
}) {
  const pkg =
    values.package === CUSTOM_PACKAGE
      ? F.customOption
      : (groups.flatMap((g) => g.options).find((o) => o.value === values.package)?.label ?? "");
  const rows: Array<[string, string]> = [
    [F.labels.package, pkg],
    [F.labels.name, values.name],
    [F.labels.businessName, values.businessName],
    [F.labels.email, values.email],
    [F.labels.country, countries.find((c) => c.code === values.country)?.name ?? ""],
  ];
  return (
    <section className="lf__sum" aria-labelledby="of-sum-h">
      <h3 id="of-sum-h">{F.summaryTitle}</h3>
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

export function OrderForm({
  requestId,
  sourcePath,
  utm,
  defaultPackage,
  groups,
  countries,
  euOrders,
  turnstileSiteKey = null,
}: Props) {
  const [serverState, formAction] = useActionState(submitOrderAction, INITIAL_ORDER_STATE);
  const [state, setState] = useState<OrderActionState>(serverState);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const handled = useRef(0);

  const resolver: Resolver<OrderFormValues> = async (values, context, options) => {
    try {
      return await (
        await loadRules(euOrders)
      )(values, context, options);
    } catch {
      rules = undefined;
      return { values, errors: {} };
    }
  };
  const warmRules = () => void loadRules(euOrders).catch(() => (rules = undefined));

  const initial: OrderFormValues =
    "values" in serverState ? serverState.values : { ...EMPTY_ORDER_FORM, package: defaultPackage };
  const {
    register,
    handleSubmit,
    setError,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver,
    defaultValues: initial,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  // False in the server render and while hydrating, true once the form runs in the browser (as in LeadForm).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => startTransition(() => setHydrated(true)));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => track({ name: "lead_form_view" }), []);

  useEffect(() => {
    if (state.seq === 0 || state.seq === handled.current) return;
    handled.current = state.seq;
    if (state.status !== "idle")
      track(
        state.status === "success"
          ? { name: "lead_form_success" }
          : { name: "lead_form_error", params: { code: state.status } },
      );
    if (state.status === "success") {
      toast.success(F.sentToast, { id: TOAST_ID });
      requestAnimationFrame(() => doneRef.current?.focus());
      return;
    }
    if (state.status === "invalid") {
      const { fields, request } = splitOrderErrors(state.errors);
      const names = Object.keys(fields) as OrderField[];
      names.forEach((name, i) => setError(name, { type: "server", message: fields[name] }, { shouldFocus: i === 0 }));
      if (request && names.length === 0) toast.error(EN_ORDER.status.invalidRequest, { id: TOAST_ID, duration: 9000 });
      else toast.error(`${F.summaryHeading}. ${checkFieldsEn(names.length)}`, { id: TOAST_ID });
      return;
    }
    const message = state.status === "rate_limited" ? EN_ORDER.status.rateLimited : EN_ORDER.status.error;
    toast.error(message, { id: TOAST_ID, duration: 10000 });
  }, [state, setError]);

  const busy = isSubmitting;
  const onValid = async () => {
    const form = formRef.current;
    if (!form) return;
    const fd = new FormData(form);
    track({ name: "lead_form_attempt" });
    try {
      setState(await submitOrderAction(state, fd));
    } catch {
      setState((s) => ({ status: "unavailable", seq: s.seq + 1, values: getValues() }));
    }
  };
  const onInvalid = (errs: FieldErrors<OrderFormValues>) => {
    const codes = Object.fromEntries(ORDER_FORM_FIELDS.map((f) => [f, codeOf(errs[f]?.message)])) as Partial<
      Record<OrderField, OrderErrorCode | undefined>
    >;
    track({ name: "lead_form_error", params: { code: "invalid_client" } });
    toast.error(`${F.summaryHeading}. ${checkFieldsEn(countProblems(codes))}`, { id: TOAST_ID });
  };

  const serverErrors = state.status === "invalid" ? splitOrderErrors(state.errors).fields : {};
  const err = (f: OrderField): OrderErrorCode | undefined =>
    codeOf(errors[f]?.message) ?? (hydrated ? undefined : serverErrors[f]);
  const country = useWatch({ control, name: "country" }) ?? initial.country;
  const euBlocked = Boolean(country) && isEuBlocked(country, euOrders);

  if (state.status === "success") {
    return (
      <div className="lf__card">
        <p className="lf__bar" aria-hidden="true">
          <span>
            <i className="dot" />
            {F.window}
          </span>
        </p>
        <div className="lf__done" role="status">
          <span className="lf__tick" aria-hidden="true">
            <Check />
          </span>
          <h2 ref={doneRef} tabIndex={-1}>
            {F.successHeading}
          </h2>
          <p>{F.successText}</p>
          <Summary values={state.values} groups={groups} countries={countries} />
          <div className="actions">
            <Link className="btn btn--pri" href={route("/en")}>
              {F.backHome}
            </Link>
            <Link className="btn btn--sec" href={route("/en/order")}>
              {F.sendAnother}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const staticNotice =
    !hydrated && state.status !== "idle"
      ? state.status === "invalid"
        ? `${F.summaryHeading}. ${checkFieldsEn(Object.keys(splitOrderErrors(state.errors).fields).length)}`
        : state.status === "rate_limited"
          ? EN_ORDER.status.rateLimited
          : EN_ORDER.status.error
      : null;

  const input = (
    name: OrderField,
    opts: {
      type?: string;
      autoComplete?: string;
      inputMode?: "email" | "url" | "text";
      max: number;
      hint?: string;
      span?: boolean;
      url?: boolean;
    },
  ) => {
    const id = `of-${name}`;
    const code = err(name);
    return (
      <div className={`lf__field${opts.span ? " lf__span" : ""}`}>
        <label className="lf__label" htmlFor={id}>
          {F.labels[name]}
        </label>
        <input
          id={id}
          className="lf__input"
          type={opts.type ?? "text"}
          autoComplete={opts.autoComplete ?? (opts.url ? "url" : undefined)}
          inputMode={opts.inputMode ?? (opts.url ? "url" : undefined)}
          maxLength={opts.type === "date" ? undefined : opts.max}
          spellCheck={opts.url || name === "email" ? false : undefined}
          autoCapitalize={opts.url || name === "email" ? "none" : undefined}
          aria-invalid={code ? true : undefined}
          aria-describedby={`${id}-msg`}
          defaultValue={initial[name]}
          {...register(name)}
        />
        <Slot id={`${id}-msg`} field={name} code={code} hint={opts.hint} />
      </div>
    );
  };

  const area = (name: OrderField, max: number, hint: string = F.hints.optional, placeholder?: string) => {
    const id = `of-${name}`;
    const code = err(name);
    return (
      <div className="lf__field lf__span">
        <label className="lf__label" htmlFor={id}>
          {F.labels[name]}
        </label>
        <textarea
          id={id}
          className="lf__input lf__area of__area"
          rows={3}
          maxLength={max}
          placeholder={placeholder}
          aria-invalid={code ? true : undefined}
          aria-describedby={`${id}-msg`}
          defaultValue={initial[name]}
          {...register(name)}
        />
        <Slot id={`${id}-msg`} field={name} code={code} hint={hint} />
      </div>
    );
  };

  const choice = (
    name: "music" | "aiVisuals" | "versions",
    values: readonly string[],
    labels: Record<string, string>,
    opts: { stacked?: boolean; hint?: string } = {},
  ) => {
    const id = `of-${name}`;
    const code = err(name);
    return (
      <fieldset
        className={`lf__group${opts.stacked ? " lf__span" : ""}`}
        role="radiogroup"
        data-invalid={code ? "" : undefined}
        aria-invalid={code ? true : undefined}
        aria-describedby={`${id}-msg`}
      >
        <legend className="lf__legend">{F.labels[name]}</legend>
        <div className={opts.stacked ? "of__options" : "lf__chips"}>
          {values.map((v) => (
            <label key={v} className={opts.stacked ? "of__option" : "lf__chip"}>
              <input type="radio" value={v} defaultChecked={initial[name] === v} {...register(name)} />
              <span>{labels[v]}</span>
            </label>
          ))}
        </div>
        <Slot id={`${id}-msg`} field={name} code={code} hint={opts.hint} />
      </fieldset>
    );
  };

  const select = (name: "package" | "country", children: ReactNode, hint?: string) => {
    const id = `of-${name}`;
    const code = err(name);
    return (
      <div className="lf__field lf__span">
        <label className="lf__label" htmlFor={id}>
          {F.labels[name]}
        </label>
        <select
          id={id}
          className="lf__input of__select"
          aria-invalid={code ? true : undefined}
          aria-describedby={`${id}-msg`}
          defaultValue={initial[name]}
          {...register(name)}
        >
          {children}
        </select>
        <Slot id={`${id}-msg`} field={name} code={code} hint={hint} />
      </div>
    );
  };

  const businessCode = err("businessConfirmed");
  return (
    <div className="lf__card">
      <p className="lf__bar" aria-hidden="true">
        <span>
          <i className="dot" />
          {F.window}
        </span>
      </p>
      <form
        ref={formRef}
        className="lf of"
        action={formAction}
        onSubmit={(e) => handleSubmit(onValid, onInvalid)(e)}
        onFocus={warmRules}
        onPointerDown={warmRules}
        noValidate
        aria-label={F.label}
        aria-busy={busy || undefined}
      >
        {staticNotice && (
          <p className="lf__status" role="alert">
            {staticNotice}
          </p>
        )}

        <fieldset className="of__part">
          <legend className="of__h">{F.groups.package}</legend>
          <div className="lf__grid">
            {select(
              "package",
              <>
                <option value="">{F.choosePackage}</option>
                {groups.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.options.map((o) => (
                      <option key={o.value} value={o.value} data-niche={o.niche ?? undefined}>
                        {o.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label={F.customGroup}>
                  <option value={CUSTOM_PACKAGE}>{F.customOption}</option>
                </optgroup>
              </>,
              F.hints.package,
            )}
          </div>
        </fieldset>

        <fieldset className="of__part">
          <legend className="of__h">{F.groups.you}</legend>
          <div className="lf__grid">
            {input("name", { autoComplete: "name", max: ORDER_LIMITS.name.max })}
            {input("businessName", { autoComplete: "organization", max: ORDER_LIMITS.businessName.max })}
            {input("email", {
              type: "email",
              autoComplete: "email",
              inputMode: "email",
              max: ORDER_LIMITS.email.max,
              hint: F.hints.email,
            })}
            {input("vatNumber", { max: ORDER_LIMITS.vatNumber.max, hint: F.hints.vatNumber })}
            {select(
              "country",
              <>
                <option value="">{F.chooseCountry}</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </>,
            )}
            <p className="of__eu lf__span" role="status">
              {euBlocked ? (
                <span>
                  <b>{F.euNotice}</b> {F.euNoticeMore}
                </span>
              ) : null}
            </p>
            <div className="of__check lf__span" data-invalid={businessCode ? "" : undefined}>
              <label htmlFor="of-businessConfirmed">
                <input
                  id="of-businessConfirmed"
                  type="checkbox"
                  value="true"
                  defaultChecked={initial.businessConfirmed === "true"}
                  aria-invalid={businessCode ? true : undefined}
                  aria-describedby="of-businessConfirmed-msg"
                  {...register("businessConfirmed")}
                />
                <span>{F.labels.businessConfirmed}</span>
              </label>
              <Slot id="of-businessConfirmed-msg" field="businessConfirmed" code={businessCode} />
            </div>
          </div>
        </fieldset>

        <fieldset className="of__part">
          <legend className="of__h">{F.groups.brief}</legend>
          <div className="lf__grid">
            {input("footageUrl", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.footageUrl, span: true })}
            {input("deadline", { type: "date", max: 10, hint: F.hints.deadline })}
            {choice("aiVisuals", AI_CHOICES, F.choices.aiVisuals)}
            {choice("music", MUSIC_CHOICES, F.choices.music, { stacked: true })}
            {area("references", ORDER_LIMITS.text.max, F.hints.references, F.placeholders.references)}
            {area("mustInclude", ORDER_LIMITS.text.max)}
          </div>
        </fieldset>

        <fieldset className="of__part of__niche of__niche--wedding">
          <legend className="of__h">{F.groups.wedding}</legend>
          <div className="lf__grid">
            {input("couple", { max: ORDER_LIMITS.line.max, hint: F.hints.optional })}
            {input("grade", { max: ORDER_LIMITS.line.max, hint: F.hints.optional })}
            {input("vowsAudio", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {input("styleFilm", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {area("keyMoments", ORDER_LIMITS.text.max)}
          </div>
        </fieldset>

        <fieldset className="of__part of__niche of__niche--youtube">
          <legend className="of__h">{F.groups.youtube}</legend>
          <div className="lf__grid">
            {input("script", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {input("voiceover", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {input("channel", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {input("stockLibrary", { max: ORDER_LIMITS.line.max, hint: F.hints.optional })}
          </div>
        </fieldset>

        <fieldset className="of__part of__niche of__niche--real-estate">
          <legend className="of__h">{F.groups.realEstate}</legend>
          <div className="lf__grid">
            {input("listing", { max: ORDER_LIMITS.line.max, hint: F.hints.optional })}
            {input("branding", { url: true, max: ORDER_LIMITS.url.max, hint: F.hints.link })}
            {choice("versions", VERSION_CHOICES, F.choices.versions, { stacked: false, hint: F.hints.optional })}
            {area("roomOrder", ORDER_LIMITS.text.max)}
          </div>
        </fieldset>

        <fieldset className="of__part of__custom">
          <legend className="of__h">{F.groups.custom}</legend>
          <div className="lf__grid">{area("scope", ORDER_LIMITS.scope.max, F.hints.scope, F.placeholders.scope)}</div>
        </fieldset>

        <input type="hidden" name={ORDER_HIDDEN.requestId} value={requestId} />
        <input type="hidden" name={ORDER_HIDDEN.sourcePath} value={sourcePath} />
        <input type="hidden" name={ORDER_HIDDEN.utmSource} value={utm.source} />
        <input type="hidden" name={ORDER_HIDDEN.utmMedium} value={utm.medium} />
        <input type="hidden" name={ORDER_HIDDEN.utmCampaign} value={utm.campaign} />
        <input type="hidden" name={ORDER_HIDDEN.privacy} value="true" />
        <input type="hidden" name={ORDER_HIDDEN.locale} value="en" />
        <div className="lf__hp" aria-hidden="true">
          <label htmlFor="of-hp">{F.honeypotLabel}</label>
          <input id="of-hp" name={ORDER_HIDDEN.honeypot} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        {turnstileSiteKey && <TurnstileField siteKey={turnstileSiteKey} resetKey={state.seq} language="en" />}

        <div className="lf__foot">
          <p className="lf__privacy">
            {F.privacyBefore} <Link href={route("/en/privacy")}>{F.privacyLink}</Link>. {F.termsBefore}{" "}
            <Link href={route("/en/terms")}>{F.termsLink}</Link>.
          </p>
          <button type="submit" className="btn btn--pri lf__submit" disabled={busy} data-busy={busy ? "true" : "false"}>
            <span className="is-idle" aria-hidden={busy}>
              {F.submit}
            </span>
            <span className="is-busy" aria-hidden={!busy}>
              {F.submitting}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
