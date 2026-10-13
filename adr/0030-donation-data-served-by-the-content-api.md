# ADR 30: Donation Data Served by the Content API

## Status
Accepted

Extends [ADR 29](0029-content-resource-model-pools-and-dedicated-endpoints.md).

## Context
The donation page mixed three sources of truth:

- The funding numbers (`costStartEpoch`, `costDailyAvgInEuro`, `totalDonationInEuro`)
  lived in the web app's deployment config (`apps/web/src/core/config/index.ts`) and
  were validated by `FundingConfigSchema`.
- The current balance was computed **client-side** by
  `DonationService.calculateBalance()` and read through `useDonationBalance`, so the
  accrual math was duplicated away from the data and could not be reused or
  reasoned about server-side.
- The "impact" section (monthly history, headline stats, top supporters) was
  hardcoded mock data inside `apps/web`.

This had several problems. Changing a single number required redeploying the web
app, user-visible values and copy were entangled in client code, and a data
change could silently drift from the balance formula. The content repo already
owns localized, cacheable content for every other dynamic surface and exposes it
through the dedicated-endpoint model from ADR 29, so donation data belonged
there.

## Decision

1.  **Donation data gets a dedicated Content API endpoint.** Following ADR 29's
    rule that structured content is served by an explicit endpoint (not a generic
    string pool), the Content API exposes
    `GET /api/v1/donation/:lang` returning a single `DonationSummaryResponse`:

    ```
    {
      lang, currency,
      totals: { donations, expenses, balance },
      monthly: [ { month, donations, expenses } ],   // oldest first, expenses positive
      stats:   [ { id, labelKey, value, format, trend: { direction, percent, sentiment } } ],
      supporters: [ { id, tier } ],
      updated_at
    }
    ```

2.  **The Content API owns the numbers and the balance math.** A single shared,
    locale-independent module (`src/content/donation/data.ts`) holds the monthly
    history, trend stats and supporters; `getDonationSummary()` derives
    `totals.expenses` and `totals.balance` from the monthly rows at serve time.
    The web app no longer computes a balance.

3.  **The API returns data, not presentation.** Values stay numeric and currency
    stays a separate field (`value` + `format` + response-level `currency`); the
    frontend owns locale-aware formatting. Stat labels are returned as i18n keys
    (`labelKey`) which the frontend resolves against its translation messages,
    keeping copy out of the API. Supporter names are likewise resolved by the
    frontend from stable `id`/`tier` values.

4.  **The SDK grows one resource.** `client.donations.getSummary(lang)` is added
    alongside the other dedicated resources, with a new `content:donation` cache
    tag (regenerated from the OpenAPI spec, per ADR 29).

5.  **The web app fetches on the server.** `DonationPage` fetches the summary
    during rendering (ISR, `next: { revalidate, tags: ['content:donation'] }`) and
    passes it to the client components. A failed fetch degrades gracefully: the
    balance falls back to zero and the impact section is omitted rather than
    failing the route.

6.  **Obsolete web-side machinery is removed.** The `funding.*` numeric config
    fields, `FundingConfigSchema` entries, `DonationService.calculateBalance()`
    and the `useDonationBalance` hook are deleted.

7.  **Cumulative figures are derived on the client.** The cumulative-cost chart is
    the running sum of the monthly series, so no redundant `cumulative` array is
    served and the graph always reconciles with `totals`.

## Consequences
- **Pros**: Donation figures, supporter data and the balance formula have a single
  owner; changing them no longer requires a web-app release.
- **Pros**: All donation content is cacheable and revalidated through the Content
  API like every other dynamic resource, and the SDK keeps the contract typed end
  to end.
- **Pros**: Removing the client-side balance logic deletes a duplicated formula and
  its tests, and `server-only` fetching keeps the donation call out of the browser
  bundle.
- **Pros**: Presentation concerns (formatting, label copy, medals) stay in the
  frontend, so the API carries no locale-specific strings for this resource.
- **Cons**: The donation page now depends on the Content API at render time; when
  the API is unreachable the section disappears (a deliberate graceful
  degradation).
- **Cons**: Numbers are static content, so the balance no longer grows on its own
  with time — changing the figures requires editing and redeploying the content
  repo.
- **Cons**: Adding the endpoint is a coordinated two-repo change (content API +
  regenerated SDK), as ADR 29 already warns for contract changes.
