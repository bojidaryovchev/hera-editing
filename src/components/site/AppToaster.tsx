"use client";

import { Toaster } from "react-hot-toast";

/** Notifications (react-hot-toast), styled as editor panels. Bottom centre, clear of the iPhone home indicator. */
export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      gutter={10}
      containerStyle={{ bottom: "max(20px, env(safe-area-inset-bottom))", left: 16, right: 16 }}
      toastOptions={{
        duration: 6000,
        className: "toast",
        style: {
          background: "#13161a",
          color: "#edede7",
          border: "1px solid #2b3137",
          borderRadius: 12,
          boxShadow: "0 18px 40px rgba(0,0,0,.45)",
          padding: "12px 14px",
          maxWidth: 520,
          font: "500 15px/1.45 var(--font-sans)",
        },
        success: { iconTheme: { primary: "#d9f568", secondary: "#101315" } },
        error: { iconTheme: { primary: "#ff5a47", secondary: "#101315" }, ariaProps: { role: "alert", "aria-live": "assertive" } },
      }}
    />
  );
}
