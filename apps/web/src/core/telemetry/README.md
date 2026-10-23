# Interaction telemetry

A small, typed, privacy-first observability layer for user interactions. It
answers "what was the user doing?" without turning the site into a tracking
surface. Design rationale: [ADR 37](../../../../../adr/0037-user-interaction-telemetry.md).

## Quick reference

```ts
import { track, trackOnce } from '@/core/telemetry';

track('ui.share', { channel: 'native', surface: 'article' });

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
| Delegation | clicks, form start/submit/abandon, validation failures, toggles, selects, sliders, text-field blur, link kinds, dialog open/close, scroll depth, visibility, session lifecycle | `react/useInteractionTracking.ts` |
| IntersectionObserver | `[data-track-impression]` nodes (≥50 % for 500 ms, once per key per route) | `react/useImpressionTracking.ts` |
| Web vitals | TTFB, FCP, LCP, INP, CLS with route + `navigationType` | `react/useWebVitalsTracking.ts` |
| Event bus bridge | every `AppEvents` emission (17 today) | `bus-bridge.ts` |
| Global handlers | `window.error`, `unhandledrejection`, resource load failures | `useInteractionTracking.ts` |
| Call sites | `HttpClient`, `ErrorBoundary`, React Query cache | those modules |

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

- `data-track-section` labels the feature area shown in every child event.
- `data-track` adds a semantic `trackKey` (and names dialog opens/closes).
- `data-track-key` / `data-value` add the stable identity of the clicked item to
  `ui.click` (e.g. a donation tier id). `data-track-label` (or an existing
  `aria-label`/`title`) adds an accessible `label` without reading visible copy.
- `data-track-control` names a toggle group / radio group. Option values are
  rendered as `data-value` by `ToggleGroupItem` and `RadioGroupItem`, so clicking
  one emits `ui.select` with `{ control, optionIndex, optionCount, value, checked }`
  instead of an anonymous `ui.click`.
- `data-track-field` names a control that has no `name`, e.g. the header pain
  level slider, so `ui.slider` reports `control: 'pain-level'` instead of
  `control: 'input'`. Its `valueBucket` is the filled portion of the control's
  own `min`–`max` range in 10 % steps, never the raw value.
- `data-track-impression` opts an element into impression tracking; `data-track-key`
  makes it stable across reorders, `data-track-index` is the fallback identity.
- `data-track-form` names a form and opts its text fields into `input.change`.
- `data-track-input` opts a single text field in.
- `data-track-ignore` suppresses capture for a subtree.

## Privacy rules

- Never send input values. `input.change` carries `hasValue` + `lengthBucket` only.
- `route` is always a pathname; query strings and fragments are stripped.
- `scrubMessage` redacts emails, phone numbers, URLs and `token=…`/`password=…`.
- `sanitizeProps` drops `password`, `value`, `email`, `query`, `token`, … before any
  sink sees the event.
- `sessionId` is an ephemeral in-memory UUID. No cookies, no `localStorage`.
- The `/debug` route is excluded from capture.

## Sinks

| Sink | Development | Production |
| --- | --- | --- |
| `bus` (`telemetry:event`, feeds `/debug`) | ✅ | ✅ |
| `sentry` (breadcrumbs, allowlisted categories) | ✅ | ✅ |
| `console` (tslog `interaction` sub-logger) | ✅ | ❌ (unless `NEXT_PUBLIC_TELEMETRY_CONSOLE=true`) |
| `beacon` (first-party `sendBeacon`) | only with URL | only with URL |

Sentry receives `nav`, `ui`, `form`, `error`, `disruption`, `commerce`,
`marketing`, `achievement`, `support`, `admin`. Impressions, inputs and web vitals
are intentionally excluded: they are aggregate data and would evict the fault
trail from the breadcrumb buffer.

### Enabling the beacon

```sh
export NEXT_PUBLIC_TELEMETRY_BEACON_URL=https://collector.example/api/vitals
```

The body is JSON sent as `text/plain` (CORS-simple for `sendBeacon`), shaped as
`{ v: 1, sessionId, events: [...] }`. Only `nav`, `session`, `form`, `error` and
`perf` events are forwarded, batched at 20 events or on page hide. Configure a
collector before enabling this in production, and update the privacy policy in
every locale first.

## Local debugging

```js
window.maw.tracker.history();   // newest-first, last 200 events
window.maw.tracker.setEnabled(false);
window.maw.tracker.flush();
```

Events also appear in `/debug` → Event history as `telemetry:event` entries once
history recording is enabled.

## Sampling & dedupe

- `perf` is sampled at 25 % in production (`CATEGORY_SAMPLING`).
- Duplicate `ui` events within 300 ms and `input` events within 500 ms are dropped
  (`CATEGORY_DEDUPE_WINDOW_MS`).
- CLS is stored in thousandths (integer) so all vitals are integers.

## Tests

- `tracker.test.ts` — envelope, redaction, sampling, dedupe, history, sink isolation.
- `redact.test.ts` — scrubbing, path normalisation, length buckets.
- `bus-bridge.test.ts` — exhaustive mapping coverage.
- `react/capture.test.ts` — pure DOM/URL helpers.
- `react/useInteractionTracking.test.tsx` — delegation, forms, ignores, suppression.
- `react/useImpressionTracking.test.tsx` — dwell timing, dedupe, cancel.
- `react/useWebVitalsTracking.test.tsx` — metric mapping and CLS units.
