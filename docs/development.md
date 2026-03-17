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

## AI-Powered Development

This project includes **agentic skills** to streamline development workflows for AI-assisted environments.

### Available Skills

- **Branch Summarizer** – Generates a high-level overview of changes between the current branch and `main` or `develop`.
  - **Trigger**: "Summarize branch"
- **Staged Summarizer** – Generates high-quality Conventional Commit messages for currently staged work.
  - **Trigger**: "Summarize staged for commit"
- **i18n Assistant** – Extracts and manages translations for UI strings using `next-intl`.
  - **Trigger**: "Translate/extract UI strings"
- **ADR Writer** – Drafts and manages Architectural Decision Records (ADRs).
  - **Trigger**: "Draft a new ADR"

### Setup

These skills are defined in `.gemini/skills` and are compatible with AI agents like [Gemini CLI](https://github.com/google/gemini-cli). To enable them in your session:

```bash
/skills reload
```

## Pull Requests

Pull requests automatically create preview deployments via Vercel.

Commits to main trigger production deployment.
