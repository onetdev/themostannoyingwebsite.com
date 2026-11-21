# Instrumentation and Telemetry Review

Use this reference only when the PR adds or changes instrumentation, analytics, logging, event tracking, auditing, or metrics. The main [review checklist](review-checklist.md) still applies.

## 1. Contract and catalog

- [ ] Every declared event/metric/span is emitted somewhere.
- [ ] Every emitted event/metric/span is declared in the typed contract.
- [ ] Event names, category names, and prop names are stable and consistent.
- [ ] Every declared surface/section is rendered or passed as a typed value.
- [ ] Every rendered annotation is registered; a typo cannot silently create a new funnel.
- [ ] `data-track`, `data-track-control`, and similar literals have a registry or a drift test.
- [ ] Measured timings live in one canonical place, as documented.
- [ ] Union members, source variants, states, and optional props are reachable in production.
- [ ] Open/close, start/end, request/response, and attempt/result events can be paired.
- [ ] Event keys include the dimensions needed to avoid collisions (route, section, instance, tenant).
- [ ] Form or entity keys are unique per instance; anonymous fallbacks cannot merge unrelated records.

## 2. Capture and event semantics

- [ ] The main interaction path emits the intended semantic event, not only a generic click.
- [ ] Every claimed entry point is instrumented (navigation, share, copy, error, rating, notification, form submit).
- [ ] Controlled components emit open/close from actual state, not only from trigger/close-button clicks.
- [ ] Portaled overlays carry their own scope/section; ancestors do not cover them.
- [ ] Select/radio/toggle/checkbox/switch controls capture keyboard, label, and option selections.
- [ ] Hidden/mirror inputs and headless-library markup are understood.
- [ ] A suppression/ignore/disabled flag is honored in click, change, focus, submit, impression, error, and bus paths.
- [ ] An opt-out or "disabled" build truly stops collection, not only emission.
- [ ] Delayed events (timers, promises, rAF) cannot be attributed to the next route/tenant/request.
- [ ] Event names and prop names are used consistently (`section` vs `surface`, `durationMs` vs `latencyMs`).
- [ ] No two mechanisms capture the same semantic event unintentionally.

## 3. Selectors, matchers, and audits

- [ ] Capture and audit selectors are derived from the same source of truth or tested for parity.
- [ ] Audit covers every element that can emit: buttons, links, inputs, selects, textareas, annotated nodes, triggers/closes, toggle/radio items, options, and visible role controls.
- [ ] Audit excludes only things that truly do not emit (hidden, inert, `aria-hidden`, ignored, disabled by design).
- [ ] Audit does not report non-emitting elements as unscoped.
- [ ] Selector assumptions match the installed headless library's actual markup (span vs button, role, data-slot, hidden input).
- [ ] `closest()` chains survive wrappers, labels, SVG, and portals.
- [ ] E2E tests open the surfaces they claim to audit, including non-default flags/states.
- [ ] Browser matrix cost is justified; DOM-only audits can run on one browser.

## 4. Privacy and value tracing

Trace **values**, not just keys:

- [ ] Each captured value is traced to every sink (console, bus, Sentry, network, storage, globals).
- [ ] A denylist of prop names cannot be bypassed by renaming a prop (`value` -> `optionValue`, `query` -> `queryKey`).
- [ ] Semantic identifiers that encode personal data are treated as personal data: birth date, gender, country, survey answers, consent, ratings, preferences, search terms.
- [ ] Credential and payment fields are excluded on every path, including label clicks, mirrored inputs, programmatic changes, and form-level opt-in.
- [ ] Password/OTP/card length is not treated as harmless when the contract says credentials are excluded.
- [ ] `mailto:` / `tel:` links do not leak the address or phone number through paths, labels, titles, or error payloads.
- [ ] Free-form messages are scrubbed at the sink, not only at one call site.
- [ ] Query strings, fragments, and user-search terms are stripped or reduced to safe aggregates.
- [ ] Debug globals, history arrays, and event buses are not exposed in production unless the PR explicitly accepts that risk.
- [ ] Any global event bus that carries the data is considered a sink.
- [ ] Consent / GPC / DNT / opt-out requirements are met for **every** transport, including third-party breadcrumbs.
- [ ] Third-party defaults (DOM breadcrumbs, analytics page views, error capture) do not duplicate or exceed the intended collection.
- [ ] Retention, payload size, breadcrumb-buffer eviction, and sampling are considered.

## 5. Sampling, deduplication, and volume

- [ ] High-volume categories are sampled or deduped, not only the easy ones.
- [ ] Deduplication windows are appropriate to the event type (click, input, error, scroll, progress).
- [ ] Errors and disruptions have a volume strategy; retries do not multiply identical events.
- [ ] Sampling is applied before expensive serialization/sink work where possible.
- [ ] Maps/sets used for dedupe/history are bounded or cleared at the right boundary.
- [ ] Event history/log buffers are bounded.
- [ ] Sentry/breadcrumb/analytics buffers cannot be evicted by noisy generic events.

## 6. Lifecycle and performance

- [ ] Observers, listeners, timers, and rAF callbacks are cleaned up and cannot fire against stale state.
- [ ] Intersection observers unobserve removed nodes.
- [ ] Mutation observers are scoped/debounced and drop removed nodes.
- [ ] Full-document scans do not run on every animation frame or high-frequency event.
- [ ] Work stops when all work is done (e.g. all scroll thresholds reached).
- [ ] Disabled builds do not still install observers/listeners.
- [ ] Server bundles do not pull browser-only singletons/sinks solely to import a pure helper.

## 7. UX and design system

- [ ] Standard components were not replaced by custom ones solely to satisfy instrumentation.
- [ ] Custom replacements preserve layout, styling, focus, aria, announcements, and dismissal behavior.
- [ ] Instrumentation attributes do not add layout wrappers or alter hit targets.
- [ ] Labels, icons, and close buttons remain accessible; no hardcoded user-facing copy.
- [ ] Design-system packages stay app-agnostic; app domain strings/props do not leak into shared UI packages.
- [ ] Shared prop types remain typed; stringly-typed escape hatches are justified.
- [ ] New `data-*` attributes do not expose more than the DOM already exposes.

## 8. Tests

- [ ] New instrumentation has co-located unit/integration coverage.
- [ ] Shared-module integrations are tested (HTTP client, query cache, error boundary, analytics adapter).
- [ ] Tests cover label click, keyboard, portal, hidden input, disabled mode, route change, and rapid repeat.
- [ ] Tests assert the important dimension (section, route, alias), not only an easy value.
- [ ] Tests fail if the contract is violated, not just if the function throws.
- [ ] Tests do not encode stale assumptions about third-party markup.
- [ ] Commands run are reported exactly, including skipped checks and why.

## 9. Overengineering

- [ ] Is there a consumer **today**? If not, is the feature explicitly deferred?
- [ ] Does the contract promise more than the implementation delivers?
- [ ] Can a generic mechanism replace N bespoke annotations?
- [ ] Are there two mechanisms doing the same job (DOM capture + bus bridge + explicit tracking + default third-party breadcrumbs)?
- [ ] Are there dead events, states, source variants, props, or sink APIs?
- [ ] Is the event catalog larger than the set of questions the team can answer?
- [ ] Is the UI/design-system change justified by the instrumentation value?
- [ ] Is the test/e2e matrix proportional to the risk?
- [ ] Can local-only categories be deferred until a transport/consumer exists?
- [ ] Would removing the instrumentation leave any user-visible behavior unchanged? If yes, question the surface area.

## 10. Heuristics

- A suppression or privacy flag is usually implemented on one path and forgotten on the others.
- A denylist of prop names is not a privacy policy; values can be renamed.
- Semantic identifiers are still personal data when they encode birth date, gender, country, survey answers, consent, or preferences.
- A feature that claims "never" is worth searching for the one exception.
- A partial event pair (open captured, close generic) is worse than no pair because it looks like a funnel.
- A full-document scan or uncancelled timer is a route-attribution bug waiting to happen.
- Tests written by the author often encode the author's assumptions; look for the interaction they did not perform.
- "No transport yet" changes the cost/benefit of every event added.
