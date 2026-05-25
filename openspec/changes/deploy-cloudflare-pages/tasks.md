## 1. Repo Setup

- [ ] 1.1 Initialize git repo (`git init`) if not already initialized
- [ ] 1.2 Create initial commit with all current files (`index.html`, `styles/`, `assets/`, `openspec/`)
- [ ] 1.3 Add GitHub remote (`git remote add origin <repo-url>`)
- [ ] 1.4 Push to `master` branch (`git push -u origin master`)

## 2. Cloudflare Pages Config

- [ ] 2.1 Create `wrangler.toml` at repo root with project name, compatibility date, and `pages_build_output_dir = "."`
- [ ] 2.2 Commit `wrangler.toml` to the repo

## 3. Cloudflare Pages Project

- [ ] 3.1 Log in to Cloudflare dashboard and create a new Pages project connected to the GitHub repo
- [ ] 3.2 Set production branch to `master`, build command to empty (none), build output directory to `/` (root)
- [ ] 3.3 Confirm first deployment completes and site is live at `https://<project-name>.pages.dev`

## 4. Verify Deployment

- [ ] 4.1 Confirm `index.html` loads at root URL with HTTP 200
- [ ] 4.2 Confirm `styles/tokens.css` and `assets/favicon.svg` resolve correctly
- [ ] 4.3 Make a small test commit and push to `master`; verify Cloudflare Pages auto-redeploys
