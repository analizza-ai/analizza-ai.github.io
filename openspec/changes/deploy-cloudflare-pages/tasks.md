## 1. Setup MCP

- [x] 1.1 Add Cloudflare MCP entry to `.mcp.json` at project root (local, this repo only) OR to `~/.claude/settings.json` under `mcpServers` (global, all projects)
- [x] 1.2 Set `url: https://mcp.cloudflare.com/mcp` and pass `CLOUDFLARE_API_TOKEN` as bearer token in the Authorization header
- [ ] 1.3 Restart Claude Code and verify the Cloudflare MCP tools are available in the session
- [ ] 1.4 Use MCP to list Pages projects and confirm account connectivity

## 2. Generate Cloudflare Credentials

- [x] 2.1 If you don't have a `CLOUDFLARE_API_TOKEN` yet → create one at https://dash.cloudflare.com/profile/api-tokens — use the "Edit Cloudflare Workers" template or create a custom token with `Cloudflare Pages: Edit` + `Account: Read` permissions
- [x] 2.2 Copy the generated API Token (shown only once — save it securely before closing)
- [x] 2.3 If you don't have your `CLOUDFLARE_ACCOUNT_ID` → find it at https://dash.cloudflare.com/?to=/:account/workers — it appears in the right sidebar under "Account ID"

## 3. Configure Shell Credentials

- [x] 3.1 Append `export CLOUDFLARE_API_TOKEN=<token>` to `~/.bashrc` (with grep guard to avoid duplicates)
- [x] 3.2 Append `export CLOUDFLARE_ACCOUNT_ID=<id>` to `~/.bashrc`
- [x] 3.3 Append the same two exports to `~/.zshrc`
- [x] 3.4 Reload shell (`source ~/.zshrc` or open new terminal) and verify `echo $CLOUDFLARE_API_TOKEN` returns the value

## 4. Cloudflare Pages Project & Wrangler Config

- [x] 4.1 Create `wrangler.toml` at repo root with `name = "analizza-ai"`, `compatibility_date`, and `pages_build_output_dir = "."`
- [x] 4.2 Create the Pages project via MCP (ask Claude to create it) or manually in the Cloudflare dashboard — no GitHub integration needed
- [x] 4.3 Commit `wrangler.toml` to the repo

## 5. Makefile Deploy

- [x] 5.1 Create `Makefile` at repo root with a `help` target and a `deploy` target running `npx wrangler pages deploy . --project-name=analizza-ai --branch=master`
- [x] 5.2 Run `make deploy` locally and confirm the site deploys and returns a `*.pages.dev` URL
- [x] 5.3 Commit `Makefile` to the repo

## 6. GitHub Actions Workflow

- [ ] 6.1 Add `CLOUDFLARE_API_TOKEN` as a GitHub repository secret (Settings → Secrets → Actions)
- [ ] 6.2 Add `CLOUDFLARE_ACCOUNT_ID` as a GitHub repository secret
- [x] 6.3 Create `.github/workflows/deploy.yml` using `cloudflare/wrangler-action@v3` with `command: pages deploy . --project-name=analizza-ai` triggered on push to `master`
- [ ] 6.4 Commit and push the workflow file to `master`
- [ ] 6.5 Confirm the Actions job runs successfully and a deployment appears in the GitHub Environments tab
- [ ] 6.6 Verify the live site at `https://analizza-ai.pages.dev` reflects the latest push
