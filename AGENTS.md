# AI Agent Guide - MAW Monorepo

Welcome! This document provides high-level context, architecture rules, and tool descriptions for AI agents working on "The Most Annoying Website" monorepo.

---

## 🏗 Project Architecture

This is a **Turborepo** monorepo managed with **pnpm**.

### Core Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict)
- **Styling:** TailwindCSS 4 (Semantic Tokens)
- **Linting/Formatting:** Biome

### Workspace Structure
- `apps/web`: The main Next.js application. (See `apps/web/AGENTS.md` for specific rules).
- `apps/ui-docs`: Storybook for the design system.
- `packages/ui-lib`: Shared UI components (shadcn-based).
- `packages/content-api`: Static content management.
- `packages/logger`: Shared logging utility.
- `packages/utils`: General helper functions.
- `packages/config-*`: Shared configurations (Jest, TS).

---

## 🛠 Specialized Agent Skills

The project includes specialized skills that you SHOULD use for specific tasks. Activate them via `activate_skill`.

- **`i18n-assistant`**: Use for extracting, managing, and translating user-facing strings.
- **`branch-summarizer`**: Use to generate a markdown summary of the current branch's changes compared to a target branch.
- **`staged-summarizer`**: Use to generate high-quality, Conventional Commit messages for staged work.
- **`adr-writer`**: Use to draft and manage Architectural Decision Records in the `adr/` folder.

---

## 📏 Development Standards

### Conventional Commits
All commits must follow the Conventional Commits specification.
- **Format:** `<type>(<scope>): <subject>`
- **Types:** `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`, `ci`, `perf`.
- **Subject:** Lowercase, no period at the end.

### Formatting & Linting
We use **Biome**. Before finishing any task, ensure the code is clean:
```bash
pnpm lint:fix
```

### Testing
- **Unit/Integration:** Using Jest. Run with `pnpm test`.
- **E2E:** Using Playwright. Run with `pnpm test:e2e`.

### Internationalization (i18n)
**NEVER** hardcode user-facing strings. Use the `i18n-assistant` skill or refer to `apps/web/AGENTS.md` for the localization workflow.

---

## ⚠️ Agent Directives & Safety

1.  **Surgical Changes:** Minimize changes to only what is necessary for the task.
2.  **Verify & Validate:** Always run tests and linting after making changes.
3.  **No Secrets:** Never log or commit API keys, secrets, or sensitive info.
4.  **Idiomatic Code:** Match the existing patterns (DI, feature-sliced, etc.) in the workspace.
5.  **Documentation:** Keep ADRs and internal docs (`AGENTS.md`, `README.md`) updated.
