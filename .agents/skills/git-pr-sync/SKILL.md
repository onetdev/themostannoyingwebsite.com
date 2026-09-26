---
name: git-pr-sync
description: Reviews commits in the current branch against base (default: develop), pushes to origin, composes a comprehensive PR description matching the repository template, and creates a draft PR or updates an existing PR using the GitHub CLI (gh).
---

# Git PR Sync

## Overview

This skill automates the creation and synchronization of Pull Requests using the GitHub CLI (`gh`). It reviews all commits on the current working branch against the base branch (default: `develop`), pushes the branch to remote, composes a detailed PR title and body adhering to [`.github/pull_request_template.md`](../../../.github/pull_request_template.md), and opens a new **Draft PR** or updates an existing open PR.

## Guidelines

- **Prerequisites**:
  - Requires the GitHub CLI (`gh`) to be installed and authenticated (`gh auth status`).
  - If `gh` is missing, inform the user to install it (e.g. `brew install gh`) and authenticate with `gh auth login`, then exit.
- **Branch Constraints**:
  - Never run this skill on protected base branches (`develop` or `main`).
  - Default base branch is `develop` unless explicitly specified otherwise by the user.
- **Remote Push & Divergence**:
  - Always push branch commits to `origin` before creating or updating the PR: `git push -u origin <branch>`.
  - If the push fails due to divergence (non-fast-forward / remote changes), **stop immediately and prompt the user** to resolve divergence before continuing.
- **PR Title**:
  - Must follow the **Conventional Commits** specification: `<type>(<optional-scope>): <subject>`.
  - Derived from the primary branch commits or overarching purpose of the branch.
- **PR Body**:
  - Strictly follows the structure in [`.github/pull_request_template.md`](../../../.github/pull_request_template.md).
  - Keeps **only** the relevant subsections under `## Key Changes` (e.g. omit `Features` if the PR is a pure refactor or bug fix).
  - Includes explicit assessments for `User-facing`, `Developer-facing`, and `Risk` in the `## Impact` section.
  - Marks completed checklist items with `[x]`.
  - **Never hard-wrap body lines and never impose a line-length limit.** Write **one line per paragraph** and **one line per bullet**, no matter how long. Markdown soft-wraps when rendered, and the repo's existing PRs are written unwrapped.
  - The 100-character line limit is a **Conventional Commit** rule and applies to commit messages only (see the `git-commit` skill) — do **not** carry it over to PR bodies.
- **Draft Status**:
  - When opening a **new** PR, always create it in **Draft** mode (`--draft`).
  - When updating an **existing** PR, preserve its existing state and update its title and body.
- **Conciseness & High Signal**:
  - Aim for concise, high-signal descriptions; do not over-explain minor code edits, mechanical formatting, or trivial tweaks.
  - Focus squarely on primary features, bug resolutions, design decisions, and architectural/user implications.

## Workflow

### 1. Pre-Flight Verification
1. Check `gh` installation:
   ```bash
   command -v gh || echo "GH_MISSING"
   ```
   If missing, prompt the user:
   > "GitHub CLI (`gh`) is not installed. Please install it (e.g. `brew install gh`) and run `gh auth login` to use the `git-pr-sync` skill."
2. Check `gh` authentication:
   ```bash
   gh auth status
   ```
3. Check current branch:
   ```bash
   git branch --show-current
   ```
   If on `develop` or `main`, abort and warn the user.

### 2. Push to Remote & Check Divergence
Push current branch commits to the remote:
```bash
git push -u origin HEAD
```
If the command fails due to remote divergence:
- Prompt the user: `"The local branch has diverged from remote. Please pull, rebase, or resolve divergence with origin before syncing the PR."`
- Stop execution.

### 3. Review Branch Commits & Diffs
Fetch the latest base branch and inspect the changes:
```bash
git fetch origin develop
git log --no-merges origin/develop..HEAD --oneline
git diff --stat origin/develop..HEAD
```
- If no commits exist between `origin/develop` and `HEAD`, inform the user that the branch has no new commits compared to `develop` and exit.
- Inspect full commit details and code diffs as needed (`git log -n 10 origin/develop..HEAD` and `git diff origin/develop..HEAD`).

### 4. Compose PR Title and Body
Follow [`.github/pull_request_template.md`](../../../.github/pull_request_template.md) and [`references/pr-format.md`](references/pr-format.md):
- **Title**: `<type>(<optional-scope>): <subject>`
- **Line width**: keep each paragraph and each bullet on a **single line**. Do not hard-wrap and do not target any column limit.
- **Body**:
  ```markdown
  ## Summary

  <1-2 paragraphs describing what this PR accomplishes, why it was needed, and architectural context>

  ## Key Changes

  <!-- Include only applicable sections -->
  ### 🚀 Features
  - <feature details>

  ### 🐛 Fixes
  - <fix details>

  ### 🧹 Chores & Refactors
  - <refactor/tooling details>

  ### 🧪 Tests
  - <test suite details>

  ### 📚 Documentation
  - <doc / ADR details>

  ## Impact

  - **User-facing**: <UX, UI, or behavioral impact, or "None">
  - **Developer-facing**: <Architecture, APIs, DX impact, or "None">
  - **Risk**: <Low / Medium / High + risk rationale and blast radius>

  ## Checklist

  - [x] Tests updated and passing locally
  - [x] Documentation updated (if applicable)
  - [x] Localization extracted (if applicable)
  ```

### 5. Create or Update PR via `gh`
1. Check if an open PR exists for this branch:
   ```bash
   gh pr list --head "$(git branch --show-current)" --json number,title,url,state --jq '.[0]'
   ```
2. **If an open PR exists** (e.g. PR #123):
   Update the title and body using a temporary file:
   ```bash
   gh pr edit <PR_NUMBER> --title "<TITLE>" --body-file <TEMP_BODY_FILE>
   ```
3. **If no open PR exists**:
   Create a new Draft PR targeting `develop`:
   ```bash
   gh pr create --draft --base develop --title "<TITLE>" --body-file <TEMP_BODY_FILE>
   ```
4. Clean up any temporary body files used during execution.
5. Provide the PR URL, title, and summary back to the user.
