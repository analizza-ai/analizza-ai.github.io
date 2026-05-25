## Why

analizza.ai needs a public-facing website to establish its brand and communicate its AI-powered real estate intelligence products (Legal Analysis, Valuation & ROI, Construction Analysis) and consulting services to institutional investors and fintech audiences. The site is the primary conversion surface before any sales engagement.

## What Changes

- Introduce a single-page static website (`index.html`) built on the Analizza design system
- Add design system token stylesheet (`styles/tokens.css`) establishing the full color, typography, spacing, and motion vocabulary
- Add brand assets: favicon, logomark SVG, and full logo SVG (`assets/`)
- The site includes: sticky nav, hero section, products grid, consulting section, contact closer, and footer

## Capabilities

### New Capabilities

- `website-landing-page`: Single-page marketing site with nav, hero, products, consulting, contact, and footer sections — built on the Analizza design system (warm paper palette, Source Serif 4, Geist, violet accent)
- `design-system-tokens`: CSS custom properties defining the full Analizza DS: brand accent, surfaces, foreground, borders, semantic colors, spacing, radii, shadows, motion, and typography scale

### Modified Capabilities

## Impact

- New files: `index.html`, `styles/tokens.css`, `assets/favicon.svg`, `assets/logo-analizza.svg`, `assets/logo-az.svg`
- No backend, no build step — pure static HTML/CSS
- Google Fonts dependency (Source Serif 4, Geist, Geist Mono) loaded via CDN
- Contact CTA links to `contact@analizza.ai` (mailto)
