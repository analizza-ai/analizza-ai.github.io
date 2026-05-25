## 1. Design System Foundation

- [x] 1.1 Create `styles/tokens.css` with all CSS custom properties (accent palette, surfaces, foreground, borders, semantic colors, spacing, radii, shadows, motion, typography)
- [x] 1.2 Add Google Fonts `@import` for Source Serif 4, Geist, and Geist Mono
- [x] 1.3 Add `.dark` / `[data-theme="dark"]` selector block overriding light tokens
- [x] 1.4 Add base `html, body` styles and utility classes (`.eyebrow`, `.micro`, `.pos`, `.neg`, `.warn-fg`, `.mono`, `.tabular`)

## 2. Brand Assets

- [x] 2.1 Create `assets/favicon.svg` — violet rounded-square with white "Az" mark paths
- [x] 2.2 Create `assets/logo-az.svg` — standalone 200×200 Az logomark
- [x] 2.3 Create `assets/logo-analizza.svg` — 520×120 horizontal logo (icon + "analizza" wordmark in Source Serif 4)

## 3. Page Shell & Navigation

- [x] 3.1 Create `index.html` with `<!doctype html>`, `<head>` meta tags, title, favicon link, and `tokens.css` stylesheet link
- [x] 3.2 Implement sticky `<header class="nav">` with backdrop blur, logo pip + wordmark, nav links (Products, Consulting), and primary "Talk to us" mailto CTA button

## 4. Hero Section

- [x] 4.1 Implement `.hero` section with radial accent spotlight pseudo-element
- [x] 4.2 Add violet eyebrow pill badge with pulsing dot and "Az de Analizza · AI for real estate capital" text
- [x] 4.3 Add 240×240px giant logomark with playing-card corner "A" pip pseudo-elements and violet glow box-shadow
- [x] 4.4 Add serif `<h1>` headline with italic accent `<em>` and subtitle paragraph
- [x] 4.5 Add hero CTA row: "See products" (primary, links to `#products`) and "Book a session" (secondary, mailto)

## 5. Products Section

- [x] 5.1 Implement two-column `.section-head` grid with section number, serif title, and lede paragraph
- [x] 5.2 Create three-column `.products` grid layout
- [x] 5.3 Implement Legal Analysis card: header (num + "Live" status pill), icon, title, description, dashed-border output table (Documents reviewed, Critical findings, Title status, Turnaround)
- [x] 5.4 Implement Valuation & ROI card: header (num + "Live" status pill), icon, title, description, output table (Fair value, 5-yr IRR, Cash-on-cash, Downside) with pos/warn color values
- [x] 5.5 Implement Construction Analysis card: header (num + "Beta" status pill), icon, title, description, output table (Cost/m², Vs. regional median, Schedule risk, Margin variance) with warn color values

## 6. Consulting Section

- [x] 6.1 Implement two-column `.consult-grid` layout
- [x] 6.2 Add left column: serif title, two description paragraphs, three-item bullet list (Thesis alignment, Deal-by-deal underwriting, Counter-proposal & close support), and "Start an engagement" primary CTA with mailto subject
- [x] 6.3 Implement right column "Engagement timeline" process card with header (title + "~ 6 weeks typical" label)
- [x] 6.4 Add five process steps to the card: Thesis & scope (3d, done), Sourcing & triage (2w, done), Deep diligence (2w), Negotiation & close (1–2w), Post-close monitoring (Ongoing)

## 7. Contact & Footer

- [x] 7.1 Implement `.closer` contact section with radial accent spotlight, section label, serif headline, subtitle, and email pill CTA
- [x] 7.2 Implement `<footer>` with left brand block (logo + copyright) and right two-column link grid (Products column, Company column)

## 8. Responsive Layout

- [x] 8.1 Add 960px breakpoint: collapse section-head to single column, stack products to single column, stack consulting grid, hide nav text links
- [x] 8.2 Add 560px breakpoint: reduce wrap padding, reduce hero padding, shrink hero logomark to 180×180px, reduce section padding
