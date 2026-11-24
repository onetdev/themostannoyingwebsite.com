---
name: quick-iterator
description: Fast build-verify loop for iterative design work. Use when requirements are still moving, the user is choosing between variants, or they ask to just build the output and polish later. Defers docs, ADRs, new tests and E2E until the shape freezes.
---

# Quick Iterator

Purpose: spend iterations on **output**, not on artifacts that get rewritten every time the shape changes.

## When to enter

- The user is still choosing between variants (copy, layout, interaction, data source).
- Requirements changed within the last exchange.
- The user says "just build it", "iterate first", or "don't worry about docs/tests yet".

State that you are in iteration mode and name what is deferred.

## Loop (per iteration)

1. Re-read the current request; restate the intended output change in one sentence.
2. Edit only the files that produce that output.
3. Run the cheap gates in this order, stopping at the first failure:
   - `pnpm --filter @maw/web check-types`
   - `pnpm exec biome check <changed files>` (full `pnpm lint:fix` only at freeze)
   - `pnpm exec jest --runTestsByPath <touched test>` when existing logic is affected
4. Show the result in output terms (route, screenshot, rendered change, diff).

Do **not** write during iteration: ADRs, `AGENTS.md`/`docs/` edits, new test files, PR descriptions, or Playwright runs.

## Two exceptions worth writing immediately

Both are cheap and catch defects that visual review misses:

- **Exact numeric or layout contracts** — one assertion for a pixel offset, class token, or ordering.
- **Inventory contracts** — an assertion that a required link, route, or label exists.

## Exit: freeze checklist

Enter freeze when the user accepts the output or asks to ship, commit, or open the PR.

1. Full existing suite (`pnpm test`) + `check-types` + production build.
2. New unit tests for new logic.
3. Playwright coverage for the user-visible flow.
4. Update the `AGENTS.md`/`docs/` that describe the changed behavior.
5. ADR only if an architectural choice was actually made.
6. Biome, then commit and PR sync.

The "every new feature or bug fix must have a test" rule in `apps/web/AGENTS.md` is a **merge gate**. This skill moves it from "per iteration" to "at freeze"; it never removes it.

## Reporting

- Lead with what changed for the user, not the process.
- State which gates ran and their result.
- List deferred docs/tests by name so they are not lost at freeze time.

## Anti-patterns

- Writing an ADR for a shape that changed twice already.
- Re-running the whole suite after a copy tweak.
- Starting Playwright before type check passes.
- Leaving temporary verification snippets or scratch configs in the tree.
- Killing a process that owns a port you did not start.
- Claiming "verified" from a build log you did not read.
