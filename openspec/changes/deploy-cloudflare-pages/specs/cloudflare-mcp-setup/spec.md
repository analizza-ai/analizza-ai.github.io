## ADDED Requirements

### Requirement: Cloudflare MCP server configured in the active AI agent
The Cloudflare MCP server SHALL be registered in the settings file of whichever AI coding agent is in use at setup time. The config path is agent-specific — install to local (repo-scoped) or global (machine-wide) depending on desired reach:

| Agent | Local config | Global config |
|---|---|---|
| Claude Code | `.mcp.json` (project root) | `~/.claude/settings.json` |
| Cursor | `.cursor/mcp.json` | `~/.cursor/mcp.json` |
| Codex | `.codex/settings.json` | `~/.codex/settings.json` |

#### Scenario: Local install — MCP scoped to this repo
- **WHEN** the Cloudflare MCP entry is added to `.mcp.json` at the project root (Claude Code) or the agent's equivalent local config file
- **THEN** the agent connects to `https://mcp.cloudflare.com/mcp` only when working inside this repository

#### Scenario: Global install — MCP available in all projects
- **WHEN** the Cloudflare MCP entry is added to the agent's global settings file (e.g. `~/.claude/settings.json`)
- **THEN** the agent connects to `https://mcp.cloudflare.com/mcp` from any project on the machine

#### Scenario: MCP authenticates via API token
- **WHEN** `CLOUDFLARE_API_TOKEN` is set in the environment and the MCP config passes it as a bearer token in the Authorization header
- **THEN** the MCP server accepts the connection and exposes Cloudflare tools without requiring OAuth

#### Scenario: MCP can list Pages projects
- **WHEN** the user asks Claude Code to list Cloudflare Pages projects
- **THEN** Claude Code calls the MCP server and returns the list of projects associated with the account

### Requirement: MCP config format
The MCP server entry SHALL use the remote streamable-http transport (URL-based), not a local `command`/`args` spawn, since the Cloudflare MCP server is hosted remotely.

#### Scenario: Config uses URL transport
- **WHEN** the MCP config entry for cloudflare is inspected
- **THEN** it contains a `url` field pointing to `https://mcp.cloudflare.com/mcp`, not a `command` field
