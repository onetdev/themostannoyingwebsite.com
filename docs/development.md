# Development Guide

This document describes how to work with the project locally.

## Requirements

- Node.js and pnpm (versions defined in `mise.toml`)

This project uses **mise** as its version manager. Run `mise install` from the
repository root to provision the pinned Node.js and pnpm versions. A plain Node
install works too, but keep pnpm in sync with the `packageManager` field in
`package.json`.

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

The headless Content API's CORS allowlist accepts any
`*.themostannoyingwebsite.com` origin, on any scheme and port. It rejects
`localhost` and `127.0.0.1`. Browser requests go **directly** to
`NEXT_PUBLIC_CONTENT_API_URL`; there is no same-origin proxy.

For local development, point the app at the deployed dev API and serve it from
the allowlisted local hostname:

```bash
export NEXT_PUBLIC_CONTENT_API_URL=https://dev.content.themostannoyingwebsite.com
pnpm dev
# open https://local.themostannoyingwebsite.com:3000
```

Point the local hostname at the loopback interface once:

```
# /etc/hosts
127.0.0.1 local.themostannoyingwebsite.com
```

`pnpm dev` runs with `--experimental-https`; its self-signed certificate triggers
a browser warning, which Playwright already tolerates via `ignoreHTTPSErrors`.
Production-build runs (`next build && next start`) use the same hostname with
`http://local.themostannoyingwebsite.com:3000`.

`localhost` and `127.0.0.1` cannot call the deployed APIs, so opening
`https://localhost:3000` breaks browser-side search, comments, and feeds with
`403 CORS_ORIGIN_DENIED`. To keep using the local Content API directly, set
`NEXT_PUBLIC_CONTENT_API_URL=http://localhost:3012`; its development CORS policy
accepts localhost, and Chromium permits the mixed-content localhost request.

Playwright reads the origin from `PLAYWRIGHT_BASE_URL`; without it, specs that
trigger browser-side Content API calls will see CORS failures rather than app
errors.

## Monorepo Scripts

Common workspace scripts:

```
pnpm dev       – run development server
pnpm build     – build all packages
pnpm test      – run unit tests
pnpm test:e2e  – run end-to-end tests (set PLAYWRIGHT_BASE_URL to the local hostname)
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

### Function Shape & Iteration

Prefer small, single-purpose functions and extract nested iteration into named
helpers at their natural boundary rather than lifting the innermost loop. Keep
helpers to **≤ 4 positional parameters** (pass one options object when more
context is needed) and give every extracted iteration helper a co-located test.

```ts
// Before: nested loops inside a larger function.
for (const locale of locales) {
  for (const author of authors) paths.push({ slug: author.slug, locale });
}

// After: the enclosing iteration is a named, testable builder.
const buildLocalizedEntries = (locales, items) =>
  locales.flatMap((locale) =>
    items.map((item) => ({ slug: item.slug, locale })),
  );
```

See the root `AGENTS.md` → "Function Shape & Iteration" for the full rule.

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
- **shadcn** – Adds, fixes, and composes shadcn/ui components in `@maw/ui-lib`.
  - **Trigger**: "Add a shadcn component"
- **quick-iterator** – Keeps the loop on runnable output while requirements are still moving, deferring docs, ADRs, tests, and E2E to a freeze checklist.
  - **Trigger**: "Just build it", "iterate first", or requirements changing between exchanges

### Setup

These skills are defined in `.agents/skills` and are loaded by compatible AI agents when the task
matches a skill's description.

## Pull Requests

Pull requests automatically create preview deployments via Vercel.

Commits to main trigger production deployment.
