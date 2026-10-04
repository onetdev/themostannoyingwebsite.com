# Development Guide

This document describes how to work with the project locally.

## Requirements

- Node.js (version defined in `mise.toml`)
- pnpm

A version manager such as **mise**, **nvm**, or similar is recommended.

## Installing Dependencies

From the repository root:

```bash
pnpm install
```

Running the Development Server

```bash
pnpm dev
```

Open:

```
https://localhost:3000
```

HTTPS is required because some browser APIs used by the project only work in secure contexts.

### Content API and CORS

The headless Content API rejects `localhost` origins in production. During
`pnpm dev`, browser-side Content API requests (article search, plus anything
resolved through the client DI container) are therefore sent to the same-origin
path `/api/content`, which the Next.js dev server proxies to the API without the
browser's `Origin` header. The shared factory lives in `src/core/content`, and
the development-only proxy route handler in
`apps/web/src/app/api/content/[...path]/route.ts`; see
`adr/0024-dev-content-api-proxy.md`. A local `next build && next start` does not
use the proxy.

## Monorepo Scripts

Common workspace scripts:

```
pnpm dev       – run development server
pnpm build     – build all packages
pnpm test      – run unit tests
pnpm test:e2e  – run end-to-end tests
pnpm lint      – run Biome
pnpm lint:fix  - run Biome and apply safe fixes
pnpm next experimental-analyze - analyze bundle size (in apps/web)
```

## Storybook

UI components can be explored via Storybook:

```
apps/ui-docs
```

Run:

```bash
pnpm dev --filter ui-docs
```

## Code Quality

The project uses:
- Biome for formatting and linting
- TypeScript for static typing

Before committing changes, ensure the code passes linting and tests.

### Dependency Documentation

Third-party API usage must come from the installed package, not from
training-data memory. Consult sources in this order:

1.  Bundled docs, types, and source under `node_modules/<pkg>` (e.g.
    `node_modules/next/dist/docs/`).
2.  The resolved version in `pnpm-workspace.yaml` (catalog) and the consuming
    `package.json`.
3.  The upstream official docs, changelog, and migration guide for that major.

Follow the installed API, heed deprecation notices, and never hand-edit
generated guidance or artifacts — regenerate them. See the root `AGENTS.md`
section "Third-Party Dependencies" for the full rule.

## AI-Powered Development

This project includes **agentic skills** to streamline development workflows for AI-assisted environments.

### Available Skills

- **git-commit** – Reviews staged work, writes a Conventional Commit message, and creates a local commit without pushing.
  - **Trigger**: "Commit these changes"
- **git-pr-sync** – Reviews branch commits, composes PR documentation, and opens or updates a draft PR via the GitHub CLI.
  - **Trigger**: "Sync the PR"
- **i18n-assistant** – Extracts and manages translations for UI strings using `next-intl`.
  - **Trigger**: "Translate/extract UI strings"
- **adr-writer** – Drafts and manages Architectural Decision Records in `adr/`.
  - **Trigger**: "Draft a new ADR"
- **audit-resolve** – Audits and upgrades dependencies to resolve security vulnerabilities.
  - **Trigger**: "Fix dependency vulnerabilities"
- **dependency-upgrade** – Bumps dependency versions across the monorepo and verifies the repository.
  - **Trigger**: "Upgrade dependencies"

### Setup

These skills are defined in `.agents/skills` and are loaded by compatible AI agents when the task
matches a skill's description.

## Pull Requests

Pull requests automatically create preview deployments via Vercel.

Commits to main trigger production deployment.
