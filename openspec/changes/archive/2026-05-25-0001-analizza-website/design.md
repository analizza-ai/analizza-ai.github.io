## Context

analizza.ai is a B2B AI company targeting institutional real estate investors. The website must immediately communicate trust, precision, and technical sophistication — the same qualities the products embody. The design comes from a Claude Design handoff bundle with a fully specified design system (tokens, typography, layout).

The site is a GitHub Pages static site (`analizza-ai.github.io`). No framework, no build pipeline — raw HTML and CSS for zero deployment friction.

## Goals / Non-Goals

**Goals:**
- Pixel-accurate implementation of the Claude Design handoff for `index.html`
- Full Analizza design system via `styles/tokens.css` (CSS custom properties)
- All six page sections: Nav, Hero, Products, Consulting, Contact, Footer
- Responsive layout (breakpoints at 960px and 560px)
- Self-contained: only external dependency is Google Fonts CDN

**Non-Goals:**
- Dark mode toggle (light-only per user spec)
- Multi-page routing or JavaScript interactivity
- CMS or dynamic content
- Analytics or tracking scripts (can be added later)
- Backend of any kind

## Decisions

**Static HTML over React/Next.js**
The site is a single marketing page with no dynamic data requirements. A static HTML file ships faster, has zero build overhead, and works natively on GitHub Pages. React would add complexity for no benefit here.

**CSS custom properties for design tokens** (not Tailwind, not CSS modules)
The Analizza design system is already specified as CSS vars in `tokens.css`. Mapping them to a utility framework would lose fidelity and add a build step. Direct CSS custom property references ensure 1:1 token usage.

**Inline `<style>` block + external `tokens.css`**
Page-specific layout styles live inline in `index.html`; only the reusable design system tokens are in an external file. This keeps the single-file nature of the prototype while enabling the token layer to be shared if more pages are added.

**Inline SVGs for icons and logo pip**
Icons (Feather-style strokes) and the nav logo pip are inlined as `<svg>` elements — no icon font, no external sprite, no extra HTTP requests. The three brand asset SVGs (`favicon.svg`, `logo-analizza.svg`, `logo-az.svg`) are separate files because they may be referenced externally (og:image, etc.).

**`mailto:` for contact CTA**
No contact form, no backend. The email pill links directly to `contact@analizza.ai`. Simple, reliable, zero maintenance.

## Risks / Trade-offs

- **Google Fonts CDN dependency** → If Fonts fails to load, fallback font stack (Georgia, system-ui, monospace) maintains readability but breaks visual fidelity. Mitigation: fallback stack is specified in every `--font-*` token.
- **No JS = no animations beyond CSS transitions** → Scroll-reveal effects or entrance animations are not possible. Acceptable for v1; add a small JS animation layer later if desired.
- **Illustrative product data** → The numbers in product output rows (IRR, cost/m², turnaround) are placeholders. They look real to investors; update with real benchmarks before launch.
- **`color-mix()` CSS function** → Used for the nav backdrop and hero spotlight. Supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.2+). IE11 and older Android WebView will degrade gracefully (solid background instead of translucent).

## Migration Plan

1. Files are placed at the repo root: `index.html`, `styles/tokens.css`, `assets/`
2. GitHub Pages serves the repo root — no configuration needed
3. Rollback: revert the commit; GitHub Pages redeploys automatically within ~1 min
