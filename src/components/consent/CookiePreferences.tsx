"use client";

import { useState } from "react";
import { COOKIES_PAGE } from "@/content/legal/cookies";
import { useConsent } from "./ConsentProvider";

/**
 * The preferences on /biskvitki (decision L15): necessary storage shown as always on, analytics as a switch when it
 * exists, an inline confirmation after saving. When no optional service exists, it says so and offers no fake choice.
 */
export function CookiePreferences() {
  const { enabled, known, choice, choose } = useConsent();
  const c = COOKIES_PAGE;
  const [draft, setDraft] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const analyticsOn = draft ?? choice?.analytics ?? false;
  const save = (value: boolean) => {
    setDraft(value);
    choose(value);
    setSaved(true);
  };
  const s = c.storage;
  const rows = enabled ? [s.consent, s.analytics] : [];

  return (
    <div className="prefs">
      <div className="prefs__cats">
        <section className="prefs__cat" aria-labelledby="cat-necessary">
          <div className="prefs__row">
            <h2 id="cat-necessary">{c.categories.necessary.title}</h2>
            <span className="prefs__state prefs__state--on">{c.categories.necessary.state}</span>
          </div>
          <p>{c.categories.necessary.text}</p>
        </section>
        <section className="prefs__cat" aria-labelledby="cat-analytics">
          <div className="prefs__row">
            <h2 id="cat-analytics">{c.categories.analytics.title}</h2>
            {enabled ? (
              <label className="switch">
                <input
                  type="checkbox"
                  role="switch"
                  checked={analyticsOn}
                  disabled={!known}
                  aria-label={c.toggleLabel}
                  onChange={(e) => {
                    setDraft(e.target.checked);
                    setSaved(false);
                  }}
                />
                <span aria-hidden="true" />
                <em>{analyticsOn ? c.categories.analytics.stateOn : c.categories.analytics.stateOff}</em>
              </label>
            ) : (
              <span className="prefs__state">{c.categories.analytics.notUsed}</span>
            )}
          </div>
          <p>{c.categories.analytics.text}</p>
        </section>
      </div>

      {enabled ? (
        <div className="prefs__actions">
          <button type="button" className="btn btn--sec" onClick={() => save(false)}>
            {c.rejectOptional}
          </button>
          <button type="button" className="btn btn--sec" onClick={() => save(true)}>
            {c.acceptAll}
          </button>
          <button type="button" className="btn btn--pri" onClick={() => save(analyticsOn)}>
            {c.save}
          </button>
          <p className="prefs__saved" role="status">
            {saved ? c.saved : ""}
          </p>
        </div>
      ) : (
        <p className="prefs__note">{c.noOptional}</p>
      )}

      <section className="prefs__store" aria-labelledby="store-h">
        <h2 id="store-h">{s.heading}</h2>
        {rows.length ? (
          <table>
            <thead>
              <tr>
                {s.columns.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>
                    <code>{r.name}</code>
                  </td>
                  <td>{r.purpose}</td>
                  <td>{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{s.nothingStored}</p>
        )}
      </section>
    </div>
  );
}
