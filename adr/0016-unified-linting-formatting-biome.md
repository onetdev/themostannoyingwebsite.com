# ADR 16: Unified Linting and Formatting with Biome

## Status
Accepted

## Context
Maintaining separate tools for linting (ESLint) and formatting (Prettier) in a large TypeScript monorepo introduces several pain points:
- Noticeable performance bottlenecks in CI pipelines and pre-commit hooks.
- Rule conflicts between ESLint rules and Prettier formatting plugins.
- Heavy dependency trees with dozens of transitive plugins (`eslint-plugin-*`, `prettier-plugin-*`).
- Slow execution times when scanning across thousands of files.

## Decision
We adopted **Biome** (`@biomejs/biome`) as the unified linter and formatter across all packages and applications in the repository:

- **Central Configuration**: Managed in the root `biome.json`, configuring strict lint rules, formatting options (2-space indent, single quotes), and workspace ignore patterns.
- **Workflow Integration**:
  - `pnpm lint`: Runs `biome check .` across the workspace via Turborepo.
  - `pnpm lint:fix`: Runs `biome check --write .` to apply safe fixes and formatting automatically.
  - **Lefthook**: Integrates with pre-commit git hooks to format and lint changed files before commits are accepted.

## Consequences
- **Pros**: Order-of-magnitude faster linting and formatting speeds (Rust-based); zero configuration conflicts between formatting and linting; drastically reduced `node_modules` footprint and dependency maintenance.
- **Cons**: Biome's plugin ecosystem is younger than ESLint's; certain highly specialized or custom AST-based rules are not yet available in Biome.
