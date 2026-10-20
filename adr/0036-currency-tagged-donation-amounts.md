# ADR 36: Currency-Tagged Donation Amounts

## Status
Accepted

Amends [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md) (the
response-level `currency` field) and [ADR 35](0035-dedicated-currency-rates-endpoint.md)
(which kept `DonationSummaryResponse.currency`).

## Context
ADR 32–35 made display-currency conversion a frontend concern and kept the API in a
single base currency. The donation summary expressed that base once, with
`DonationSummaryResponse.currency`, while every figure was a bare `number`:
`totals.donations`, `monthly[].expenses`, `tiers[].amount`, `goal.amount` and
currency-formatted `stats[].value`. Nothing at the field level said an amount was
money, let alone which currency it was in.

That produced three problems:

- Every consumer had to remember that an arbitrary number was EUR, and the knowledge
  lived in prose and a single response-level field rather than in the value itself.
- Adding a second currency to any one amount would have required an implicit,
  out-of-band convention no type could enforce.
- The frontend carried the same assumption independently (`DONATION_BASE_CURRENCY`),
  so the API and web could drift without any compiler complaint.

## Decision

1.  **Money is a value, not a formatting convention.** The donation contract gains a
    reusable `CurrencyAmount` shape, `{ value, currency }`. Every monetary value in
    the donation response uses it: `totals`, each `monthly` entry, currency-formatted
    `stats`, `tiers[].amount` and `goal.amount`. The property name stays `amount` (or
    `value`) at the call site; only its shape changes.

2.  **The response-level `currency` is removed.** With every amount carrying its own
    currency, a summary-level currency is redundant and a second source of truth. The
    currency rates endpoint's `base` describes the conversion table, not the
    donation payload.

3.  **Scalar stats stay scalar.** `DonationStat` becomes a union discriminated by
    `format`: `currency` stats carry a `CurrencyAmount`, while `percent`, `integer`,
    `ratio` and `duration` stats carry a `number`. Currency is only attached where it
    is meaningful.

4.  **Sums refuse to mix currencies.** `computeTotals` sums the `.value` of the
    monthly entries and throws on a currency mismatch instead of silently adding
    unlike amounts. Authoring stays in the base currency, so this is a data-integrity
    guard, not a conversion path.

5.  **The API version goes major.** Changing a field's type is a breaking response
    change, so `content.themostannoyingwebsite.com` moves to `2.0.0`. The SDK is
    regenerated from the OpenAPI spec (ADR 11/29) and the web app is realigned
    alongside it.

6.  **The web reads currency from the values.** The balance counter, impact stats,
    tiers and the custom amount all take the currency from the amount they render or
    convert, instead of assuming `DONATION_BASE_CURRENCY`. The constant remains only
    as the fallback base when the currency endpoint is unreachable.

## Consequences
- **Pros**: A monetary value is self-describing end to end — API, OpenAPI spec,
  generated SDK, and React props — so a currency can never be dropped silently.
- **Pros**: The contract can support mixed-currency amounts later without another
  shape change, and the frontend no longer duplicates the API's base-currency
  assumption at call sites.
- **Pros**: Summing is guarded against mismatched currencies, turning a potential
  silent accounting bug into a loud failure.
- **Cons**: A breaking contract change — every amount is now an object, the top-level
  `currency` disappears, and the SDK must be regenerated. The content API and web
  app must deploy together or the app must tolerate both shapes.
- **Cons**: The payload is more verbose (every amount repeats its currency) and the
  currency-formatted stat value reads as `stat.value.value`.
- **Cons**: A major version bump resets the API's semver line; consumers pinning the
  old shape must migrate before upgrading.
