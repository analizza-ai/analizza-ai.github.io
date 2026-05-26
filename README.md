# analizza.ai

**AI-powered due diligence for real estate investors.**

[analizza.ai](https://www.analizza.ai)

---

## Products

- Legal Analysis
- Valuation & ROI
- Construction Analysis

---

## Consulting

For acquisitions that go beyond the standard product flow, analizza.ai offers bespoke advisory — sourcing, structuring, and full-cycle due diligence — as a retained engagement.

---

## Website

This repository contains the public marketing site at **[analizza.ai](https://www.analizza.ai)**.

### Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5, single-page (`index.html`) |
| Styling | Custom design system (`styles/tokens.css`) + component CSS |
| Fonts | Source Serif 4 (display) · Geist (UI) · Geist Mono (numerics) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions → `cloudflare/wrangler-action@v3` |

### Design tokens

- **Surface:** `#F5F0E8` warm paper
- **Accent:** `#4A1FB8` violet
- **Foreground:** `#2A2622` near-black
- **Dark mode:** automatic via `@media (prefers-color-scheme: dark)`

---

## Local development

Open `index.html` directly in a browser — no build step required.

To deploy manually:

```bash
make deploy
```

This runs `npx wrangler pages deploy` against the `analizza-ai` Cloudflare Pages project.

---

## CI/CD

Every push to `master` triggers a GitHub Actions workflow that deploys to Cloudflare Pages automatically.

**Required GitHub secrets:**

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens) — use the "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | Right sidebar of your [Cloudflare dashboard](https://dash.cloudflare.com) |

---

## Contact

[contact@analizza.ai](mailto:contact@analizza.ai)
