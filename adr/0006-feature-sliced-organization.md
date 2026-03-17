# ADR 6: Feature-Sliced Module Organization

## Status
Accepted

## Context
As the "Most Annoying Website" grows, grouping files by technical type (e.g., all components in one folder, all services in another) leads to high cognitive load and tight coupling. We need a way to keep related logic together to improve maintainability and allow AI agents to reason about domain logic effectively.

## Decision
We will follow a **Feature-Sliced Design** approach. All domain-specific logic must reside within `src/features/{feature-name}/`. 

Each feature folder should ideally contain:
- `components/`: UI specific to the feature.
- `hooks/`: Feature-specific React hooks.
- `services/`: Business logic and use cases.
- `i18n/`: Feature-specific translations.
- `schemas/`: Zod schemas (single source of truth).
- `types.ts`: DI symbols and internal types.
- `README.md`: Concise documentation of the feature's scope.

Features must communicate via defined Services or shared Core/Global layers. Deep imports into the internals of another feature are discouraged.

## Consequences
- **Pros**: High encapsulation, easier to test in isolation, reduced merge conflicts.
- **Cons**: Requires discipline in defining feature boundaries; slightly more boilerplate for small features.
