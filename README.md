# analizza.ai

**Estúdio que constrói e investe em produtos de IA.**

[analizza.ai](https://www.analizza.ai) — português por padrão, inglês em [analizza.ai/?lang=en](https://www.analizza.ai/?lang=en).

---

## Equity

Apps em que a Analizza tem participação:

- **Analizza Auction** — agente de IA para análise de leilões de imóveis.
- **Yeroon** — plataforma white-label de apps ([yeroon.video](https://yeroon.video)).
- **Yeroon Play** — streaming de vídeo próprio.
- **Ralvin** — plataforma de ensino e marketplace de skills para agentes de IA.

---

## Consultoria

Sistemas entregues para clientes:

- **EAF Documents System** — envio, classificação, assinatura e busca de documentos.
- **SER** — gestão de contas e carga de arquivos de projetos com fluxo de aprovação.

---

## Website

This repository contains the public marketing site at **[analizza.ai](https://www.analizza.ai)**.

### Stack

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5, single-page (`index.html`) |
| Styling | Custom design system (`styles/tokens.css`) + component CSS |
| i18n | `assets/i18n.js` — PT/EN dictionary and toggle (`?lang=en`, choice saved in `localStorage`) |
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

Run the tests (Node 18+, no packages):

```bash
make test
```

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
