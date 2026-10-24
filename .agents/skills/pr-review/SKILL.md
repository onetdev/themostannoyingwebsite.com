---
name: pr-review
description: Rigorously reviews a pull request or branch diff for correctness, security, privacy, API and data compatibility, missing features, performance, overengineering, and test gaps, producing prioritized findings with file:line evidence. Use for any PR type, including UI, API, data, infrastructure, dependency, documentation, refactor, and instrumentation changes.
---

# PR Review

## Overview

Perform a **read-only, evidence-based review** of a pull request or branch change list. The goal is to find what is wrong, missing, risky, or unnecessarily complex before merge — not to rewrite the code unless the user explicitly asks for fixes.

The review must cover more than "does the diff look correct":

- the change works on its main path **and** its edge, error, disabled, and concurrency paths
- the change matches its own ADR, README, schema, public types, and inline contract
- sensitive data is safe at the **last boundary** (response, log, storage, third party), not just at the call site
- the tests prove the behavior that matters, not only that a function returns
- the feature does not carry more surface area than its current consumers justify

Use the [review checklist](references/review-checklist.md), the [report template](references/report-template.md), and — only when the PR adds instrumentation or analytics — the [instrumentation review guide](references/instrumentation-review.md).

**Use this skill when:** asked to review a PR, branch, commit range, or change list; asked for a second pass on an existing PR; asked to find bugs, missing features, security/privacy risks, API or data issues, or overengineering in a diff.

**Do not use this skill for:** writing or updating the PR description (use `git-pr-sync`), creating the commit (use `git-commit`), or implementing the requested fixes unless the user explicitly asks for patches after the review.

## Repository profile

This skill runs inside this repository, so these are defaults rather than universal assumptions:

- **Base branch:** `develop` unless the PR or user says otherwise.
- **Package manager:** `pnpm`; workspaces are filtered with `pnpm --filter <workspace>`.
- **Unit tests:** Jest, co-located as `*.test.ts(x)`.
- **E2E tests:** Playwright under `apps/web/e2e`.
- **Formatting/linting:** Biome.
- **Standards:** [root `AGENTS.md`](../../../AGENTS.md) and the closest workspace `AGENTS.md`.
- **Third-party source of truth:** the installed package under `node_modules`, not memory or upstream docs.

Related skills: dependency/security-update PRs should also consult `audit-resolve` / `dependency-upgrade`; PRs touching shadcn components should also consult `shadcn`.

## Inputs and assumptions

Determine and state:

- **PR:** number/URL, or the current branch against a base branch.
- **Base branch:** default `develop`; use the PR base or the user's stated base.
- **Head:** current `HEAD` or the PR head branch.
- **Focus:** the user may narrow the review to one slice (security, tests, API, a feature). Do not silently ignore the rest, but lead with the requested slice.

If the user gives only a PR link, check it out only when the user asked you to; otherwise use `gh pr view` / `gh pr diff` and clearly state that local file inspection was limited. Never switch, rebase, merge, push, or commit during a review unless explicitly asked.

## Guardrails

- **Read-only by default.** Do not edit, stage, commit, push, rebase, merge, or close the PR.
- **Review the change list, not the whole repository.** Open surrounding code only when it is needed to prove or disprove a finding.
- **Use the merge base.** Prefer `git diff <base>...HEAD` (three dots) so the review excludes changes that landed on the base after the branch started.
- **Distinguish PR work from local noise.** If the worktree is dirty, report it and do not treat unstaged files as part of the PR unless the user asks.
- **Verify third-party behavior against the installed package**, not memory.
- **Do not present inference as fact.** If you did not run it or read the implementation, say "likely" and explain the evidence.
- **Skip cosmetic nits** unless they create a real risk. Style-only findings belong in a short "cleanup" section, not in blockers.
- **Respect the repository's standards.** No `any`, no hardcoded user-facing strings, tests for new behavior, function-shape limits, and the i18n workflow.

## Workflow

### 1. Establish the exact scope

```bash
git status --short
git branch --show-current
BASE_BRANCH="${BASE_BRANCH:-develop}"
BASE_REF="origin/$BASE_BRANCH"
git fetch origin "$BASE_BRANCH" --quiet || true
if ! git rev-parse --verify --quiet "$BASE_REF" >/dev/null; then
  BASE_REF="$BASE_BRANCH"
fi
git log --no-merges "$BASE_REF..HEAD" --oneline
git diff --stat "$BASE_REF...HEAD"
git diff --name-only "$BASE_REF...HEAD"
```

If the base is not `develop` or not on `origin`, use the resolved local base and state it. For a PR number:

```bash
PR=<number>
gh pr view "$PR" --json number,title,baseRefName,headRefName,url,state,isDraft,additions,deletions,changedFiles
gh pr diff "$PR"
```

Record: branch/base, commit count, files changed, additions/deletions, and the areas touched (app, packages, docs, configs, CI, tests). This is the review boundary.

### 2. Classify the PR and choose depth

Do not apply the same depth to every PR. Classify it first and state the chosen focus:

| PR type | Review focus |
| --- | --- |
| **UI / feature** | states, empty/loading/error, keyboard, labels, focus, portals, responsive, i18n, a11y |
| **Bug fix** | reproduction, root cause, regression test, blast radius, related paths |
| **API / contract** | backwards compatibility, error semantics, authz, validation, versioning, docs |
| **Data / storage / migration** | schema change, backfill, reversibility, consistency, locks, indexes, retention |
| **Infrastructure / CI / dependencies** | permissions, secrets, pinned actions, environment parity, rollback, lockfile, supply chain |
| **Refactor** | behavior preservation, boundaries, mechanical vs behavior changes, test signal |
| **Docs** | accuracy, examples that compile, links, generated vs hand-written, no behavior change |
| **Instrumentation / telemetry** | event contract, sinks, privacy, selectors, sampling, coverage |

Depth:

- **Light** — docs, tiny bug fix, isolated config tweak. Verify the change and its one risk.
- **Standard** — normal feature, API, or refactor. Trace one end-to-end flow and cover the main edge paths.
- **Deep** — security, data migration, infrastructure, dependency, large cross-cutting, or instrumentation change. Use the relevant reference checklist and trace multiple flows.

### 3. Read the contract before the implementation

Read, in this order where present:

1. ADR(s), schema, and module README(s) touched by the PR.
2. Public types, interfaces, config keys, exported props, and data contracts.
3. The diff for the core module.
4. The feature/call-site diffs.
5. Tests and fixtures.

Extract the PR's **claimed guarantees** as explicit statements. Examples:

- "this endpoint is authorized"
- "the migration is reversible"
- "the new flag defaults off"
- "no breaking API change"
- "this path never writes secrets to logs"
- "the instrumentation never captures personal data"
- "every entry point produces the expected result"
- "the cache is invalidated on update"

These claims become review targets. A doc claim that the code does not satisfy is a finding, not a documentation nit.

### 4. Map the architecture and trace one flow end to end

Group files by boundary rather than reading file by file. Identify:

- entry point / producer
- resolution, validation, or transformation layer
- public contract or boundary
- consumer, sink, storage, or side effect
- shared packages or design-system coupling

Then trace at least one representative flow all the way through:

```text
entry point -> validation/transform -> boundary -> sink/consumer
```

Examples of the same trace in different PR types:

- **UI:** user action -> handler/state -> shared component -> DOM/analytics
- **API:** route -> auth/validation -> service -> database/response
- **Data:** migration -> backfill -> consistency check -> rollback path
- **Infra:** workflow trigger -> job -> secrets/permissions -> artifact/deploy
- **Instrumentation:** annotation -> event resolution -> envelope -> sink -> destination

For each hop ask: does the value survive, is it transformed, is it dropped, and does the transformation match the contract? Repeat for a second flow with different semantics (error path, disabled path, or async path).

Check integration points by searching for the actual symbol, route, prop, config key, or event name — not by trusting the diff summary:

```bash
git grep -n "<symbol-or-key>" -- apps packages
git grep -n "<route-or-event>" -- apps packages
# For untracked files or a repo without git metadata:
grep -RIn "<symbol-or-key>" apps packages
```

**Large diffs (100+ files).** Do not read every file mechanically. Read the core module and its tests first, then sample one representative slice per pattern. Use `git grep`/scripts to verify that every occurrence follows the pattern and that no expected surface is missing. Volume is not risk; concentrate on the contract, the boundary, and the one-off integrations. State clearly which files were sampled rather than read in full.

### 5. Run automated checks early

Start narrow, then widen only if the change is broad:

```bash
pnpm --filter <workspace> check-types
pnpm --filter <workspace> exec jest <path> --runInBand
pnpm --filter <workspace> lint
# if the PR touches shared packages:
pnpm --filter <shared-package> test
# only when the environment supports it:
pnpm test
pnpm test:e2e
pnpm build
```

Record:

- what passed
- what failed and whether it is PR-caused or pre-existing
- warnings that are new in the diff
- anything you could not run (missing service, API key, browser, build dependency)

Do not claim "tests pass" if you only ran a subset. State the exact commands.

### 6. Review through risk lenses

Use [references/review-checklist.md](references/review-checklist.md) as the working checklist. At minimum cover the lenses that apply:

- **Correctness:** main path, empty path, error path, disabled path, concurrency/repeat path, boundary values.
- **Security:** authn/authz, input validation, injection, secrets, CSRF/CORS, SSRF/path traversal, file upload, rate limiting, error leakage.
- **Privacy and data protection:** what is collected, where it is stored/logged, consent, retention, third-party sharing, debug surfaces.
- **API and compatibility:** backwards compatibility, versioning, nullability, error codes, idempotency, pagination, schema evolution.
- **Data and migration:** reversibility, backfill, consistency, locks, indexes, retention, rollback.
- **Performance and lifecycle:** full scans, unbounded maps, timers/observers not cancelled, repeated work on hot paths, bundle/server impact.
- **UX and accessibility:** state coverage, keyboard, labels/hit targets, focus, aria, responsive, reduced motion.
- **i18n and SEO:** strings extracted, locale-aware routing, metadata, structured data, indexability (this repo).
- **Layering:** app-specific semantics leaking into shared packages, untyped props replacing typed contracts.
- **Docs and tests:** claims vs behavior, unit vs integration coverage, order-dependent tests, expensive browser matrices.

If the PR adds instrumentation or analytics, also use [references/instrumentation-review.md](references/instrumentation-review.md) for the event contract, sink privacy, selector/audit parity, sampling, and coverage checks.

### 7. Verify the implementation's claims

For every claim, find the code that proves it — or does not:

- Build a **contract coverage matrix**: declared routes/events/commands/flags vs implemented; implemented vs declared; exported API vs documented; schema fields vs consumers.
- Check whether a "suppress/ignore/disable/feature-flag" switch is honored in **every** path, not just the happy path.
- Check whether behavior survives wrappers, fragments, portals, conditional rendering, middleware, or retry layers.
- Check boundary assumptions: hidden/mirror inputs, library markup, serializers, path/URL parsing, status codes.
- Check selector or matcher parity where an audit/test claims to cover the same set as the runtime.
- Check identity/time/tenant attribution for work emitted from timers, promises, queues, or async side effects.
- Check whether the final boundary receives raw sensitive values even when the call-site denylist looks strong.
- Check tests for what they actually assert: a test that only checks one field does not prove the contract.

### 8. Compose findings

Use the template in [references/report-template.md](references/report-template.md).

Severity:

- **Blocker:** data loss/corruption, security/privacy breach, build break, migration failure, or a main-path correctness bug.
- **High:** contract violation, missing authorization, silently missing behavior, broad incorrect data/metrics, or a high-risk missing test.
- **Medium:** edge-case bug, noisy/expensive behavior, incomplete feature, layering regression.
- **Low:** latent bug, minor inconsistency, narrow edge case.
- **Cleanup:** dead code, overengineering, naming/docs, test hygiene.

Each finding must include:

```markdown
**Evidence:** `path/to/file.ts:123` — what the code actually does.
**Why it matters:** the user-visible, operational, or maintenance consequence.
**Fix:** the smallest concrete change that resolves it.
```

Scale the report to the PR: a small bug fix may have 1–3 findings; a large cross-cutting review may have 15–30. Group related symptoms under one root cause. State explicitly when something is "likely" rather than verified.

### 9. Close the review

End with:

- what is solid
- the counts by severity
- the recommended merge/priority order
- what you could not verify
- an offer to turn findings into patches (but do not do so unless asked)

## Review heuristics worth remembering

- `??` vs `||`, `tagName`, `closest`, `instanceof`, `new URL`, numeric parsing, and status-code assumptions often hide cross-environment bugs.
- A suppression, bypass, or privacy flag is usually implemented on one path and forgotten on the others.
- A denylist of field **names** is not a security or privacy policy; values can be renamed.
- A feature that claims "never" or "always" is worth searching for the one exception.
- A partial event/state pair (open captured, close generic; start written, end missing) is worse than no pair because it looks complete.
- A full-document scan, unbounded cache, or uncancelled timer is an attribution/leak bug waiting to happen.
- Tests written by the author often encode the author's assumptions; look for the interaction they did not perform.
- A new abstraction with no consumer today is a maintenance cost, not a feature.
- "No consumer/transport yet" changes the cost/benefit of every new record, event, or endpoint.
- If removing the change leaves no user-visible behavior different, question the surface area.

For instrumentation-specific heuristics (value tracing, event coverage, selector parity, sampling, debug globals), see [references/instrumentation-review.md](references/instrumentation-review.md).

## References

- [Review checklist](references/review-checklist.md)
- [Report template](references/report-template.md)
- [Instrumentation and telemetry review](references/instrumentation-review.md)
