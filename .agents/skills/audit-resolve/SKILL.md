---

name: audit-resolve
description: Audit and fix known security vulnerabilities (CVEs) across the monorepo, preferring in-range dependency updates over overrides. Use for security alerts or regular dependency maintenance.
---

# Audit and Resolve

Resolve reported vulnerabilities with the smallest safe change: update a direct
dependency first, an in-range transitive update second, and a pinned override
only when nothing upstream accepts a patched version.

## 1. Discovery

Compare the GitHub alerts with the local audit and keep both artifacts:

```bash
mkdir -p .agents/artifacts
gh api graphql -f owner='onetdev' -f name='themostannoyingwebsite.com' -F query=@.github/queries/security-report-open.gql > .agents/artifacts/open-vulnerabilities.json
pnpm audit --json > .agents/artifacts/pnpm-audit.json
```

`pnpm audit --json` keys the `advisories` map by numeric advisory ID, not package
name. Read `module_name`, `vulnerable_versions`, `patched_versions`, and
`severity` from each entry, and use `findings[].paths` to see which workspace
introduced it.

## 2. Analysis

For each advisory:

- **Trace the source**: `pnpm why <package> -r`. Note the workspace, the direct
  parent, and whether the vulnerable range is reachable at all.
- **Check the patched range** against the current resolved version, not the
  declared one (`pnpm -r list <pkg> --depth 0`).
- **Look for an upstream fix**: `npm view <parent> version dependencies` for each
  parent in the chain. A parent that already requires a patched range is the
  cleanest fix.

## 3. Resolution Ladder

1. **Bump the direct dependency** that owns or constrains the vulnerable package.
2. **Update in range**: `pnpm update <package> -r` moves transitive dependencies
   within their parents' declared ranges. Always try this first — it leaves no
   override debt.
3. **Override, as a last resort**, only when no parent accepts a patched version.
   Required format:

   ```yaml
   # No parent accepts the patched major yet (<parent> still declares <range>).
   # Remove once <parent> ships <condition>.
   # Advisory: <GHSA / title>.
   overrides:
     "glob@>=9.0.0 <14.0.2": "14.0.6"
   ```

   - Use a **range selector** (`"pkg@>=a <b"`), not an exact version, so future
     vulnerable versions are covered automatically.
   - The comment must name the advisory and the **removal condition**.
   - Forcing a major across a declared range can break consumers, so verify
     afterwards.
4. **Peer dependency adjustments** are acceptable when small and stable; avoid
   unstable hacks.

If no fix exists at any rung, stop and report the advisory, the affected path,
and why it is currently unfixable rather than adding a speculative override.

## 4. Override Hygiene

Overrides are temporary. Never leave one without knowing when it should go.

- Every `pnpm upgrade` run must re-check existing overrides: remove the ones whose
  vulnerable range is no longer reachable, and re-tighten any that are stale. See
  the `dependency-upgrade` skill, §4 "Review Dependency Overrides".
- Prefer removing an override over rewriting it. A removal is the desired
  outcome.
- Keep overrides in `pnpm-workspace.yaml` (not `package.json`) so
  `overrides`, `peerDependencyRules`, and `allowBuilds` stay in one place.

## 5. Verification

All of the following must pass before reporting success:

1. `pnpm run lint`
2. `pnpm run check-types`
3. `pnpm run test`
4. `pnpm run build`
5. `pnpm install --frozen-lockfile`
6. `pnpm audit` (target: no known vulnerabilities)

Coverage-enabled tests are the meaningful check for a forced `glob` /
`test-exclude` override — they exercise the file-glob path that the override
touches.

## 6. Reporting

- **Resolved**: package, `old → new`, method (direct bump / in-range / override),
  and the advisories closed.
- **Overrides**: added, kept (with removal condition), and removed.
- **Blockers**: unresolved advisories with the path and the reason.
- **Evidence**: the verification results above.
- Do not stage or commit unless asked.
