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

1.  **One typed catalog is the contract.** `src/core/telemetry/types.ts` declares a
    `TelemetryEventPropsMap` of ~44 event names grouped by namespace (`nav.*`,
    `impression.*`, `ui.*`, `form.*`, `input.*`, `error.*`, `session.*`, `perf.*`,
    `disruption.*`, `commerce.*`, `marketing.*`, `achievement.*`, `support.*`,
    `admin.*`). Emitting an undeclared event is a compile error, and every event
    carries the same envelope (`id`, `name`, `category`, `timestamp`, `sessionId`,
    `route`, `routeAlias`, `locale`, `source`, `props`, optional `durationMs`).
    `routeAlias` is the page identity declared by `PageLayout`; the tracker reads
    it from the committed `data-route-alias` attribute, so every capture path and
    explicit `track()` call shares one stable value without effect-ordering races.

    Surfaces are typed too: `catalog.ts` holds the `TELEMETRY_SECTIONS` registry
    behind `data-track-section` and the `section` props of shared actions, first
    as a compile-time union and then as a runtime guard, so neither a typo nor a
    stale attribute can silently orphan a funnel. Semantic option identities
    travel as `optionValue`, never `value` — the redactor drops `value`
    unconditionally.

2.  **Capture is generic first, semantic second.** A single `TelemetryProvider`
    mounted in `ClientRootProviderContainer` installs:
    - document-level delegation for clicks, submits, toggles, selects, sliders and
      text-field blur, deriving names from the existing `data-slot` attributes,
      `data-track-section`, and a small number of `data-track*` annotations;
    - one `IntersectionObserver` for `[data-track-impression]` nodes (once per key
      per route). An element counts as visible at ≥50 % of its own area for
      500 ms, or — for elements taller than the viewport, such as article bodies
      — once it covers half of the viewport, at which point the impression is
      emitted with that ratio;
    - `useReportWebVitals` from `next/web-vitals` for TTFB/FCP/LCP/INP/CLS,
      including soft navigations;
    - `error`/`unhandledrejection` listeners for faults that never reach a boundary.

    Page identity is locale-aware: `locale + pathname` re-arms page views, dedupe
    and impressions, because a language switch keeps the locale-relative pathname.

    A bus bridge maps the 15 behavioural `AppEvents` onto the catalog, so features
    needed no instrumentation at all. Route-level bus events (`navigation:changed`,
    `route:visit`) are deliberately not bridged: `nav.route-view` reports every
    route and the envelope already carries `routeAlias`. Base UI `Select` popups
    are portaled options that fire no `change`, so an annotated `SelectContent`
    emits `ui.select` from the delegated click instead.

3.  **No personal data, ever.** The tracker never reads input values (only type,
    field name, presence, and a coarse length bucket), never stores URLs with query
    strings, and scrubs emails/phones/URLs/secrets out of free-form messages.
    Credential and payment fields are excluded even when their form opts into
    tracking, `mailto:`/`tel:` links report their kind but never their address, and
    `sanitizeProps` drops sensitive keys regardless of what a call site passes.
    `sessionId` is an in-memory UUID that dies with the tab; there are no cookies
    and no storage.

4.  **Sinks are composed per environment.** Events always go to the app event bus
    (`telemetry:event`) and Sentry breadcrumbs. Sentry receives the interaction and
    funnel categories — impressions, inputs, sessions and vitals are excluded so the
    100-breadcrumb buffer keeps the interesting trail. Development additionally
    prints every event to a tslog sub-logger (`[interaction] …`), which is the local
    review surface.

    Sentry breadcrumbs are the only data that leaves the browser today; they travel
    with the next captured error. There is deliberately **no first-party network
    transport yet**: a collector needs an ingest endpoint, a consent grant,
    retention, and a privacy-policy update in every locale. Shipping the browser
    half alone would leave a silent dead end. See "Transport" below.

5.  **High-volume data is sampled and deduped.** Web vitals sample at 25 % in
    production; duplicate UI events inside 300 ms (inputs: 500 ms) are dropped; a
    bounded 200-event in-memory history backs `window.maw.tracker`. Delegation,
    impressions, vitals and the bus bridge are suppressed on the `/debug` route to
    avoid feedback loops; explicit `track()` calls from shared modules are not.
    Form abandonment is reported while the form is still connected (page hide) or
    from the route-level book, so a soft navigation does not lose it.

6.  **Vercel Analytics stays until a collector exists.** The tracker already
    produces universal `nav.route-view` events, so page views and vitals are
    available *in the browser*; nothing is aggregated or retained yet. Removing
    `@vercel/analytics` therefore still removes the only production page-view and
    web-vitals reporting we have, and is deferred to the transport decision.

## Transport

Deferred, tracked by a follow-up ADR. The options considered were:

- a same-origin route handler writing to Postgres (typed end-to-end, but needs a
  database, pooling and a retention job);
- a same-origin route handler writing NDJSON to object storage (cheapest, but all
  queries become batch jobs);
- OTLP to an existing observability backend (best tooling, extra vendor and a
  payload mapping);
- no transport at all (this decision).

Whatever lands must ship with an analytics consent grant, a `globalPrivacyControl`
/ `doNotTrack` check, server-side re-validation, and a privacy-policy revision in
every locale.

## Consequences

- Developers see a live, filterable interaction stream in the browser console and
  in `/debug` → Event history without extra tooling.
- Sentry error reports now arrive with breadcrumbs describing the route, page
  alias, recent clicks, form attempts and HTTP failures.
- Adding a new tracked interaction is usually zero component edits (annotate with
  `data-track-impression` / `data-track-section`, or emit an existing app event);
  only genuinely new semantics require adding a catalog entry and calling `track`.
  A new surface must also join `TELEMETRY_SECTIONS`, which the section drift test
  enforces for both the attribute and the prop path.
- Nothing is retained beyond Sentry breadcrumbs: the layer is a local review
  surface until the transport ADR lands. Do not remove `@vercel/analytics` before
  then.
- Enabling a transport will require a privacy-policy update in every locale,
  because that is when data starts leaving the browser beyond Sentry.
- The layer deliberately couples to Next's built-in `web-vitals` and the Base UI
  `data-slot` convention; if either changes, the catalog and the delegation
  selectors are the only places to update.
