---
description: Upgrade all dependency versions across the whole monorepo
argument-hint: [version-type]
---

Upgrade dependency version numbers across the monorepo and verify the repo still works after changes.

## Arguments
- `$1`: Version bump type (`major`, `minor`, `patch`)
  - `patch`: Only patch version updates (1.2.3 → 1.2.4)
  - `minor`: Patch and minor updates (1.2.3 → 1.3.0)
  - `major`: All updates including breaking changes (1.2.3 → 2.0.0)

## Process

1. **Validate Input**
   - Check if $1 is provided
   - Validate $1 is one of: `major`, `minor`, `patch`
   - Check git working directory is clean (recommended but not required)
   - Display: "Starting $1 dependency upgrades..."

2. **Analyze and Group Dependencies**

   Scan all dependency version numbers from:
   - `./package.json` (devDependencies, dependencies)
   - `./apps/*/package.json` (all apps)
   - `./packages/*/package.json` (all packages)
   - `catalog` section in `pnpm-workspace.yaml`

   Create logical groupings:
   - **Group 1: Next.js Ecosystem** (next, react, react-dom, @next/*, etc.)
   - **Group 2: TypeScript & Tooling** (typescript, @types/*, tsx, ts-node, ts-jest, @biomejs/biome, turbo)
   - **Group 3: Storybook** (@storybook/*, storybook)
   - **Group 4: Testing** (jest, @jest/*, @testing-library/*, playwright, @playwright/test)
   - **Group 5: UI & Styling** (tailwindcss, @tailwindcss/*, postcss)
   - **Group 6: Git & Workflow Tools** (husky, lint-staged, @commitlint/*)
   - **Group 7: Other Dependencies** (group remaining packages logically)

   Display each group with:
   - Package names
   - Current versions
   - Number of packages in group

3. **Process Each Group Iteratively**

   **For each group from step 2:**

   3.1. Display: "Processing group: {group-name} ({count} packages)"

   3.2. **Fetch Latest Versions**
        For each package in current group:
        - Query npm registry for latest version matching $1 constraint
        - Use: `npm view {package-name} versions --json` or npm API
        - Filter by semver rules based on $1
        - Display: "{package-name}: {current} → {latest}"
        - If no update available, display: "{package-name}: {current} (already latest)"

   3.3. **Update Files**
        For each package with available updates:

        - Update in `pnpm-workspace.yaml` catalog if present
        - Update in `./package.json` if present
        - Update in `./apps/*/package.json` files if present
        - Update in `./packages/*/package.json` files if present

        Handle both:
        - Direct versions: `"1.2.3"`, `"^1.2.3"`, `"~1.2.3"`
        - Catalog references: `"catalog:"` (update catalog only)

   3.4. **Install Dependencies**
        - Run: `pnpm install`
        - Display lockfile changes summary
        - If install fails: stop and report error

   3.5. **Run Verification Suite**
        Execute checks sequentially (stop on first failure):

        - `pnpm run lint` - Verify code style
        - `pnpm run check-types` - Verify TypeScript compilation
        - `pnpm run test` - Verify unit tests pass
        - `pnpm run build` - Verify production build works

        **If any check fails:**
        - Display the error output
        - Ask user: "Tests failed for {group-name}. Options:"
          - Rollback this group and continue with next group
          - Stop and investigate (exit command)
          - Skip verification and continue (risky)
        - Handle user choice

   3.6. Display: "✓ Group {group-name} upgraded successfully"

   **Repeat steps 3.1-3.6 for all groups.**

4. **Summary Report**

   Display comprehensive summary:
   - Total packages upgraded
   - Packages by group with version changes
   - All modified files list
   - Test results for each group
   - Any groups that were skipped or rolled back

   Show git status:
   - Modified files
   - Suggested commit message:
     ```
     chore(deps): upgrade {type} dependencies

     - Group 1: Updated Next.js ecosystem to latest
     - Group 2: Updated TypeScript tooling
     (etc...)
     ```

## Examples
- `/dependency-upgrade patch` - Safe patch updates only (1.2.3 → 1.2.4)
- `/dependency-upgrade minor` - Include minor updates (1.2.3 → 1.3.0)
- `/dependency-upgrade major` - Include breaking changes (1.2.3 → 2.0.0)

## Important Notes
- This upgrades DEPENDENCIES, not your project version
- Process is iterative - each group is tested before moving to next
- Breaking changes (major) may require manual code fixes
- The catalog in pnpm-workspace.yaml centralizes dependency versions
- Catalog references (`"catalog:"`) inherit version from catalog
- This does NOT create git commits - review changes first
- Recommended: commit after each successful group for easier rollback
- Use `git diff` to review changes before committing
