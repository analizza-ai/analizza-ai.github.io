## Why

The analizza.ai site needs a production deployment pipeline. Cloudflare Pages offers zero-config static hosting with global CDN, automatic HTTPS, and instant deploys on every `git push` to `master` — eliminating manual upload steps and giving the site a permanent public URL.

## What Changes

- Add Cloudflare Pages project connected to the GitHub repo, serving from the `master` branch
- Add a `wrangler.toml` configuration file declaring the Pages project settings
- Push current working tree to `master` to trigger the first deploy
- No build step required — the site is already static HTML/CSS/SVG at the repo root

## Capabilities

### New Capabilities

- `cloudflare-pages-deploy`: Continuous deployment pipeline — every push to `master` triggers an automatic Cloudflare Pages deploy; the site is publicly accessible at a `*.pages.dev` URL and optionally at `analizza.ai`

### Modified Capabilities

## Impact

- New file: `wrangler.toml` (Cloudflare Pages project config)
- GitHub repo must be pushed to `origin/master` (currently no remote commits)
- Cloudflare account required; Pages project must be created via dashboard or Wrangler CLI
- No changes to `index.html`, `styles/`, or `assets/`
