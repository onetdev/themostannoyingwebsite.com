# ADR 1: Use Turborepo for Monorepo Management

## Status
Accepted (Historical)

## Context
The project consists of multiple applications (web, ui-docs) and several shared packages (ui-lib, logger, utils, etc.). We need a robust tool to manage this monorepo structure, handle task orchestration, and provide efficient caching to speed up builds and tests.

## Decision
We chose **Turborepo** as our monorepo management tool, paired with **pnpm workspaces**.

## Consequences
- **Pros**: Remote and local caching significantly reduce build times. Task pipelines allow for clear dependencies between package builds.
- **Cons**: Requires initial configuration of `turbo.json` and understanding of the pipeline concepts.
