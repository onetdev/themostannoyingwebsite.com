# Architectural Decision Records

This directory holds the project's Architecture Decision Records (ADRs). Each
record captures a single significant decision — its context, the decision, and
the consequences — and is immutable once accepted. A superseded record stays in
place and points forward to the record(s) that replace it.

New records use the next zero-padded number and the `NNNN-kebab-case-title.md`
file-name convention; see the `adr-writer` skill for the authoring workflow.

| ADR | Title | Status |
|-----|-------|--------|
| [0001](0001-monorepo-turborepo.md) | Use Turborepo for Monorepo Management | Accepted (historical) |
| [0002](0002-nextjs-framework.md) | Use Next.js for the Web Application | Accepted (historical) |
| [0003](0003-nextjs-app-router.md) | Adopt Next.js App Router | Accepted (historical) |
| [0004](0004-tailwindcss.md) | Use TailwindCSS for Styling | Accepted (historical) |
| [0005](0005-statemanagement-zustand.md) | Use Zustand for Client-Side State Management | Accepted (historical) |
| [0006](0006-feature-sliced-organization.md) | Feature-Sliced Module Organization | Accepted |
| [0007](0007-hybrid-i18n-structure.md) | Hybrid Internationalization Structure | Superseded by [ADR 22](0022-api-served-translations.md) |
| [0008](0008-dependency-injection-inversify.md) | Dependency Injection with InversifyJS | Accepted |
| [0009](0009-runtime-schema-validation-zod.md) | Runtime Schema Validation & Type Inference with Zod | Accepted |
| [0010](0010-event-driven-cross-feature-communication.md) | Event-Driven Cross-Feature Communication via Centralized Event Bus | Accepted |
| [0011](0011-contract-driven-content-sdk-orval-ky.md) | Contract-Driven Content SDK Architecture with Orval and Ky | Accepted |
| [0012](0012-result-pattern-error-handling.md) | Railway-Oriented Error Handling with the Result Pattern | Accepted |
| [0013](0013-cross-tab-state-sync-broadcastchannel.md) | Cross-Tab State Synchronization via BroadcastChannel | Accepted |
| [0014](0014-design-system-atomic-radix-storybook.md) | Design System Architecture with Atomic Design, Radix UI, and Storybook | Superseded by [ADR 31](0031-base-ui-shadcn-adoption.md) |
| [0015](0015-testing-strategy-jest-playwright.md) | Multi-Tier Testing Strategy with Jest and Playwright | Accepted |
| [0016](0016-unified-linting-formatting-biome.md) | Unified Linting and Formatting with Biome | Accepted |
| [0017](0017-observability-sentry-instrumentation.md) | Observability and Error Tracking with Sentry and Next.js Instrumentation | Accepted |
| [0018](0018-static-first-architecture-and-build-precomputation.md) | Static-First Architecture and Build Precomputation | Accepted |
| [0019](0019-disruption-engine-and-controlled-dark-ux.md) | Disruption Engine and Controlled Dark UX Architecture | Accepted |
| [0020](0020-type-safe-route-aliasing.md) | Type-Safe Route Aliasing and Navigation Layer | Accepted |
| [0021](0021-git-governance-and-quality-gates.md) | Git Governance and Automated Quality Gates with Lefthook and Commitlint | Accepted |
| [0022](0022-api-served-translations.md) | API-Served Translations with English-Only Bundled Reference | Accepted (supersedes [ADR 7](0007-hybrid-i18n-structure.md); partially superseded by [ADR 25](0025-api-only-variant-pools-ssr-hydration.md)) |
| [0023](0023-build-time-locale-catalog.md) | Build-Time Locale Catalog | Accepted |
| [0024](0024-dev-content-api-proxy.md) | Dev-Only Same-Origin Proxy for Browser Content API Calls | Accepted |
| [0025](0025-api-only-variant-pools-ssr-hydration.md) | API-Only Variant Pools with SSR React Query Hydration | Superseded by [ADR 29](0029-content-resource-model-pools-and-dedicated-endpoints.md) |
| [0026](0026-structured-data-json-ld.md) | Structured Data (JSON-LD) Strategy | Accepted |
| [0027](0027-theme-management-wrksz-themes.md) | Theme Management with @wrksz/themes | Accepted |
| [0028](0028-english-translation-reference-sync.md) | English Translation Reference Sync to the Content API | Accepted |
| [0029](0029-content-resource-model-pools-and-dedicated-endpoints.md) | Content Resource Model — String Pools and Dedicated Endpoints | Accepted |
| [0030](0030-donation-data-served-by-the-content-api.md) | Donation Data Served by the Content API | Accepted |
| [0031](0031-base-ui-shadcn-adoption.md) | Base UI shadcn Adoption and Behavior-Preserving Migration | Accepted |
| [0032](0032-donation-tiers-goal-and-currency-display.md) | Donation Tiers, Goal, and Currency as a Display Concern | Accepted (amends [ADR 30](0030-donation-data-served-by-the-content-api.md); amended by [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md)) |
| [0033](0033-donation-exchange-rates.md) | Live Donation Exchange Rates from Frankfurter and CoinGecko | Accepted (amended by [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md) and [ADR 35](0035-dedicated-currency-rates-endpoint.md)) |
| [0034](0034-donation-currency-offer-and-fixed-eur-figures.md) | Donation Currency Offer and EUR-Fixed Figures | Accepted (amends [ADR 32](0032-donation-tiers-goal-and-currency-display.md) and [ADR 33](0033-donation-exchange-rates.md); amended by [ADR 35](0035-dedicated-currency-rates-endpoint.md) and [ADR 36](0036-currency-tagged-donation-amounts.md)) |
| [0035](0035-dedicated-currency-rates-endpoint.md) | Dedicated Currency Rates Endpoint | Accepted (amends [ADR 33](0033-donation-exchange-rates.md) and [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md); amended by [ADR 36](0036-currency-tagged-donation-amounts.md)) |
| [0036](0036-currency-tagged-donation-amounts.md) | Currency-Tagged Donation Amounts | Accepted (amends [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md) and [ADR 35](0035-dedicated-currency-rates-endpoint.md)) |
| [0037](0037-user-interaction-telemetry.md) | User Interaction Telemetry | Accepted |
| [0038](0038-theme-preference-selector.md) | Three-State Theme Preference Selector with System Default | Accepted (supersedes the binary toggle from [ADR 27](0027-theme-management-wrksz-themes.md)) |
