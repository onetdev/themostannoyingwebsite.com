# ADR 15: Multi-Tier Testing Strategy with Jest and Playwright

## Status
Accepted

## Context
The codebase mixes pure business logic (utilities, math, string manipulation, result models), state stores, dependency injection services, and complex browser-level behavioral disruptions (screensavers, maze canvas rendering, context-menu locks, fake popups, and anti-navigation traps). 

Testing these different layers with a single tool would either make testing too slow (running all tests in a real browser) or insufficient (unit-testing DOM traps without browser layout and interaction engines).

## Decision
We established a strict two-tier testing strategy:

1. **Unit and Integration Testing (Jest)**:
   - Configured centrally via `@maw/config-jest` and executed across packages and `apps/web`.
   - Uses `ts-jest` for TypeScript execution.
   - Tests services, utilities (`@maw/utils`), schemas, SDK endpoints, and isolated React hooks/components using `@testing-library/react`.
   - Must be fast, hermetic, and runnable via `pnpm test`.
2. **End-to-End Testing (Playwright)**:
   - Located in `apps/web/e2e/`.
   - Runs against real browsers (Chromium, Firefox, WebKit) in headless and UI modes.
   - Verifies full browser user journeys, annoying disruptions, dark UX flows, audio interactions, and cross-tab/storage behaviors.
   - Executed via `pnpm test:e2e`.

## Consequences
- **Pros**: Fast developer feedback loop for business logic and utilities via Jest; high confidence in user-facing disruptive interactions via Playwright; clean separation of testing concerns.
- **Cons**: Requires maintaining two separate testing harnesses and configurations; Playwright tests require browser installation and longer CI execution times.
