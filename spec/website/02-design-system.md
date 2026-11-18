# Website visual design system and interaction requirements

## Direction — 'Cinematic editorial clarity'
Premium and lively because product is original media; credible and calm because customers are business owners buying a recurring partnership. Use a Swiss-influenced typographic grid, generous white space, restrained motion, strong video imagery, readable Bulgarian text. Avoid nightclub/gaming look, dark-only novelty, giant fake dashboards, generic smiling stock photos and fake testimonials.

## Suggested token baseline (change only with a documented design rationale)
```css
:root {
  --color-ink: #13191C;
  --color-paper: #F7F6F2;
  --color-white: #FFFFFF;
  --color-muted: #5B6265;
  --color-surface: #ECECE6;
  --color-line: #D7DAD5;
  --color-accent: #D9F568;
  --color-focus: #2055D6;
  --radius-card: 18px;
  --radius-button: 999px;
  --container-max: 1440px;
}
```
The lime accent is used sparingly for CTAs/highlights, with tested contrast for text/icons. Do not treat this as a final logo/brand identity; brand assets are a launch input. Pick self-hosted open fonts with verified Cyrillic coverage (e.g., Inter or Manrope; inspect licensing). Body 16–18px desktop; accessible hierarchy and line-height; strong Cyrillic line breaking.

## Layout
- Responsive mobile-first. Main max width approx 1280–1440px, but **hero and media use full viewport more effectively** on large monitors; don't leave a 600px-column island on a 4K display.
- Breakpoints implementation chosen to match Tailwind defaults; design review at 360, 390, 768, 1024, 1440, 1920 and 2560 px.
- Hero: desktop split of text/media with media large enough to demonstrate service; mobile stacked, CTA before lengthy visual; stable aspect ratios.
- Work showcase: editorial asymmetric video thumbnails, hover interaction optional, accessible card titles and predictable controls; desktop grids, mobile horizontal cards only if accessible.
- Consistent 8px-based spacing scale, max 65–80ch body copy for readability; purposeful whitespace.

## Hero media rules
- Show a poster immediately; video lazy loaded/intersection activated; avoid shipping huge unoptimized hero movies to all mobile users.
- No audible autoplay. If ambient muted preview used, ensure user preference `prefers-reduced-motion` and mobile data fallback supported. Explicit play/pause when videos run. Never start multiple videos at once.
- Use optimized MP4/H.264 or another widely supported format with poster/thumbnail, optional WebM; adaptive quality or CDN transformation if supplied. Video CDN choice is a deployment decision; don't hardwire paid media provider.
- All media must be real and rights-cleared; during development use clearly labeled placeholder boxes/mock media to be replaced by owner.

## Microinteractions
- Discreet headline fade-in and card reveals only when reduced-motion off; no scroll hijacking.
- Accessible accordion FAQ; visible focus; hover never sole indicator.
- Primary CTA clear contrast, always labeled, destination predictable.
- Form status states: idle, validating, submitting, success, error. No deceptive counters or popup countdowns.

## Accessibility
WCAG 2.2 AA intention: semantic headings; meaningful alt text; skip link; keyboard menu/accordion/video; focus visible; 4.5:1 body contrast and 3:1 large text/UI contrast as appropriate; reduced motion; subtitles/transcripts for meaningful videos; error descriptions announced; touch target sizing; accessible dialogs if any. Test with automated axe and manual keyboard/screen-reader checks.

## Performance goals
- Target Core Web Vitals at 75th percentile mobile: LCP <=2.5s, CLS <=0.1, INP <=200ms. Real-user results require monitoring; do not claim achieved based on lab only.
- Target Lighthouse mobile Perf >=90, SEO >=95, A11y >=95 on stable test setup, recognize network/video variance.
- Preload one critical font and hero poster only; images use responsive sizes, AVIF/WebP; no unnecessary motion libraries; code-split media viewer; defer marketing analytics by consent.

## Visual content hierarchy
1. Human-readable main claim.
2. Authentic work/process visual.
3. Scope and how it works.
4. Verification/trust without invention.
5. One clear quote action.

## Approval and delivery assets
Brand name, logo/SVG, legal entity data, brand colors (if overriding tokens), 3–8 original video clips with usage rights, 5–10 photos/frames, 2–4 verified company/team photos, contact channels, links to actual social accounts. If assets are absent, build layout with an obvious content gate rather than pretending fake assets are real.
