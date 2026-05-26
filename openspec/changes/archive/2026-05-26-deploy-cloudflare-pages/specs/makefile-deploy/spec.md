## ADDED Requirements

### Requirement: Makefile with deploy target
The repo SHALL contain a `Makefile` at the root with a `deploy` target that runs `wrangler pages deploy` pointing at the project root, equivalent to what GitHub Actions runs in CI.

#### Scenario: make deploy pushes site to Cloudflare Pages
- **WHEN** `make deploy` is run in the repo root with valid credentials in the environment
- **THEN** Wrangler uploads the static files to the Cloudflare Pages project and prints a deployment URL

#### Scenario: make deploy fails clearly without credentials
- **WHEN** `make deploy` is run without `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` set
- **THEN** Wrangler exits with a non-zero code and prints an authentication error (not a silent failure)

#### Scenario: make deploy targets the correct project
- **WHEN** `make deploy` is run
- **THEN** the deployment targets the `analizza-ai` Pages project on the `master` branch

### Requirement: Makefile is self-documenting
The `Makefile` SHALL include a `help` target (or inline comments) so a developer running `make` or `make help` sees available targets and their purpose.

#### Scenario: make help lists available targets
- **WHEN** `make help` is run
- **THEN** the terminal prints at least the `deploy` target with a one-line description
