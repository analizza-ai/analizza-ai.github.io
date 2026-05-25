## ADDED Requirements

### Requirement: Sticky navigation bar
The page SHALL render a sticky header that remains visible during scroll, containing the Analizza logo pip + wordmark, links to Products and Consulting sections, and a primary "Talk to us" CTA button linking to `mailto:contact@analizza.ai`. The nav background SHALL use a backdrop blur effect.

#### Scenario: Nav visible on scroll
- **WHEN** the user scrolls down the page
- **THEN** the navigation bar remains fixed at the top of the viewport with a blurred translucent background

#### Scenario: Nav CTA links to email
- **WHEN** the user clicks "Talk to us" in the nav
- **THEN** the browser opens the default mail client with `contact@analizza.ai` as the recipient

### Requirement: Hero section with giant logomark
The page SHALL render a hero section with: an eyebrow pill badge ("Az de Analizza · AI for real estate capital") styled in accent violet with white text, a 240×240px violet logomark with playing-card corner "A" pips, a serif headline with italic accent word, a subtitle paragraph, and two CTAs ("See products" primary, "Book a session" secondary).

#### Scenario: Hero eyebrow is accent-colored
- **WHEN** the page loads
- **THEN** the hero eyebrow pill has a violet (`#4A1FB8`) background with white text and a pulsing white dot

#### Scenario: Hero CTAs scroll/link correctly
- **WHEN** the user clicks "See products"
- **THEN** the page scrolls to the `#products` section

#### Scenario: "Book a session" links to email
- **WHEN** the user clicks "Book a session"
- **THEN** the browser opens the default mail client addressed to `contact@analizza.ai`

### Requirement: Products grid with three product cards
The page SHALL display three product cards in a responsive grid: Legal Analysis (status: Live), Valuation & ROI (status: Live), Construction Analysis (status: Beta). Each card SHALL include a product number, status pill, icon, title, description, and a dashed-border output data table showing illustrative metrics in monospace tabular numerics.

#### Scenario: Product status pills render correctly
- **WHEN** the products section is visible
- **THEN** "Live" pills appear green, "Beta" pills appear violet-tinted, and "Soon" pills appear muted

#### Scenario: Output data uses tabular numerics
- **WHEN** the product output rows are rendered
- **THEN** values use monospace font with tabular-nums for alignment, positive values in green, negative in red, warnings in amber

#### Scenario: Grid collapses on mobile
- **WHEN** viewport width is below 960px
- **THEN** the three-column product grid collapses to a single column

### Requirement: Consulting section with engagement timeline
The page SHALL display a two-column consulting section: left column with headline, description, three bullet points (Thesis alignment, Deal-by-deal underwriting, Counter-proposal & close support), and a primary CTA; right column with a "Engagement timeline" process card showing 5 numbered steps with durations.

#### Scenario: Process steps show completion state
- **WHEN** the consulting section renders
- **THEN** steps 01 and 02 have a filled violet circle (done state); steps 03–05 have a muted circle

#### Scenario: "Start an engagement" CTA links to email with subject
- **WHEN** the user clicks "Start an engagement"
- **THEN** the browser opens mail to `contact@analizza.ai` with subject "Advisory engagement"

### Requirement: Contact closer section
The page SHALL render a contact section with a radial accent spotlight background, section number label, serif headline "Bring us your next deal.", subtitle text, and a pill-shaped email CTA linking to `contact@analizza.ai`.

#### Scenario: Email pill is interactive
- **WHEN** the user clicks the email pill
- **THEN** the browser opens the default mail client addressed to `contact@analizza.ai`

### Requirement: Footer with brand and navigation links
The page SHALL render a footer with the Analizza logo + copyright line on the left, and two link columns (Products, Company) on the right.

#### Scenario: Footer links scroll to sections
- **WHEN** the user clicks a footer product link
- **THEN** the page scrolls to the corresponding section anchor

### Requirement: Responsive layout
The page SHALL adapt its layout at two breakpoints: 960px (collapse section headers, product grid, consulting columns; hide nav text links) and 560px (reduce hero padding, shrink logomark, reduce wrap padding).

#### Scenario: Mobile nav hides text links
- **WHEN** viewport width is below 960px
- **THEN** nav text links (Products, Consulting) are hidden; only the CTA button remains
