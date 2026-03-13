# ADR 8: Dependency Injection with InversifyJS

## Status
Accepted

## Context
The application contains complex business logic that needs to be testable and decoupled from React's rendering lifecycle. We need a way to manage service instances, handle shared state, and allow for easy mocking in unit tests.

## Decision
We will use **InversifyJS** as our Dependency Injection (DI) framework.

- **Registry**: All bindings are centralized in `src/app/bootstrap/di.ts`. This file aggregates DI symbols and registers services from across the core and feature layers.
- **Consumption**: React components should consume services via the `useService(DI.Symbol)` hook or dedicated feature-level hooks (e.g., `useAuthService()`).
- **Standard**: Classes must be marked with `@injectable()`, and dependencies must be injected via `@inject(DI.Symbol)`.

## Consequences
- **Pros**: Logic is decoupled from UI, services are easily mockable, clear lifecycle management (Singletons vs. Transients).
- **Cons**: Requires explicit registration of every service; introduces a learning curve for developers unfamiliar with DI containers.
