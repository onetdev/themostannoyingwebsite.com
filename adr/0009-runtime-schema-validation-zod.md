# ADR 9: Runtime Schema Validation & Type Inference with Zod

## Status
Accepted

## Context
In a TypeScript application, compile-time types are erased at runtime. We process untrusted and dynamic data from multiple sources: form inputs (often with intentionally bizarre or strict validation rules in dark UX flows), headless API responses, runtime environment configurations, and persisted client state in `localStorage`. Relying solely on static TypeScript interfaces leaves the application vulnerable to runtime crashes, type drift, and corrupted cache state.

We needed a schema validation solution that:
- Acts as a single source of truth for both runtime validation and static TypeScript types (`z.infer<T>`).
- Seamlessly integrates with form libraries (`react-hook-form`).
- Can parse and sanitize persisted state across client storage versions.
- Generates directly from OpenAPI specifications for contract-first workflows.

## Decision
We chose **Zod** as the universal schema definition and validation library across all packages and applications in the monorepo.

Key usage standards:
- **Forms**: Integrate with `react-hook-form` using `@hookform/resolvers/zod`.
- **Storage & Migrations**: Validate and strip unexpected keys from persisted Zustand stores (e.g. `PainPreferencesStateSchema.strip().parse(persistedState)`).
- **SDK Code Generation**: Configure Orval in `packages/content-sdk` with `client: 'zod'` to generate reusable schemas and companion types from the headless API OpenAPI spec.
- **App Configuration**: Enforce typed runtime environment and feature flags via `AppConfigSchema`.

## Consequences
- **Pros**: Guarantees runtime data integrity; eliminates duplication between validation logic and TypeScript type definitions; supports powerful transformations, stripping, and schema migrations.
- **Cons**: Adds a runtime bundle footprint (though mitigated by tree-shaking); complex schema transformations can slightly increase TypeScript compilation overhead.
