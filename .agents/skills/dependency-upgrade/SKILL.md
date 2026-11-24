---

name: dependency-upgrade
description: Upgrade dependency versions across the monorepo in verified groups, including major bumps, security overrides, and the Node/pnpm toolchain. Use when the user wants to bump dependency versions (patch, minor, or major) and verify the repository still works.
---

# Dependency Upgrade

Upgrade dependencies in logical groups, verifying and checkpointing each group so
a failure is attributable to one batch instead of the whole tree.

## 0. Preflight

- **Agree the scope.** Establish the bump type (`patch`, `minor`, `major`, or
  "everything"). For "everything", explicitly confirm that majors and pre-1.0
  `0.x` minors are in scope — they are breaking by definition.
- **Activate the pinned toolchain.** The repo pins Node and pnpm in `mise.toml`.
  In non-interactive shells run `eval "$(mise env)"` before anything else, then
  confirm `node -v` and `pnpm -v` match `mise current`. Otherwise a stale version
  from session start silently runs the whole upgrade. Git hooks inherit the same
  `PATH`: lefthook's pre-push runs `build` + `test`, so a stale Node fails the
  push (not the upgrade) — fix `PATH`, never `--no-verify`.
- **Create the branch** `chore/dep-upgrade-<yymmdd>`. Untracked files are fine;
  note them so they are never staged accidentally.
- **Capture a baseline.** Run the verification suite on the untouched tree and
  record pass/fail plus warning counts. Pre-existing warnings must not be
  blamed on an upgrade.
- **Know the verification prerequisites.** `@maw/web` `lint`, `check-types`, and
  `build` all depend on `build:metadata`, which fetches locales from the
  configured Content API (`NEXT_PUBLIC_CONTENT_API_URL`, the deployed dev API by
  default) and fails the build when it is unreachable. Either ensure the API is
  reachable or set `ALLOW_LOCALES_FALLBACK=true` (documented escape hatch, see
  `adr/0023-build-time-locale-catalog.md`) and disclose that in the report.

## 1. Inventory

- Run `pnpm outdated -r` for current vs latest per dependent.
- Registry metadata can lag: confirm majors and recently published versions with
  `npm view <pkg> version`. A package released hours ago may not appear in the
  `outdated` table.
- Read the `catalog` in `pnpm-workspace.yaml` and every `package.json`. Note
  which entries are exact pins, which are ranges, and which are `"catalog:"`.
- Cross-check [dependency-groups.md](references/dependency-groups.md) against
  those manifests: prune packages that are no longer declared and add new ones
  before starting.

## 2. Group

Follow [dependency-groups.md](references/dependency-groups.md) for membership,
execution order, and the isolation rule for majors / pre-1.0 minors.

For each group, list package name, current version, and target version before
editing anything.

## 3. Process A Group

### 3.1 Resolve & Research

- For every `major` and every `0.x` minor, read the upstream changelog and
  migration guide (repo releases, `npm view <pkg> homepage`). Record the
  breaking changes that could touch this repo.
- Prefer the installed package's docs and types over training data, per the root
  `AGENTS.md` → "Third-Party Dependencies".

### 3.2 Update Files

- Edit `pnpm-workspace.yaml` (catalog) and the owning `package.json` files.
- Preserve pin style: an exact pin stays exact, a range stays a range, and
  `"catalog:"` references are never replaced with a version.
- Quote every catalog key and specifier with double quotes; `true` / `false` in
  `allowBuilds` stay literal booleans. Quoting is not cosmetic: an unquoted
  two-segment version such as `1.20` parses as the float `1.2`, silently
  changing the specifier.
- A catalog entry only takes effect if its specifier text changes; editing the
  workspace `package.json` is rarely needed for catalogued packages.

### 3.3 Install & Confirm Resolution

- Run `pnpm install`.
- Confirm the _resolved_ versions, not the declared ones:
  `pnpm -r list <pkg> --depth 0`.
- A large `+N -M` package delta is a signal, not automatically an error —
  inspect it (transitive churn from a CLI/tooling bump is normal) before
  proceeding.

### 3.4 Verify

Run sequentially and stop on the first failure:

1. `pnpm run lint`
2. `pnpm run check-types`
3. `pnpm run test`
4. `pnpm run build`

Turborepo may serve cached results. A cache hit is only meaningful if the inputs
changed; after a toolchain-only change (e.g. a Node version bump) force a real
run before trusting it.

### 3.5 Checkpoint

Create one Conventional Commit per green group. This makes rollback
`git reset --hard <checkpoint>` instead of reverse-patching several manifests.
Squash the checkpoints at the end if the user prefers a single commit; stop
before committing only if asked.

### 3.6 On Failure

Revert that group's changes only, then report: the failing command, the exact
error, the suspected cause, and the proposed fix. Ask before continuing. Do not
"fix" a newly surfaced warning or behaviour change silently — attribute it first
(see §6).

## 4. Review Dependency Overrides

Overrides are debt with an expiry condition. Treat them as part of every upgrade,
not only when an advisory fires.

- **Before starting**, inventory existing `overrides` in `pnpm-workspace.yaml`.
- **After the groups are upgraded**, re-check each one with `pnpm why <pkg> -r`.
  If the vulnerable range is no longer reachable, remove the override — removal
  is the expected outcome of a healthy upgrade.
- **Prefer an in-range update** (`pnpm update <pkg> -r`) over adding an override.
- **A new override is the last resort**, only when no parent accepts a patched
  version. When adding one:
  - use a range selector rather than an exact version, e.g.
    `"glob@>=9.0.0 <14.0.2": "14.0.6"`, so future vulnerable versions are covered
    automatically;
  - put an inline comment above it naming the advisory and the condition under
    which it can be removed (which parent/version would make it unnecessary);
  - re-run the full verification suite, because forcing a major version across a
    declared range can break consumers.
- **Report** overrides as `added` / `kept` / `removed`, with the reason for each
  kept override. Pair with the `audit-resolve` skill when advisories exist.

## 5. Audit

- Run `pnpm audit` after the dependency work, and finish at zero known
  vulnerabilities or an explicitly documented blocker.
- `pnpm audit --json` keys advisories by numeric ID; use
  `module_name` / `vulnerable_versions` / `patched_versions` to build the plan.

## 6. Toolchain Bumps

Only when the user asks, or when the upgrade requires it.

- **Package manager** (`packageManager`): pnpm records the managed version in the
  lockfile under `packageManagerDependencies`, so expect lockfile churn. CI's
  `pnpm/action-setup` reads `packageManager`, so no workflow edit is needed, but
  `pnpm install --frozen-lockfile` must pass with the committed lockfile.
- **Node major**: update `mise.toml`, every CI `NODE_VERSION`, and
  `engines.node`. Keep them consistent — never declare support for a runtime CI
  does not test. Delete or update any legacy version pin file (this repo uses
  `mise.toml` only).
- **Expect new runtime warnings** after a Node major. Trace them with
  `NODE_OPTIONS=--trace-warnings` and reproduce in isolation before calling them
  benign. Report the root cause; do not silence warnings.

## 7. Generated Artifacts & Docs

- **Regenerate generated code** when its generator is bumped (e.g. `orval` →
  `packages/content-sdk/src/generated/**`). A byte-identical regeneration is a
  good result; any diff must be explainable. Never hand-edit generated files.
- **Tooling config schemas**: a linter/formatter minor often rejects an older
  `$schema`. Bump it and run `pnpm lint:fix`; expect formatting-only churn across
  Markdown and config files and review the diff to confirm it is not semantic.
- **Docs audit**: search tracked docs for version-specific claims
  (`git grep -nE "<old versions>" -- '*.md'`). Update prerequisites and DX docs.
  Do **not** rewrite ADR history — ADRs record the state at decision time; report
  stale snapshots instead of editing them.

## 8. Final Report

- Packages upgraded, grouped, with `old → new`.
- Files changed.
- Verification evidence: lint, types, test counts, build, and
  `pnpm install --frozen-lockfile`.
- Overrides: added / kept / removed, with reasons.
- Audit status before → after.
- Attribution of any new warning or behaviour change from the toolchain bump.
- Remaining work (e.g. E2E browsers, untracked files) and a suggested squash
  commit message.

## Best Practices

- **Iterate**: never upgrade all groups at once; verify each.
- **Install is not verification**: always run the suite.
- **Confirm resolved versions**, not declarations.
- **Isolate risky bumps**: one major / pre-1.0 minor per verification cycle.
- **Remove overrides when possible**; comment the ones that stay.
- **Ask before scope changes** (toolchain jumps, source refactors, dropping
  support floors).
- This skill does not push or open PRs — use `git-pr-sync` for that.
