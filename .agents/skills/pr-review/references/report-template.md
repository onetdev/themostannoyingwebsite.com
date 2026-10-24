# PR Review Report Template

Use this shape unless the user requested a different format. Keep the report scannable; put the highest-risk findings first. Scale the number of findings to the PR — a small fix may have 1–3, a large cross-cutting change may have 15–30.

```markdown
Reviewed `<head>` against `<base>` (<N> files, +<additions>/−<deletions>).
PR type/depth: <UI | API | data | infra | deps | docs | refactor | instrumentation> / <light | standard | deep>.

Verification:
- `<command>` → <result>
- `<command>` → <result>
- Not run: `<command>` (<reason>)

## Summary

<2–4 sentences: overall assessment, the main risk areas, and whether anything blocks merge.>

## Blocking

### <short title> `[blocker]`
**Evidence:** `path/to/file.ts:123` — <what the code actually does.>
**Why it matters:** <data loss / security / privacy / build / migration / main-path consequence.>
**Fix:** <smallest concrete change.>

## High

### <short title> `[high]`
**Evidence:** ...
**Why it matters:** ...
**Fix:** ...

## Medium / Low

- **<short title>** `[medium]` — `path:line`: <problem>. Fix: <fix>.
- **<short title>** `[low]` — `path:line`: <problem>. Fix: <fix>.

## Missing features / incomplete behavior

- <claimed entry point, route, flag, state, or edge path that does not work>
- <error/disabled/rollback/empty/loading path that is silently missing>

## Security / privacy / data

- <authorization, validation, secret, retention, migration, or boundary issue>

## Simplifications / overengineering

- <dead code/API/type/flag/export>
- <duplicate mechanism or unnecessary abstraction>
- <surface area with no current consumer>
- <UI/design-system change justified only by instrumentation or a hypothetical future>

## Test gaps

- <untested integration>
- <untested edge path>
- <test that asserts too little>
- <expensive/duplicated test matrix>

## Suggested priority

1. <highest-risk fix>
2. <next>
3. <next>

<What is solid, what could not be verified, and offer to turn findings into patches.>
```

## Severity rules

- **Blocker** — data loss/corruption, security/privacy breach, build break, migration failure, or a main-path correctness bug.
- **High** — contract violation, missing authorization, silently missing behavior, broadly incorrect data/metrics, or a high-risk missing test.
- **Medium** — edge-case bug, noisy/expensive behavior, incomplete feature, layering regression.
- **Low** — latent bug, minor inconsistency, narrow edge case.
- **Cleanup** — dead code, overengineering, naming, docs, test hygiene.

## Evidence rules

- Always include `path:line`.
- Quote or paraphrase the actual behavior, not the intent.
- If the issue depends on third-party markup or runtime behavior, cite the installed package file or the command that proved it.
- Mark unverified conclusions as **likely** and state what would confirm them.
- Do not call something a blocker unless it meets the blocker definition.

## What good looks like

- The summary tells a reviewer whether to stop the merge in one read.
- Every finding is actionable without opening a second document.
- Related symptoms are grouped under one root cause.
- The review distinguishes what is broken from what is merely larger than necessary.
- The final section names the order of work, not just a pile of issues.
