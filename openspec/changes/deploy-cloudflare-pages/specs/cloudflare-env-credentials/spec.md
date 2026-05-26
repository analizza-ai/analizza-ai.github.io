## ADDED Requirements

### Requirement: Credentials exported in shell profiles
Both `~/.bashrc` and `~/.zshrc` SHALL export `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` so that Wrangler CLI, Makefile, and MCP all authenticate automatically without per-command flags.

#### Scenario: Variables available in a new terminal session
- **WHEN** a new terminal is opened (bash or zsh)
- **THEN** `echo $CLOUDFLARE_API_TOKEN` and `echo $CLOUDFLARE_ACCOUNT_ID` return non-empty values

#### Scenario: Wrangler authenticates without flags
- **WHEN** `npx wrangler pages deploy .` is run with no auth flags
- **THEN** Wrangler reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from the environment and authenticates successfully

#### Scenario: Setup is idempotent
- **WHEN** the export lines are appended to shell profiles a second time
- **THEN** the shell does not error and the variables are not duplicated in the environment (guard with `grep` check before appending)

### Requirement: API Token has minimum required permissions
The `CLOUDFLARE_API_TOKEN` value SHALL be a scoped API Token (not a global API Key) with at minimum `Cloudflare Pages: Edit` and `Account: Read` permissions.

#### Scenario: Token is not a global API Key
- **WHEN** the token is inspected in the Cloudflare dashboard
- **THEN** it appears under API Tokens (not API Keys) and has explicit permission scopes listed
