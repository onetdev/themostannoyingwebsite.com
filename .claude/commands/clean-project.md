---
description: Clean build artifacts, caches, and dependencies with various cleanup levels
argument-hint: [cleanup-level]
---

Clean up project artifacts, caches, and dependencies to free up disk space and resolve build issues.

## Arguments
- `$1`: Cleanup level (optional, default: `cache`)
  - `cache`: Clear build caches only (safe, fast)
  - `build`: Clear all build artifacts
  - `deps`: Clear build artifacts and reinstall dependencies
  - `nuclear`: Complete cleanup including all node_modules (slowest)

## Process

### 1. **Validate Input**
   - If `$1` not provided, default to `cache`
   - Validate `$1` is one of: `cache`, `build`, `deps`, `nuclear`
   - Display: "Starting cleanup level: {level}..."
   - Warn if git working directory is not clean (uncommitted changes)

### 2. **Pre-Cleanup Analysis**
   - Calculate current disk usage of directories to be cleaned:
     - `.turbo/` (Turbo cache)
     - `.next/cache/` (Next.js cache)
     - `apps/web/.next/` (Next.js build)
     - `apps/ui-docs/.next/` or `apps/ui-docs/storybook-static/` (Storybook build)
     - `packages/*/dist/` (Package builds)
     - `packages/content-api/data/` (Content build artifacts - metadata only)
     - `node_modules/` (if deps or nuclear level)
   - Display total size to be freed
   - Ask for confirmation if size > 500MB or level is `nuclear`

### 3. **Cleanup by Level**

   **Level: cache**
   - Remove `.turbo/` recursively
   - Remove `.next/cache/` in all apps
   - Run `turbo run clean --force`
   - Run `pnpm store prune` to clean unused packages from store
   - Display: "✓ Caches cleared"

   **Level: build** (includes all from `cache`)
   - Execute all `cache` level steps
   - Remove `.next/` in all apps
   - Remove `storybook-static/` in ui-docs
   - Remove `dist/` in all packages
   - Remove generated metadata files in `packages/content-api/data/` (index files, not article content)
   - Display: "✓ Build artifacts removed"

   **Level: deps** (includes all from `build`)
   - Execute all `build` level steps
   - Display: "Removing and reinstalling dependencies..."
   - Run `pnpm recursive exec -- rm -rf node_modules` to remove all node_modules
   - Run `pnpm install` to reinstall fresh dependencies
   - Display: "✓ Dependencies reinstalled"

   **Level: nuclear** (complete reset)
   - Execute all `deps` level steps
   - Remove root `node_modules/`
   - Remove all workspace `node_modules/`
   - Remove `pnpm-lock.yaml` (will be regenerated)
   - Remove `.pnpm-store/` if exists locally
   - Run `pnpm store prune` to clean global store
   - Run `pnpm install` to regenerate everything
   - Display: "✓ Complete cleanup and reinstall finished"

### 4. **Post-Cleanup Verification**
   - Verify critical files still exist:
     - `package.json` (root and workspaces)
     - `pnpm-lock.yaml` (should be regenerated if deleted)
     - Source files in `apps/` and `packages/`
   - If `deps` or `nuclear` level was used:
     - Run `pnpm run check-types` to verify installation
     - Display any errors or warnings
   - Calculate disk space freed
   - Display: "Freed {size} of disk space"

### 5. **Recommendations**
   - Display next steps based on cleanup level:
     - `cache`: "You can continue development normally"
     - `build`: "Run 'pnpm run dev' or 'pnpm run build' to rebuild"
     - `deps`/`nuclear`: "Run 'pnpm run dev' to start fresh"
   - Suggest running `pnpm run build:metadata` if content-api was cleaned
   - Display: "Cleanup complete! 🧹"

## Examples
- `/clean-project` - Quick cache cleanup (default)
- `/clean-project cache` - Same as default, clear caches only
- `/clean-project build` - Remove all build artifacts
- `/clean-project deps` - Full dependency reinstall
- `/clean-project nuclear` - Complete reset (use when really stuck)

## Important Notes
- **Safe levels**: `cache` and `build` are always safe to run
- **Destructive levels**: `deps` and `nuclear` will require reinstallation (takes time)
- Always commit your changes before running `nuclear` level
- The `nuclear` option is useful when:
  - You have dependency corruption
  - pnpm lockfile is out of sync
  - You suspect phantom dependencies
  - Build issues that can't be resolved otherwise
- Source code and article content are NEVER deleted
- Git files and history are NEVER touched
- Metadata files in content-api can be regenerated with `pnpm run build:metadata`

## Common Use Cases
- **Build cache issues**: `/clean-project cache`
- **Stale Next.js builds**: `/clean-project build`
- **Dependency problems**: `/clean-project deps`
- **Everything is broken**: `/clean-project nuclear`
- **Low disk space**: `/clean-project build` or higher
