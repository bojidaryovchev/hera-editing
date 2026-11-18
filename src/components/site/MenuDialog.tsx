"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { QuoteLink } from "@/components/site/QuoteLink";
import { route } from "@/lib/site/nav";

type Props = {
  brand: string;
  items: { label: string; href: string }[];
  quoteLabel: string;
  labels: { open: string; close: string; title: string; nav: string; home: string };
  /** Where the logo leads: the Bulgarian home by default, /en in the English section. */
  homeHref?: "/" | "/en";
  /** The form the quote button opens (QuoteLink): the Bulgarian one by default. */
  quoteBase?: "/en/order";
};

/** Below 1024 px: a full-screen modal dialog (native <dialog>: focus trap, Escape, inert page behind). */
export function MenuDialog({ brand, items, quoteLabel, labels, homeHref = "/", quoteBase }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      button.current?.focus();
    };
    // The menu has no place on wide screens; close it if the window grows past the breakpoint.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && d.open && d.close();
    d.addEventListener("close", onClose);
    wide.addEventListener("change", onWide);
    return () => {
      d.removeEventListener("close", onClose);
      wide.removeEventListener("change", onWide);
    };
  }, []);

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const hide = () => dialog.current?.close();

  return (
    <>
      <button
        ref={button}
        className="hdr__menu"
        type="button"
        aria-label={labels.open}
        aria-haspopup="dialog"
        aria-controls="menu"
        aria-expanded={open}
        onClick={show}
      >
        <MenuIcon />
      </button>
      <dialog ref={dialog} id="menu" className="menu" aria-labelledby="menu-title">
        <div className="menu__top wrap">
          <Link className="logo" href={homeHref} aria-label={`${brand}, ${labels.home}`} onClick={hide}>
            <Wordmark title={brand} />
          </Link>
          <button className="hdr__menu" type="button" aria-label={labels.close} onClick={hide}>
            <CloseIcon />
          </button>
        </div>
        <nav className="menu__nav wrap" aria-label={labels.nav}>
          <h2 className="sr-only-x" id="menu-title">
            {labels.title}
          </h2>
          {items.map((i, n) => (
            <Link key={i.href} href={route(i.href)} onClick={hide} style={{ ["--i" as string]: n }}>
              {i.label}
              <small aria-hidden="true">{String(n + 1).padStart(2, "0")}</small>
            </Link>
          ))}
        </nav>
        <div className="menu__cta wrap" style={{ ["--i" as string]: items.length }}>
          <QuoteLink className="btn btn--pri" onClick={hide} base={quoteBase}>
            {quoteLabel}
          </QuoteLink>
        </div>
      </dialog>
    </>
  );
}
