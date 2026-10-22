# ADR 37: User Interaction Telemetry

## Status

Accepted

Amends [ADR 17](0017-observability-sentry-instrumentation.md) (which covered
errors only) and complements [ADR 10](0010-event-driven-cross-feature-communication.md)
and [ADR 19](0019-disruption-engine-and-controlled-dark-ux.md).

## Context

Observability was split across three unrelated mechanisms:

- `@vercel/analytics` reported page views and web vitals, but no custom events and
  no per-route attribution we control.
- Sentry captured errors, but nothing explained what the user was doing first.
- The Emittery app bus carried 17 typed behavioural events (`route:visit`,
  `wof:spin-completed`, `dead-pixel:clicked`, …) that never left the browser and
  only fed `/debug` history and achievements.

As a result there was no signal for impressions (did anyone see the paywall? the
carousel cards? the ad slots?), for input interactions (which fields are used and
which fail validation?), for client-side faults that never throw (`error.http`,
`error.query`, image failures), or for real-user performance attributed to a
route. Adding `track()` calls at every call site would have meant dozens of edits
across 13 feature slices, most of them duplicating the same DOM semantics.

The tracker also had to respect the ethical boundary in ADR 19: it may observe,
but it must not fingerprint, persist, or collect content.

## Decision

1.  **One typed catalog is the contract.** `src/core/telemetry/types.ts` declares an
    `TelemetryEventPropsMap` of ~45 event names grouped by namespace (`nav.*`,
    `impression.*`, `ui.*`, `form.*`, `input.*`, `error.*`, `session.*`, `perf.*`,
    `disruption.*`, plus bridged domain events). Emitting an undeclared event is a
    compile error, and every event carries the same envelope (`id`, `name`,
    `category`, `timestamp`, `sessionId`, `route`, `locale`, `source`, `props`,
    optional `durationMs`).

2.  **Capture is generic first, semantic second.** A single `TelemetryProvider`
    mounted in `ClientRootProviderContainer` installs:
    - document-level delegation for clicks, submits, toggles, selects, sliders and
      text-field blur, deriving names from the existing `data-slot` attributes,
      `data-track-section`, and a small number of `data-track*` annotations;
    - one `IntersectionObserver` for `[data-track-impression]` nodes
      (≥50 % visible for 500 ms, once per key per route);
    - `useReportWebVitals` from `next/web-vitals` for TTFB/FCP/LCP/INP/CLS,
      including soft navigations;
    - `error`/`unhandledrejection` listeners for faults that never reach a boundary.

    A bus bridge maps all 17 existing `AppEvents` onto the catalog, so features
    needed no instrumentation at all.

3.  **No personal data, ever.** The tracker never reads input values (only type,
    field name, presence, and a coarse length bucket), never stores URLs with query
    strings, and scrubs emails/phones/URLs/secrets out of free-form messages.
    `sanitizeProps` drops sensitive keys regardless of what a call site passes.
    `sessionId` is an in-memory UUID that dies with the tab; there are no cookies
    and no storage.

4.  **Sinks are composed per environment.** Events always go to the app event bus
    (`telemetry:event`) and Sentry breadcrumbs, but Sentry only receives fault and
    funnel categories — impressions, inputs and vitals would otherwise flood its
    100-breadcrumb buffer. Development additionally prints every event to a tslog
    sub-logger (`[interaction] …`), which is the local review surface. A first-party
    `sendBeacon` sink exists but stays inert unless
    `NEXT_PUBLIC_TELEMETRY_BEACON_URL` is configured.

5.  **High-volume data is sampled and deduped.** Web vitals sample at 25 % in
    production; duplicate UI events inside 300 ms (inputs: 500 ms) are dropped; a
    bounded 200-event in-memory history backs `window.maw.tracker`. The `/debug`
    route is excluded from capture to avoid feedback loops.

6.  **Vercel Analytics becomes optional.** Web vitals are captured first-party, so
    removing `@vercel/analytics` no longer removes performance visibility. Page
    views are already derivable from `nav.route-view`/`session.*`; the remaining
    blocker for full removal is first-party visitor counting, which is deliberately
    out of scope until a consent-aware collector exists.

## Consequences

- Developers see a live, filterable interaction stream in the browser console and
  in `/debug` → Event history without extra tooling.
- Sentry error reports now arrive with breadcrumbs describing the route, recent
  clicks, form attempts and HTTP failures.
- Adding a new tracked interaction is usually zero component edits (annotate with
  `data-track-impression` / `data-track-section`, or emit an existing app event);
  only genuinely new semantics require adding a catalog entry and calling `track`.
- Enabling the beacon or removing Vercel Analytics still requires a privacy-policy
  update in every locale, because that is when data starts leaving the browser
  beyond Sentry.
- The layer deliberately couples to Next's built-in `web-vitals` and the Base UI
  `data-slot` convention; if either changes, the catalog and the delegation
  selectors are the only places to update.
