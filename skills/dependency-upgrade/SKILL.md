---
name: dependency-upgrade
description: Upgrade all dependency versions across the monorepo. Use when the user wants to bump dependency versions (major, minor, or patch) and verify the repository still works after the changes.
---

# Dependency Upgrade

This skill automates the process of upgrading dependencies across a monorepo, following a safe, group-based iterative approach with automated verification.

## Process

### 1. Validate Input & Environment
- Ensure a version bump type (`patch`, `minor`, `major`) is specified.
- Confirm the git working directory is clean (recommended).
- Display: "Starting [version-type] dependency upgrades..."

### 2. Analyze & Group Dependencies
- Refer to [dependency-groups.md](references/dependency-groups.md) for logical groupings.
- Scan `package.json` files in the root, `/apps/*`, `/packages/*`, and the `catalog` in `pnpm-workspace.yaml`.
- For each group, list:
    - Package names.
    - Current versions.
    - Total package count.

### 3. Iterative Processing
For each dependency group:

#### 3.1 Fetch Latest Versions
- Query the npm registry for the latest version matching the requested bump type.
- Use: `npm view {package-name} versions --json`
- Compare with the current version and display the planned upgrade: `{package-name}: {current} → {latest}`.

#### 3.2 Update Files
- Apply updates to:
    - `pnpm-workspace.yaml` (catalog section)
    - Root and workspace `package.json` files.
- Handle direct versions and `"catalog:"` references correctly.

#### 3.3 Install & Verify
- Run `pnpm install`.
- Execute the verification suite sequentially:
    1. `pnpm run lint`
    2. `pnpm run check-types`
    3. `pnpm run test`
    4. `pnpm run build`
- **If any check fails**:
    - Display error output.
    - Offer options: **Rollback group and continue**, **Stop and investigate**, or **Skip verification** (risky).

#### 3.4 Summary
- Display: "✓ Group {group-name} upgraded successfully."

### 4. Final Summary Report
- Summarize total packages upgraded.
- List upgrades by group.
- Provide a summary of modified files.
- Suggest a commit message:
  ```
  chore(deps): upgrade {type} dependencies

  - Group 1: Updated Next.js ecosystem
  - Group 2: Updated TypeScript tooling
  ...
  ```

## Best Practices
- **Iterate**: Never upgrade all groups at once. Verify each group before proceeding.
- **Rollback**: If a group fails verification, revert the changes for that group's packages before moving to the next.
- **Manual Fixes**: Be prepared for manual code changes, especially with `major` upgrades.
