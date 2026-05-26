## ADDED Requirements

### Requirement: GitHub Actions workflow deploys on push to master
The repo SHALL contain `.github/workflows/deploy.yml` that triggers on every push to `master` and deploys the site to Cloudflare Pages using `cloudflare/wrangler-action@v3`.

#### Scenario: Push to master triggers deployment
- **WHEN** a commit is pushed to `origin/master`
- **THEN** the `deploy` GitHub Actions job starts automatically within seconds

#### Scenario: Deployment succeeds with valid secrets
- **WHEN** `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set as GitHub repository secrets and the workflow runs
- **THEN** `wrangler pages deploy` completes successfully and the updated site is live at the Pages URL

#### Scenario: Workflow uses wrangler-action@v3 (not deprecated pages-action)
- **WHEN** the workflow YAML is inspected
- **THEN** it references `cloudflare/wrangler-action@v3`, not the archived `cloudflare/pages-action`

#### Scenario: GitHub Deployments integration is active
- **WHEN** the workflow completes
- **THEN** a deployment entry appears in the GitHub repository's Environments / Deployments tab with a link to the live Pages URL

### Requirement: Workflow uses repository secrets for credentials
The workflow SHALL read `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from GitHub repository secrets — never hardcoded in the YAML.

#### Scenario: Secrets are referenced via secrets context
- **WHEN** the workflow YAML is inspected
- **THEN** credentials appear as `${{ secrets.CLOUDFLARE_API_TOKEN }}` and `${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`

#### Scenario: Workflow fails with missing secrets
- **WHEN** a secret is missing or empty
- **THEN** the `wrangler pages deploy` step exits with a non-zero code and the job is marked failed (no silent deployment to wrong account)

### Requirement: Workflow deploys repo root as publish directory
The workflow SHALL deploy `.` (repo root) as the directory, matching the `wrangler.toml` configuration and the `make deploy` Makefile target.

#### Scenario: Publish directory is repo root
- **WHEN** the workflow YAML is inspected
- **THEN** the wrangler command is `pages deploy . --project-name=analizza-ai`, not a subdirectory
