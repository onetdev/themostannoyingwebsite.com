# ADR 25: API-Only Variant Pools with SSR React Query Hydration

## Status
Accepted

## Context
ADR 22 moved non-English translations to the Content API but deliberately kept the bundled **English** variant arrays (fake names, comments, testimonials, quiz questions, social-proof data, etc.) as a runtime fallback. In practice this left variant data duplicated in two places:

- The headless Content API (`client.variants.getByType(lang, type)`), used by `CommentService`, `OnlySpamsService`, and the plans page.
- The repository, both as dedicated `variants.ts` files and as inline arrays inside `next-intl` messages (`topSearchVariants`, `messageVariants`, `marqueeVariants`, `confirmations`, `questionVariants`, `reasons.list`, `purchaseProofToast.variants`).

Two problems followed. First, the duplication inflated the repo and the client message bundle for data that already lives in the API's source of truth. Second, client components read some pools from `useMessages()`, so the "fallback" was actually the primary render path for English, and the English bundle short-circuit in `loadMessages()` meant a pool removed from the bundle could never be recovered from the translations endpoint.

At the same time we wanted to keep Content API traffic controllable: no browser calls during normal runtime, and the ability to refresh content by revalidating the static build when the Content API publishes a new release.

## Decision
Treat the Content API as the **only** source for variant pools, for every locale including English, and deliver them to client components through server-rendered data.

1.  **No bundled variants.** Remove every variant array from the repository, including English: the dedicated `variants.ts` files and the inline message keys that held pools. Non-variant UI strings remain bundled English as the reference shape and fallback (ADR 22 point 1 still applies).
2.  **Services are API-only.** `CommentService` and `OnlySpamsService` fetch their pools via `client.variants.getByType`. The bundled fallback and the locale-keyed dynamic imports are removed; when the API is unreachable a pool degrades to an empty array rather than to bundled data.
3.  **Shared React Query entry.** Pools are read through `variantPoolQueryOptions(lang, type)` (key `['variants', lang, type]`) with `staleTime`/`gcTime` of `Infinity`. The query function throws if invoked in the browser, guaranteeing that pool fetching never happens as a runtime browser request.
4.  **Server prefetch + hydration.** `prefetchVariantPools()` builds a per-request `QueryClient`, `prefetchQuery`s the requested pools and returns `dehydrate(...)`. `ClientRootProviderContainer` hydrates the global pools via `HydrationBoundary`; `VariantPoolsBoundary` does the same for page-scoped pools.
5.  **Per-route granularity.** Pools used by the layout-level pain widgets (page-title glitch, newsletter modal, chat bubble) are prefetched in the locale layouts. Page-scoped pools (top searches, quiz questions, cancellation reasons, social proof) are prefetched by the page that renders them, so each route ships only what it uses.
6.  **Cache lifecycle.** The payload is refreshed by ISR revalidation (`revalidate: 3600` on the Content API fetches) and by proactively invalidating/redeploying ISR when the Content API releases new content.
7.  **Locale allowlist unchanged.** `i18nConfig.locales` remains the allowlist; the API locale catalog is filtered through it (`buildSupportedLanguages`), so extra API locales are never surfaced.

## Consequences
- **Pros**: Single source of truth for variant data; the repository and the client message bundle no longer carry ~450 lines plus inline pools of duplicated content.
- **Pros**: Zero Content API calls from the browser at runtime; all pool traffic is server-side and cacheable, with ISR revalidation and proactive invalidation deciding freshness.
- **Pros**: Per-route prefetch keeps hydration payloads scoped, and React Query dedupes shared pools (e.g. `names`) across widgets on the same page.
- **Pros**: Removing the pools from `AppTranslationShape` turns every stale consumer into a compile error, so the migration is checked by the type system.
- **Cons**: English rendering now depends on Content API availability at build/revalidation time; an outage degrades affected widgets to empty rather than to bundled placeholder content.
- **Cons**: Pools are frozen into the static payload between revalidations, so a variant change requires a revalidation/redeploy.
- **Cons**: A pool missing from the hydrated payload cannot be recovered client-side (the query function intentionally refuses to run in the browser), which surfaces as an empty widget rather than a late fetch.
