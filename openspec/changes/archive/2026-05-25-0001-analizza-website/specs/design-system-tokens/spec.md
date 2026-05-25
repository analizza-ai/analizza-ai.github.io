## ADDED Requirements

### Requirement: CSS custom property token file
The project SHALL provide `styles/tokens.css` defining all Analizza design system tokens as CSS custom properties on `:root`, covering: brand accent palette, surface colors, foreground levels, border strengths, semantic colors (pos/neg/warn/info), spacing scale (4px base), border radii, shadows, motion (easing + duration), and typography (font families + type scale).

#### Scenario: Tokens are accessible via var()
- **WHEN** any HTML element references `var(--accent)` or any other design token
- **THEN** the resolved value matches the Analizza DS specification (e.g., `--accent: #4A1FB8`)

#### Scenario: Font families load from Google Fonts
- **WHEN** the page loads with network access
- **THEN** Source Serif 4, Geist, and Geist Mono are loaded via the Google Fonts CDN import in `tokens.css`

### Requirement: Dark theme class
The token file SHALL include a `.dark` / `[data-theme="dark"]` selector block that overrides surface, foreground, border, accent, and semantic color tokens for dark mode.

#### Scenario: Dark theme tokens override light defaults
- **WHEN** `class="dark"` is applied to the `<html>` element
- **THEN** `--surface-page` resolves to `#1A1815` and `--fg-1` resolves to `#EDE8DF`

### Requirement: Base element styles in token file
The token file SHALL define base `html, body` styles (background, color, font-family, font-size, line-height, font-feature-settings, antialiasing) and utility classes: `.eyebrow`, `.micro`, `.meta`, `.small`, `.pos`, `.neg`, `.warn-fg`, `.mono`, `.tabular`.

#### Scenario: Body inherits design system defaults
- **WHEN** the page loads without any additional CSS
- **THEN** body text renders in Geist at 15px with `#2A2622` color on a `#F5F0E8` warm-paper background
