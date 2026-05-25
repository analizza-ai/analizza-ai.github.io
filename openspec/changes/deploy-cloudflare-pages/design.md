## Context

The site is a fully static single-page app (HTML + CSS + SVG assets, no build step). It lives in a git repo with no remote yet. Cloudflare Pages can serve static files directly from a GitHub repo branch with zero configuration beyond pointing it at the right directory.

## Goals / Non-Goals

**Goals:**
- Public URL live on `*.pages.dev` immediately after first push to `master`
- Every subsequent `git push origin master` triggers an automatic redeploy
- HTTPS enforced by default (Cloudflare-managed cert)
- `wrangler.toml` checked into the repo for reproducibility

**Non-Goals:**
- Custom domain (`analizza.ai`) setup — that's a DNS step done after the Pages project is live
- Preview deployments on PRs — not needed for a solo project at this stage
- Build pipeline / bundler — the output directory IS the repo root

## Decisions

**Cloudflare Pages over GitHub Pages**
GitHub Pages would work but Cloudflare Pages gives a global CDN, better performance, and makes the later custom-domain + SSL step simpler (one Cloudflare dashboard, no external DNS proxy needed).

**`master` branch as production branch**
Matches the repo's default branch. No `main`/`master` mismatch to manage.

**Root directory as publish directory**
`index.html` is at the repo root alongside `assets/` and `styles/`. No build output folder exists, so the publish directory is `.` (root). Set in `wrangler.toml` as `pages_build_output_dir = "."`.

**`wrangler.toml` for config as code**
Avoids dashboard-only config. Any collaborator can see what project name and output dir the site uses. The alternative (dashboard-only) leaves config invisible in the repo.

## Risks / Trade-offs

- **Cloudflare account required** → User must have (or create) a free Cloudflare account before running `wrangler pages deploy` or connecting via dashboard
- **First deploy is manual** → The GitHub integration requires authorizing Cloudflare to access the repo via the dashboard; subsequent deploys are automatic
- **`wrangler.toml` project name must match** → If the Pages project is created via dashboard with a different name than the one in `wrangler.toml`, CLI deploys will target the wrong project. Mitigation: use the same name (`analizza-ai`) in both places
