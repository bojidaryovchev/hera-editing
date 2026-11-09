/** Inline icons (decorative: aria-hidden, the control carries the label). */
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", "aria-hidden": true, focusable: false } as const;

export const ArrowRight = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth={2.4} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Check = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth={2.4} {...base}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);
export const Plus = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth={2} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth={2} {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" strokeWidth={2} {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const PlayIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden focusable={false}>
    <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
  </svg>
);
export const PauseIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden focusable={false}>
    <path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z" fill="currentColor" />
  </svg>
);
