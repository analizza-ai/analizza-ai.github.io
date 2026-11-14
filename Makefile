.PHONY: help test deploy

help: ## Show available targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

test: ## Run tests
	node --test tests/*.test.js

deploy: ## Deploy site to Cloudflare Pages
	npx wrangler pages deploy . --project-name=analizza-ai --branch=master --commit-dirty=true
