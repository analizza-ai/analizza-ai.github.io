## Why

The analizza.ai site needs a robust deployment pipeline with three layers: a local developer experience (MCP + Makefile), and an automated CI/CD pipeline (GitHub Actions). All three share the same credentials and target the same Cloudflare Pages project.

## What Changes

- Set up Cloudflare MCP server in Claude Code (global or project-local) so deployments and account management can be driven from conversation
- Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to `~/.bashrc` and `~/.zshrc` — shared by MCP, Wrangler CLI, and Makefile
- Add `wrangler.toml` declaring the Pages project name and root publish directory
- Add `Makefile` with a `deploy` target that runs `wrangler pages deploy` locally
- Add `.github/workflows/deploy.yml` using `cloudflare/wrangler-action@v3` to auto-deploy on every push to `master`
- Create the Cloudflare Pages project (once, via MCP or dashboard)

## Capabilities

### New Capabilities

- `cloudflare-mcp-setup`: Cloudflare MCP server configured in Claude Code (global or local), authenticated via API token, enabling conversational management of Pages, DNS, and other Cloudflare resources
- `cloudflare-env-credentials`: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` exported in shell profiles (`~/.bashrc`, `~/.zshrc`) so all local tooling (Wrangler, Makefile, MCP) authenticates automatically
- `makefile-deploy`: `make deploy` target runs `wrangler pages deploy` from the local machine — same pipeline as CI, no dashboard required
- `github-actions-deploy`: `.github/workflows/deploy.yml` using `cloudflare/wrangler-action@v3` — auto-deploys to Cloudflare Pages on every push to `master`

### Modified Capabilities

- `cloudflare-pages-deploy`: now describes the Pages project config (`wrangler.toml`) as the shared contract used by all three deploy surfaces (MCP, Makefile, GitHub Actions)

## Impact

- New files: `wrangler.toml`, `Makefile`, `.github/workflows/deploy.yml`
- Shell profile changes: `~/.bashrc` and `~/.zshrc` (env vars)
- Claude Code MCP config: `~/.claude/settings.json` (global) or `.claude/settings.json` (local)
- GitHub repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- No changes to `index.html`, `styles/`, or `assets/`
