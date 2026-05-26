## ADDED Requirements

### Requirement: Cloudflare Pages project config
The repo SHALL contain a `wrangler.toml` file declaring the Cloudflare Pages project name and publish directory so deployment config is reproducible from the codebase.

#### Scenario: wrangler.toml exists at repo root
- **WHEN** a developer checks out the repo
- **THEN** `wrangler.toml` is present at the root with `name`, `compatibility_date`, and `pages_build_output_dir = "."`

#### Scenario: wrangler CLI can deploy from wrangler.toml
- **WHEN** `wrangler pages deploy` is run in the repo root
- **THEN** the CLI reads `wrangler.toml` and deploys the root directory contents to the configured Pages project without additional flags

### Requirement: Master branch triggers automatic deployment
The Cloudflare Pages project SHALL be connected to the GitHub repository such that every push to the `master` branch triggers an automatic production deployment.

#### Scenario: Push to master deploys the site
- **WHEN** a commit is pushed to `origin/master`
- **THEN** Cloudflare Pages detects the push and deploys the updated files within ~60 seconds

#### Scenario: Site is accessible after first deploy
- **WHEN** the first push to `master` completes and Cloudflare Pages finishes building
- **THEN** the site is reachable at `https://<project-name>.pages.dev` with a valid HTTPS certificate

### Requirement: Static files served from repo root
The Pages project SHALL serve files directly from the repository root (no build step), making `index.html`, `styles/tokens.css`, and `assets/*` all publicly accessible.

#### Scenario: index.html served at root URL
- **WHEN** a browser requests `https://<project-name>.pages.dev/`
- **THEN** the server responds with the contents of `index.html` and HTTP 200

#### Scenario: Assets served at their relative paths
- **WHEN** a browser requests `https://<project-name>.pages.dev/styles/tokens.css`
- **THEN** the server responds with the CSS file and HTTP 200

#### Scenario: Favicon served correctly
- **WHEN** a browser requests `https://<project-name>.pages.dev/assets/favicon.svg`
- **THEN** the server responds with the SVG favicon and HTTP 200
