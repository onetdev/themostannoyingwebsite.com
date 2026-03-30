---
name: audit-resolve
description: Audit and upgrade project dependencies to resolve security vulnerabilities (CVEs) across the monorepo. Use for security alerts or regular dependency maintenance.
---

# Audit and Upgrade Workflow

Systematic approach to resolve security vulnerabilities (CVEs) using GitHub reports and `pnpm audit`.

## Workflow

### 1. Discovery
Compare GitHub alerts with local audit results. Store reports in `./artifacts`:
```bash
mkdir -p artifacts
gh api graphql -f owner='onetdev' -f name='themostannoyingwebsite.com' -F query=@.github/queries/security-report-open.gql > artifacts/open-vulnerabilities.json
pnpm audit --json > artifacts/pnpm-audit.json
```

### 2. Analysis & Resolution
For each vulnerability:
- **Trace**: Use `pnpm why <package_name> -r` to find the source.
- **Research**: Check `npm view <package_name> versions` for patches.
- **Upgrade**:
    - **Primary Goal**: Update direct dependencies in root and workspace `package.json` files.
    - **Clean Residue**: Check if existing `pnpm.overrides` or custom `peerDependencies` can be removed if a parent package upgrade now resolves the issue.
    - **Last Resort**: Use `pnpm.overrides` only for deep sub-dependencies if no parent update exists.
    - **Peer Dependencies**: Small version adjustments are okay; avoid unstable hacks.

### 3. Verification
Upgrades must pass all workspace checks:
- **Type Check**: `pnpm run check-types`
- **Test**: `pnpm test`
- **Build**: `pnpm build`

### 4. Reporting
Summarize the results:
- **Successes**: Upgraded packages (old -> new), resolved CVEs, and **residue removed** (e.g., deleted overrides).
- **Blockers**: Unresolvable CVEs/packages with a brief explanation.

## Safety
- Follow workspace conventions.
- No "hacky" fixes; prioritize stability.
- Do not stage/commit unless requested.
