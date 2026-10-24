# Interaction telemetry

A small, typed, privacy-first observability layer for user interactions. It
answers "what was the user doing?" without turning the site into a tracking
surface. Design rationale: [ADR 37](../../../../../adr/0037-user-interaction-telemetry.md).

There is **no first-party transport yet**: events stay in the browser (console +
`/debug` + `window.maw.tracker`) and reach Sentry only as breadcrumbs attached to
the next captured error. See [Transport](#transport).

## Quick reference

```ts
import { track } from '@/core/telemetry';

track('ui.share', { channel: 'native', surface: 'content:article' });
```

`track()` is typed against the catalog in `types.ts`. `trackDynamic()` exists only
for the event-bus bridge, which validates its mapping separately. Impressions and
page views need no call: annotate the element or let the interaction hook emit
them.

## Capture model

| Source | What it captures | Where |
| --- | --- | --- |
| Delegation | page views, clicks, form start/submit/abandon, validation failures, toggles, selects, sliders, text-field blur, link kinds, dialog open/close, scroll depth, visibility, session lifecycle | `react/useInteractionTracking.ts` |
| IntersectionObserver | `[data-track-impression]` nodes (once per section + key per route) | `react/useImpressionTracking.ts` |
| Web vitals | TTFB, FCP, LCP, INP, CLS with route + `navigationType` | `react/useWebVitalsTracking.ts` |
| Event bus bridge | the 15 behavioural `AppEvents` emissions | `bus-bridge.ts` |
| Global handlers | `window.error`, `unhandledrejection`, resource load failures | `useInteractionTracking.ts` |
| Call sites | `HttpClient`, `ErrorBoundary`, React Query cache | those modules |

### Page identity

`PageLayout` renders `<main data-route-alias={route}>`. The tracker reads that
committed attribute (like `location.pathname` and `document.lang`) and copies it
onto every envelope as `routeAlias`, so delegated capture, impressions, vitals
and explicit `track()` calls share one stable page identity — including dynamic
routes such as `article.single`. Pages without a `route` simply omit the field.
The locale is part of the page identity: `nav.route-view`, dedupe state and
impression re-arming all key on `locale + pathname`, because switching language
keeps the next-intl pathname unchanged.

### Annotating a surface

```tsx
<section data-track-section="funding:donation">
  <button data-track="donation:tier" data-track-key={tier.id}>…</button>
</section>

<CarouselItem
  data-track-impression="carousel:email-sample"
  data-track-index={index}
  data-track-key={item.id /* optional */}
/>
```

- `data-track-section` labels the feature area shown in every child event. It
  applies to the nearest DOM ancestor only, so put it on the surface wrapper
  (page region, card, form) rather than on individual buttons.
- Every section must be a member of `TELEMETRY_SECTIONS` in `catalog.ts`; the
  drift tests (`sections.test.ts`) fail when markup invents a new one, when a
  `section` prop carries an unknown value, or when a declared section is never
  rendered. `resolveSection` also drops an unregistered value at runtime, so a
  stale attribute cannot publish an orphan funnel.
- Overlays are portaled to `document.body`: a section on the trigger or page
  wrapper does **not** cover the overlay. Put the section on the overlay content
  itself (`<DialogContent data-track-section="…">`, `SheetContent`,
  `PopoverContent`, `SelectContent`, `NavigationMenuContent`) or on a custom
  toast wrapper.
- In development an unscoped click logs a warning; `window.maw.tracker.auditScopes()`
  returns every action/control under the current document that would emit
  without a section. The e2e sweep asserts the same across public routes.
- `data-track` adds a semantic `trackKey` (and names dialog opens/closes). It
  works on links as well as buttons.
- `data-track-key` adds the stable identity of the clicked item (`key`), and
  `data-track-label` (or an existing `aria-label`/`title`) adds an accessible
  `label` without reading visible copy.
- `data-value` adds the stable option identity as `optionValue` — never raw input.
- `data-track-control` names a toggle group / radio group. Option values are
  rendered as `data-value` by `ToggleGroupItem` and `RadioGroupItem`, so clicking
  one emits `ui.select` with `{ control, optionIndex, optionCount, optionValue, checked }`
  instead of an anonymous `ui.click`. Grouped radios are emitted from their mirror
  `change`, so clicking the label text and keyboard arrow selection are captured
  too, not only the small radio circle.
- Base UI `Select` popups are portaled `role="option"` nodes and never fire a
  native `change`. Annotate `SelectContent` with `data-track-control` (and its own
  `data-track-section`) to emit `ui.select` for option picks; `SelectItem`
  renders `data-value`. Unannotated popups — including the language switcher,
  which emits `nav.locale-change` itself — stay silent.
- `data-track-field` names a control that has no `name`, e.g. the header pain
  level slider, so `ui.slider` reports `control: 'pain-level'` instead of
  `control: 'input'`. Its `valueBucket` is the filled portion of the control's
  own `min`–`max` range in 10 % steps, never the raw value.
- `data-track-impression` opts an element into impression tracking; `data-track-key`
  makes it stable across reorders, `data-track-index` is the fallback identity.
  The identity also includes the nearest section. An impression is emitted once,
  after 500 ms of qualifying visibility: half of the element's own area, or half
  the viewport for elements taller than the viewport (article bodies, long
  carousels). Dwell timers are paused while the document is hidden.
- `data-track-form` names a form and opts its text fields into `input.change`.
- `data-track-input` opts a single text field in.
- `data-track-ignore` suppresses capture for a subtree on every path: clicks,
  changes, focus, submit, media errors and impressions.

### Select popups and language changes

A Base UI `Select` fires no native `change` event, so option picks are captured
from the portaled popup (see `data-track-control` above). The language funnel
needs the chosen locale as well, so `useLanguageSwitcher` emits it explicitly:

- `ui.select-open` (`control: 'navigation:language'`) when the menu opens.
- `nav.locale-change` (`locale` + `from`) when a different locale is picked;
  re-selecting the current locale is not reported.

Both carry the switcher `section` passed to the hook (`navigation:header`,
`navigation:mobile-menu`, `navigation:footer`, `settings:preferences`). The
switcher popup is left unannotated so it does not also emit a generic `ui.select`.

## Privacy rules

- Never send input values. `input.change` carries `hasValue` + `lengthBucket` only.
- Credential and payment fields are skipped even on opted-in forms
  (`password`, `file`, `cc-*`, `one-time-code`, and names matching
  `pass|card|cvv|cvc|ssn|secret|token`).
- `mailto:` and `tel:` links report `kind` but no `path`, because the pathname *is*
  the address / phone number.
- `route` is always a pathname; query strings and fragments are stripped.
- `scrubMessage` redacts emails, phone numbers, URLs and `token=…`/`password=…`.
  The phone pattern is narrow (`+` international or `555-123-4567`) so date-shaped
  slugs and ids survive as identities.
- `sanitizeProps` drops `password`, `value`, `email`, `query`, `token`, … before any
  sink sees the event. Semantic identities use `optionValue`, not `value`.
- Sensitive surfaces are classified in `SENSITIVE_TELEMETRY_SECTIONS` (`auth:*`,
  survey, settings, ratings, pain level). Choice values (`optionValue`,
  `optionIndex`, `optionCount`, `checked`, `valueBucket`) are stripped before the
  event reaches any sink, and the Sentry sink drops those events entirely, so DOB,
  gender, survey answers, consent and preferences never become off-device
  breadcrumbs. The control-name prefixes (`auth:`, `survey:`, `settings:`,
  `support:rating`, `navigation:pain-level`) provide the same guard when a stale
  event arrives without its section.
- The Sentry sink also honours `globalPrivacyControl` and `doNotTrack`, and drops
  `nav.locale-change` and `ui.slider` because they are value-bearing/high-volume.
- `sessionId` is an ephemeral in-memory UUID. No cookies, no `localStorage`.
- The `/debug` route suppresses delegated capture, impressions, vitals and the bus
  bridge. Explicit `track()` calls from shared modules (HTTP, query cache,
  boundary) are not suppressed, so `/debug` still records its own query failures.

## Sinks

| Sink | Development | Production |
| --- | --- | --- |
| `bus` (`telemetry:event`, feeds `/debug`) | ✅ | ✅ |
| `sentry` (breadcrumbs, allowlisted categories) | ✅ | ✅ |
| `console` (tslog `interaction` sub-logger) | ✅ | ❌ (unless `NEXT_PUBLIC_TELEMETRY_CONSOLE=true`) |

Sentry receives `nav`, `ui`, `form`, `error`, `disruption`, `commerce`,
`marketing`, `achievement`, `support`, `admin`. Impressions, inputs, sessions and
web vitals are intentionally excluded: they are aggregate data and would evict the
fault trail from the breadcrumb buffer. Events scoped to a sensitive section and
the `nav.locale-change` / `ui.slider` events are also excluded, and the sink is
disabled for `globalPrivacyControl` / `doNotTrack` visitors.

### Transport

No first-party collector. Sentry breadcrumbs are the only off-device sink today:
they leave the browser attached to the next captured error, which is why the
allowlist stays narrow. A first-party collector needs an ingest endpoint, an
analytics consent grant, retention rules and a privacy-policy update in every
locale; shipping the browser half alone leaves a silent dead end. The options and
their trade-offs are recorded in
[ADR 37 § Transport](../../../../../adr/0037-user-interaction-telemetry.md#transport).

Do not remove `@vercel/analytics` until that lands: it is still the only
production page-view and web-vitals reporting.

## Local debugging

```js
window.maw.tracker.history();       // newest-first, last 200 events
window.maw.tracker.setEnabled(false);
window.maw.tracker.flush();
window.maw.tracker.auditScopes();   // actions/controls missing a section
```

Events also appear in `/debug` → Event history as `telemetry:event` entries once
history recording is enabled.

## Sampling & dedupe

- `perf` is sampled at 25 % in production (`CATEGORY_SAMPLING`); the rest are kept.
- Duplicate `ui`/`nav` events within 300 ms and `input` events within 500 ms are
  dropped (`CATEGORY_DEDUPE_WINDOW_MS`); the window is cleared on navigation.
- CLS is stored in thousandths (integer) so all vitals are integers.
- `durationMs` on the envelope is the canonical place for an event's measured
  duration (e.g. `error.http` latency, `session.end`). `session.visibility.visibleMs`
  is a separate state interval, not a duplicate of the event duration.

## Tests

- `tracker.test.ts` — envelope, redaction (including `optionValue` vs `value`),
  sampling, dedupe, history, sink isolation.
- `redact.test.ts` — scrubbing, date-safe ids, path normalisation, length buckets.
- `bus-bridge.test.ts` — behavioural event mapping plus the subscribing hook.
- `sections.test.ts` — every rendered or prop-passed section is declared, and every
  declared section is rendered.
- `react/capture.test.ts` — pure DOM/URL helpers, privacy guards, form counting,
  segmented and select option resolution, impression ratios.
- `react/useInteractionTracking.test.tsx` — delegation, links, forms, abandonment,
  credential fields, ignores, bfcache, suppression.
- `react/useImpressionTracking.test.tsx` — dwell timing, tall elements, dedupe,
  cancel.
- `react/useWebVitalsTracking.test.tsx` — metric mapping, CLS units, suppression.
- `sinks/*.test.ts` — Sentry allowlist, route alias and bus delivery.
- `app/[locale]/(public)/_components/PageLayout.test.tsx` — the page alias
  attribute is published only when a route is declared.
