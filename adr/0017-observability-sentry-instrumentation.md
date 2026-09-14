# ADR 17: Observability and Error Tracking with Sentry and Next.js Instrumentation

## Status
Accepted

## Context
"The Most Annoying Website" introduces intentional client-side disruptions, artificial errors, and dark UX behaviors alongside genuine runtime exceptions and network errors. To monitor production reliability without confusing intentional UX chaos with real bugs, we needed an observability solution that:
- Initializes as early as possible in both client and server lifecycles.
- Captures unhandled runtime crashes, performance metrics, and network failures.
- Tags errors with relevant context (such as active locale, route, and deployment version) without logging private or sensitive data.
- Provides a unified logging abstraction across packages.

## Decision
We adopted **Sentry** (`@sentry/nextjs`) integrated with Next.js modern instrumentation APIs:

1. **Early Lifecycle Hooking**: We configure `src/instrumentation.ts` (for server-side runtime initialization) and `src/instrumentation-client.ts` (for client-side browser bootstrapping) using Next.js native instrumentation hooks.
2. **Context Enrichment**: The `SentryLocaleConfigurator` component sets Sentry tags for the current locale dynamically, allowing localized error triage.
3. **Shared Logging Package**: `@maw/logger` provides a centralized logging wrapper using `tslog` for uniform logging format across the monorepo.
4. **Web Analytics**: Complemented by `@vercel/analytics` for non-invasive traffic and performance telemetry.

## Consequences
- **Pros**: Real-time error alerts with stack traces and source maps; clean separation of telemetry initialization from application rendering; localized diagnostics.
- **Cons**: Sentry SDK adds to client bundle size; requires maintaining environment secrets (`SENTRY_AUTH_TOKEN`, DSNs) in CI and deployment platforms.
