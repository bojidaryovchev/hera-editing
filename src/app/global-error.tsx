"use client";

import { SERVER_ERROR } from "@/content/errors";

/** Last resort when the root layout itself fails: plain markup and inline styles, nothing that could fail again. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const e = SERVER_ERROR;
  return (
    <html lang="bg">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#0c0e10", color: "#edede7", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ padding: 24, maxWidth: 520 }}>
          <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: "0 0 12px" }}>{e.title}</h1>
          <p style={{ margin: "0 0 24px", color: "#a6acb0" }}>{e.text}</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 48, padding: "0 22px", borderRadius: 999, border: 0, background: "#d9f568", color: "#101315", font: "700 16px system-ui", cursor: "pointer" }}
          >
            {e.retry}
          </button>
        </main>
      </body>
    </html>
  );
}
