# ADR 35: Dedicated Currency Rates Endpoint

## Status
Accepted

Amends [ADR 33](0033-donation-exchange-rates.md) (rates were served inside the
donation summary) and [ADR 34](0034-donation-currency-offer-and-fixed-eur-figures.md)
(the served rate list doubled as the offered-currency set and was read from the
summary).

## Context
ADR 32/33/34 layered display-currency conversion onto the donation summary:
`GET /api/v1/donation/:lang` returned both the donation figures (totals, monthly
history, stats, supporters, tiers and goal) and a `rates` table. The two have
different natures and lifecycles:

- The donation summary is language-scoped, largely static content, and cached per
  locale.
- The rates are locale-independent, refreshed daily from Frankfurter/ECB and
  CoinGecko, and are the *offer* the currency picker is built from.

Bundling them coupled every donation consumer to the exchange-rate machinery,
made "which currencies are offered" implicit inside a donation payload, and left
no way to fetch rates without pulling the whole summary. A route like
`/donation/rates` was also a poor fit: it would collide with the `/donation/:lang`
path segment.

## Decision

1.  **Rates get their own endpoint.** `GET /api/v1/currency/rates` returns
    `{ base, rates: [{ code, rate }], updated_at }`. It is locale-independent and
    takes no path or query parameters. `base` is the currency every rate is quoted
    against (its own rate is implicit).

2.  **The donation summary no longer carries rates.** `DonationSummaryResponse.rates`
    is removed; its `currency` field (the base) stays. Rates are a separate fetch.

3.  **The rate source moves to a currency domain.** `src/content/currency/` owns the
    base currency, the static seed, and the live fetch/cache; the previous
    `src/content/donation/rates.ts` is deleted. The donation module references the
    base currency from the currency module.

4.  **The SDK grows one resource.** `client.currency.getRates()` is added alongside
    the other dedicated resources, with a new `content:currency` cache tag
    (regenerated from the OpenAPI spec, per ADR 29).

5.  **The web fetches rates separately.** A `server-only` `getCurrencyRates()`
    (`revalidate: 1800`, tag `content:currency`) feeds the support options. The
    summary and the rates are fetched in parallel and degrade independently, so a
    rate-provider outage no longer affects the summary and vice versa.

6.  **The live-fetch toggle is renamed.** `DONATION_RATES_LIVE` becomes
    `CURRENCY_RATES_LIVE`; the default (live enabled) is unchanged.

## Consequences
- **Pros**: Rates and donation figures evolve, cache and fail independently; the
  currency offer becomes a first-class, donation-independent resource; consumers
  that never show money stop receiving a rate table.
- **Pros**: Mirrors ADR 34 §7 ("conversion helpers are a shared,
  donation-independent core") on the API side, so both ends separate currency from
  donations.
- **Pros**: Removing `rates` from the summary makes the payload describe one
  concern, and the offered-currency set is explicit at its own URL.
- **Cons**: The donation page now makes a second Content API call at render time
  (mitigated by the parallel fetch and ISR).
- **Cons**: A breaking contract change — `summary.rates` disappears, so the SDK
  must be regenerated and every consumer updated; it is a coordinated two-repo
  change, as ADR 29/30 already warn for contract changes.
