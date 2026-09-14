# ADR 21: Git Governance and Automated Quality Gates with Lefthook and Commitlint

## Status
Accepted

## Context
In a Turborepo monorepo with multiple packages, active cross-feature development, and automated contributions from both human engineers and AI coding agents, inconsistent commit messages, unformatted code, and broken builds can quickly pollute git history and degrade developer productivity.

Relying solely on CI pipelines to catch formatting, linting, and commit conventions results in slow feedback loops and frequent rework. We needed fast, automated client-side gates that guarantee that any commit entering the repository meets our code quality and commit standards.

## Decision
We adopted **Lefthook** as our git hook manager, combined with **Commitlint** and Conventional Commits:

1. **Pre-Commit Hook**:
   - Executes `biome check --write --no-errors-on-unmatched` on all staged files.
   - Automatically re-stages fixed files (`stage_fixed: true`) so developers and agents don't have to manually re-add them.
2. **Commit-Message Hook**:
   - Executes `@commitlint/cli` using `@commitlint/config-conventional` via [`/commitlint.config.cjs`](/commitlint.config.cjs).
   - Validates `<type>(<scope>): <subject>` format (e.g., `feat(disruptions): ...`, `fix(auth): ...`), rejecting non-standard commit messages.
3. **Pre-Push Hook**:
   - Runs `pnpm build` and `pnpm test` across the monorepo via Turborepo pipelines to ensure no breaking changes or failing tests are pushed to remotes.
4. **Agent Skill Support**:
   - Standardized via the `staged-summarizer` skill to ensure AI agents consistently craft high-quality Conventional Commit messages matching the commitlint specification.

## Consequences
- **Pros**: Catches errors immediately on the developer's machine before CI runs; ensures clean and uniform git history for automated changelog generation; fast execution thanks to Lefthook (Go-based) and Biome.
- **Cons**: Pre-push builds and tests can introduce slight delays when pushing large refactors; requires local installation of hooks via `pnpm prepare` (`lefthook install`).
