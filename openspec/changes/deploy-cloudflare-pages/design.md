## Context

Three deployment surfaces share one credential pair (`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`) and one target (`wrangler.toml`). The local shell profile is the single source of truth for credentials — MCP, Wrangler CLI, and Makefile all read from the environment automatically.

```
~/.bashrc / ~/.zshrc
  └── CLOUDFLARE_API_TOKEN
  └── CLOUDFLARE_ACCOUNT_ID
        │
        ├── Claude Code MCP  ──▶ conversational deploy / manage
        │   (global or local config)
        │
        ├── make deploy  ──▶ wrangler pages deploy .  (local CI equivalent)
        │
        └── GitHub Actions  ──▶ wrangler-action@v3  (automated on push)
                                  reads secrets.CLOUDFLARE_API_TOKEN
                                  reads secrets.CLOUDFLARE_ACCOUNT_ID
```

## Goals / Non-Goals

**Goals:**
- One API token, three deploy surfaces, zero credential duplication
- `make deploy` works locally with the same result as GitHub Actions
- MCP enables managing the Pages project from Claude Code conversation
- GitHub Actions auto-deploys on every push to `master`
- Shell profile changes are idempotent (safe to run setup script twice)

**Non-Goals:**
- Custom domain (`analizza.ai`) — DNS step after Pages project is live
- Preview deployments on PRs
- Build pipeline — output directory is repo root (`.`)
- Node.js / package.json — Wrangler runs via `npx`

## Decisions

**`cloudflare/wrangler-action@v3` over deprecated `pages-action`**
`pages-action` is archived and unmaintained. `wrangler-action@v3` is the official replacement — it accepts any `wrangler` command as its `command:` input, including `pages deploy`.

**MCP: remote server at `https://mcp.cloudflare.com/mcp`**
Cloudflare runs the MCP server remotely — no local install needed. Claude Code connects via HTTP. Auth is the same `CLOUDFLARE_API_TOKEN` passed as a bearer token. Two install modes:
- **Global** (`~/.claude/settings.json`) — available in all projects
- **Local** (`.claude/settings.json`) — scoped to this repo only

**API Token over API Key**
API Keys are global account credentials (legacy). API Tokens are scoped and revocable — create one with `Cloudflare Pages: Edit` + `Account: Read` permissions only.

**`wrangler.toml` as shared contract**
Single file declares `name` and `pages_build_output_dir = "."`. Referenced by Makefile (`wrangler pages deploy .`) and GitHub Actions (`command: pages deploy . --project-name=analizza-ai`). Dashboard reads it on first project creation.

**Makefile over shell script**
`make deploy` is self-documenting, tab-completable, and composable. Matches the mental model of CI — one command, same result locally and remotely.

## Risks / Trade-offs

- **First Pages project creation is manual** → Use MCP (`create Pages project`) or dashboard once; all subsequent deploys are automated
- **`CLOUDFLARE_ACCOUNT_ID` is not secret but treated as one** → Simpler to put both in GitHub secrets and shell profile than to split them
- **MCP remote server requires network** → Local Wrangler CLI (`make deploy`) works fully offline once credentials are in env
- **`wrangler` requires Node.js** → `npx wrangler` pulls it on first run; no global install needed but adds ~2s cold start

## Credentials Reference

```
Where to get them:
  CLOUDFLARE_API_TOKEN  → dash.cloudflare.com → My Profile → API Tokens → Create Token
                          Template: "Edit Cloudflare Workers"
                          OR custom: Cloudflare Pages:Edit + Account:Read
  CLOUDFLARE_ACCOUNT_ID → dash.cloudflare.com → any page → right sidebar → Account ID
```
