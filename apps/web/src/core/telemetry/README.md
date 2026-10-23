# Interaction telemetry

A small, typed, privacy-first observability layer for user interactions. It
answers "what was the user doing?" without turning the site into a tracking
surface. Design rationale: [ADR 37](../../../../../adr/0037-user-interaction-telemetry.md).

There is **no network transport yet**: events live in the browser (console +
`/debug` + `window.maw.tracker`) and in Sentry breadcrumbs. See
[Transport](#transport).

## Quick reference

```ts
import { track, trackOnce } from '@/core/telemetry';

track('ui.share', { channel: 'native', surface: 'content:article' });

// Once per key until the next route change.
trackOnce('hero', 'impression.element', {
  key: 'hero',
  ratio: 1,
  visibleMs: 500,
});
```

`track()` is typed against the catalog in `types.ts`. `trackDynamic()` exists only
for the event-bus bridge, which validates its mapping separately.

## Capture model

| Source | What it captures | Where |
| --- | --- | --- |
| Delegation | page views, clicks, form start/submit/abandon, validation failures, toggles, selects, sliders, text-field blur, link kinds, dialog open/close, scroll depth, visibility, session lifecycle | `react/useInteractionTracking.ts` |
| IntersectionObserver | `[data-track-impression]` nodes (once per key per route) | `react/useImpressionTracking.ts` |
| Web vitals | TTFB, FCP, LCP, INP, CLS with route + `navigationType` | `react/useWebVitalsTracking.ts` |
| Event bus bridge | every `AppEvents` emission (17 today) | `bus-bridge.ts` |
| Global handlers | `window.error`, `unhandledrejection`, resource load failures | `useInteractionTracking.ts` |
| Call sites | `HttpClient`, `ErrorBoundary`, React Query cache | those modules |

### Page identity

`PageLayout` renders `<main data-route-alias={route}>`. The tracker reads that
committed attribute (like `location.pathname` and `document.lang`) and copies it
onto every envelope as `routeAlias`, so delegated capture, impressions, vitals
and explicit `track()` calls share one stable page identity — including dynamic
routes such as `article.single`. Pages without a `route` simply omit the field.

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
  drift test (`sections.test.ts`) fails when markup invents a new one.
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
  instead of an anonymous `ui.click`.
- `data-track-field` names a control that has no `name`, e.g. the header pain
  level slider, so `ui.slider` reports `control: 'pain-level'` instead of
  `control: 'input'`. Its `valueBucket` is the filled portion of the control's
  own `min`–`max` range in 10 % steps, never the raw value.
- `data-track-impression` opts an element into impression tracking; `data-track-key`
  makes it stable across reorders, `data-track-index` is the fallback identity.
  Elements taller than the viewport are impressed once they cover half of the
  viewport, not half of their own (unreachable) area.
- `data-track-form` names a form and opts its text fields into `input.change`.
- `data-track-input` opts a single text field in.
- `data-track-ignore` suppresses capture for a subtree.

### Select popups and language changes

A Base UI `Select` fires no native `change` event, and its popup items are not
action elements, so the language funnel is emitted explicitly by
`useLanguageSwitcher`:

- `ui.select-open` (`control: 'navigation:language'`) when the menu opens.
- `nav.locale-change` (`locale` + `from`) when a different locale is picked;
  re-selecting the current locale is not reported.

Both carry the switcher `section` passed to the hook (`navigation:header`,
`navigation:mobile-menu`, `navigation:footer`, `settings:preferences`).

## Privacy rules

- Never send input values. `input.change` carries `hasValue` + `lengthBucket` only.
- Credential and payment fields are skipped even on opted-in forms
  (`password`, `file`, `cc-*`, `one-time-code`, and names matching
  `pass|card|cvv|cvc|ssn|secret|token`).
- `mailto:` and `tel:` links report `kind` but no `path`, because the pathname *is*
  the address / phone number.
- `route` is always a pathname; query strings and fragments are stripped.
- `scrubMessage` redacts emails, phone numbers, URLs and `token=…`/`password=…`.
- `sanitizeProps` drops `password`, `value`, `email`, `query`, `token`, … before any
  sink sees the event. Semantic identities use `optionValue`, not `value`.
- `sessionId` is an ephemeral in-memory UUID. No cookies, no `localStorage`.
- The `/debug` route is excluded from every capture path, not only clicks.

## Sinks

| Sink | Development | Production |
| --- | --- | --- |
| `bus` (`telemetry:event`, feeds `/debug`) | ✅ | ✅ |
| `sentry` (breadcrumbs, allowlisted categories) | ✅ | ✅ |
| `console` (tslog `interaction` sub-logger) | ✅ | ❌ (unless `NEXT_PUBLIC_TELEMETRY_CONSOLE=true`) |

Sentry receives `nav`, `ui`, `form`, `error`, `disruption`, `commerce`,
`marketing`, `achievement`, `support`, `admin`. Impressions, inputs, sessions and
web vitals are intentionally excluded: they are aggregate data and would evict the
fault trail from the breadcrumb buffer.

### Transport

None. A first-party collector needs an ingest endpoint, an analytics consent
grant, retention rules and a privacy-policy update in every locale; shipping the
browser half alone leaves a silent dead end. The options and their trade-offs are
recorded in [ADR 37 § Transport](../../../../../adr/0037-user-interaction-telemetry.md#transport).

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
  dropped (`CATEGORY_DEDUPE_WINDOW_MS`).
- CLS is stored in thousandths (integer) so all vitals are integers.
- `durationMs` on the envelope is the only place for measured timings (e.g.
  `error.http` latency); event props do not carry `*Ms` duplicates.

## Tests

- `tracker.test.ts` — envelope, redaction (including `optionValue` vs `value`),
  sampling, dedupe, history, sink isolation.
- `redact.test.ts` — scrubbing, path normalisation, length buckets.
- `bus-bridge.test.ts` — exhaustive event mapping plus the subscribing hook.
- `sections.test.ts` — every rendered `data-track-section` is declared.
- `react/capture.test.ts` — pure DOM/URL helpers, privacy guards, form counting,
  impression ratios.
- `react/useInteractionTracking.test.tsx` — delegation, links, forms, credential
  fields, ignores, suppression.
- `react/useImpressionTracking.test.tsx` — dwell timing, tall elements, dedupe,
  cancel.
- `react/useWebVitalsTracking.test.tsx` — metric mapping, CLS units, suppression.
- `sinks/*.test.ts` — Sentry allowlist, route alias and bus delivery.
- `app/[locale]/(public)/_components/PageLayout.test.tsx` — the page alias
  attribute is published only when a route is declared.
