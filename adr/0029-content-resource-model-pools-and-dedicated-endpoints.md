# ADR 29: Content Resource Model — String Pools and Dedicated Endpoints

## Status
Accepted

Supersedes [ADR 25](0025-api-only-variant-pools-ssr-hydration.md).

## Context
The Content API previously exposed a single `/api/v1/variants/:lang/:type` endpoint for
every kind of dynamic content. That conflated two very different things:

- **Flat string pools** (names, comments, marquee titles, cancellation reasons, …),
  which are genuinely interchangeable lists.
- **Structured payloads** (quiz questions, wheel prizes, newsletter steps, spam
  samples), which have multiple fields, ordering, and behavior.

Because the endpoint was generic, the client had to re-derive structure and behavior
locally: the wheel's weights and starred flags lived in a hand-maintained
`WHEEL_PRIZE_SLOTS` map, quiz answers were matched by option text, and the API's
`kind`/`limit`/`offset`/`random` surface encouraged cache-hostile, non-canonical reads.
Duplicating behavior in the client also meant it could silently drift from the content.

ADR 25 established the delivery architecture (API-only pools, server prefetch, React
Query hydration, server-only queries, per-route granularity). That architecture is
still correct; only the resource model it was applied to has changed.

## Decision

1.  **Generic string pools are strings only.** They live at
    `GET /api/v1/pool/:lang/:type` and return a flat `string[]`. `testimonials` was
    flattened from `{ comment }` to a string, and the paired `social-proof` object was
    removed entirely; the client composes social proof from the
    `social-proof-names` and `social-proof-locations` pools. Pool responses are never
    paginated or randomized, so they stay cacheable and the client owns slicing and
    shuffling.

2.  **Structured content gets dedicated endpoints.** Each item carries a stable `id`,
    and locale-independent behavior is served by the API:
    - `GET /api/v1/survey/:lang/questions` — `{ id, text, options: [{ id, label }], solution? }`
    - `GET /api/v1/prize-wheel/:lang/segments` — `{ id, label, weight, starred? }`
    - `GET /api/v1/newsletter/:lang/steps` — `{ id, text, confirm, cancel }`
    - `GET /api/v1/spam-sample/:lang` — `{ id, subject, body }`

3.  **Behavior is centralized in the Content API.** Wheel weights/starred flags and
    quiz correct answers are authored once, keyed by stable ID, and merged into the
    localized items at serve time. The client no longer maintains behavior maps; it may
    only *decorate* (e.g. append the `*` suffix for a starred wheel segment).

4.  **The SDK exposes one resource per content area.** `client.pools` (catalog +
    `getByType`), plus `client.survey`, `client.prizeWheel`, `client.newsletter`, and
    `client.spamSample`, replacing `client.variants`.

5.  **The web app consumes everything through a unified `usePool`.** A single
    `ContentPoolType` union (`PoolType | 'survey' | 'prize-wheel' | 'newsletter' |
    'spam-sample'`) and `ContentPoolItem<T>` map back a dispatching fetch service, one
    React Query key/options pair, one prefetch helper, and one `ContentPoolsBoundary`.
    Feature hooks (`useSurveyQuestions`, `useWheelOfFortune`, `NewsletterModal`,
    `OnlySpamsService`) are thin consumers of that layer. The ADR 25 delivery model
    (server-only query function, infinite `staleTime`/`gcTime`, per-route prefetch,
    hydration) is preserved; only the cache key namespace moved from `variants` to
    `content-pools`, with a cache tag per resource.

6.  **Generation can target an overridable spec.** `CONTENT_OPENAPI_URL` lets Orval
    regenerate the client against a local `pnpm dev` spec, defaulting to the deployed
    Content API, so regeneration is reproducible and does not require production to be
    reachable.

## Consequences
- **Pros**: A single source of truth for both content *and* behavior; the client can no
  longer drift from the API's weights/answers.
- **Pros**: Structured content is strongly typed end to end, and stable IDs make items
  addressable for future behavior.
- **Pros**: Cacheable, unsliced pool responses; one dispatching `usePool` keeps the
  consumer surface small.
- **Pros**: `testimonials` and `social-proof` no longer carry redundant shapes.
- **Cons**: Regenerating the SDK renames generated types (operation-id driven), so a
  contract change is a coordinated SDK + web change rather than a drop-in.
- **Cons**: The dedicated endpoints mean the client dispatch layer must know each
  resource's response key (`questions`/`segments`/`steps`/`samples`); this is isolated
  in one service module.
- **Cons**: Removing `social-proof` shifts composition responsibility to the client,
  which must pair names and locations itself.
