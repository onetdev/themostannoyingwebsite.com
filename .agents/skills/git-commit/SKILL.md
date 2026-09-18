---
name: git-commit
description: Reviews staged work, writes a Conventional Commit message (with automatic scope detection and optional body for extra details), and creates a local git commit without pushing.
---

# Git Commit

## Overview

This skill standardizes the creation of local Git commits from currently staged work following the **Conventional Commits** specification. It automatically detects optional scopes, formats the commit header, supports an optional detailed body, and executes the local commit.

> [!IMPORTANT]
> **Strict No-Push Policy**: This skill **ONLY** creates a local commit (`git commit`). It must **NEVER** execute `git push`.

## Guidelines

- **Format**: `<type>(<scope>): <subject>` or `<type>: <subject>` (when no scope applies).
- **Line Limit**: Maximum 100 characters per line for both subject and body.
- **Tense**: Use the imperative, present tense ("add", not "added" or "adds").
- **Case**: The subject line must start with a lowercase character.
- **Punctuation**: Do not place a period (`.`) at the end of the subject line.
- **Staged Work Only**:
  - Review only changes already staged in the Git index (`git diff --staged`).
  - Do NOT stage unstaged files (`git add`) automatically.
  - If no changes are staged, report that and exit without committing.
- **Optional Scope Detection**:
  - Automatically infer the scope by inspecting the paths of staged files.
  - Omit the scope if changes span multiple disparate packages or root project files.
- **Optional Body**:
  - Include an explanatory body when changes involve complex rationale ("why"), architectural considerations, or multiple specific sub-tasks.
  - Separate header and body by an empty line.
  - Wrap all lines in the body at 100 characters.

## Scope Detection Rules

Inspect staged paths using `git diff --staged --name-only` or `git status --short`:

| Staged Files Location | Detected Scope |
| :--- | :--- |
| `apps/web/src/features/<feature>/...` | `<feature>` (e.g., `disruptions`, `auth`, `captcha`) |
| `apps/web/...` (general or cross-feature) | `web` |
| `packages/ui-lib/...` | `ui-lib` |
| `packages/content-sdk/...` | `content-sdk` |
| `packages/logger/...` | `logger` |
| `packages/utils/...` | `utils` |
| `apps/ui-docs/...` | `ui-docs` |
| `adr/...` | `adr` |
| `.agents/skills/...` | `skills` |
| `.github/...` | `ci` |
| `pnpm-lock.yaml`, `package.json` | `deps` |
| `lefthook.yml`, `commitlint.config.cjs` | `git-hooks` |
| Root markdown documentation (`*.md`) | `docs` |
| Multiple packages / cross-monorepo changes | *Omit scope* (e.g., `feat: ...`, `fix: ...`) |

## Conventional Commit Types

- **`feat`**: A new user-facing or developer feature.
- **`fix`**: A bug fix.
- **`chore`**: Maintenance, build process, auxiliary tooling, dependency bumps.
- **`refactor`**: Code changes that neither fix a bug nor add a feature.
- **`docs`**: Documentation only changes.
- **`style`**: Changes that do not affect code logic (formatting, semi-colons, whitespace).
- **`perf`**: A code change that improves performance.
- **`test`**: Adding missing tests or correcting existing tests.
- **`ci`**: Changes to CI/CD workflows and configuration files.

## Workflow

1. **Inspect Staged Changes**:
   - Run `git status --short` and `git diff --staged --name-only`.
   - If nothing is staged, inform the user: `"No staged changes found. Please stage changes with git add before committing."` and stop.
2. **Review Diff & Detect Scope**:
   - Run `git diff --staged` to examine changes in detail.
   - Detect the appropriate type (`feat`, `fix`, `chore`, etc.) and optional scope using the Scope Detection Rules.
3. **Draft Commit Message**:
   - Formulate a concise subject line ($\le 100$ characters).
   - If extra details or context are needed, draft an optional body separated by an empty line, with all lines $\le 100$ characters.
4. **Execute Local Commit**:
   - Create the commit using `git commit -m "<subject>"` or `git commit -m "<subject>" -m "<body>"`.
   - Ensure local Git hooks (Lefthook pre-commit Biome checks and commitlint validation) pass successfully.
5. **Report to User**:
   - Show the resulting commit hash and message.
   - **DO NOT PUSH.** Remind or leave pushing to the user's manual action.

## Examples

### Example 1: Scoped without body
```
feat(web): add sticky header support for desktop viewports
```

### Example 2: Feature-scoped with body
```
fix(disruptions): prevent audio overlapping on rapid trigger events

- debounce trigger event handler to prevent multiple audio instances
- ensure previous audio node is disposed before playing new sound
```

### Example 3: Unscoped without body
```
docs: update monorepo contributing guide and agent rules
```

### Example 4: Dependency update with body
```
chore(deps): bump tailwindcss and related tooling

upgrade dependencies to latest minor versions and align biome configuration
across all workspace packages.
```
