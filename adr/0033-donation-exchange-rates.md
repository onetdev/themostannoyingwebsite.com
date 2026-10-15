# ADR 33: Live Donation Exchange Rates from Frankfurter and CoinGecko

## Status
Accepted

Extends [ADR 32](0032-donation-tiers-goal-and-currency-display.md).

## Context
ADR 32 introduced a static `rates` table in the content repo (approximate,
hand-maintained values) purely as a frontend display concern: fiat amounts are
converted for the visitor's locale and tier presets are charm-rounded. It also
added `BTC`/`ETH` rates so the crypto payment URIs (BIP-21 / EIP-681) can encode
the selected amount.

Hand-maintained rates drift, and crypto drifts fastest — a stale `BTC` rate puts a
wrong amount into a scanned payment QR code. The donation figures are fictional,
but the *conversion* should still track reality closely enough to be useful.

## Decision

1.  **Rates are fetched by the Content API.** Fiat comes from **Frankfurter**
    (`https://api.frankfurter.dev/v1/latest?base=EUR`), which serves the ECB
    reference rates already quoted per 1 EUR — matching our `rate` semantics and
    the EUR base currency. Crypto comes from **CoinGecko**
    (`/simple/price?ids=bitcoin,ethereum&vs_currencies=eur`), inverted to
    units-per-EUR (`rate = 1 / eurPrice`). Both are queried with a short timeout
    via the global `fetch`.

2.  **The response shape is unchanged.** The rendered payload still returns
    `rates: [{ code, rate }]`, so the frontend needs no change. Rates are merged
    over the static seed (`DONATION_RATES`), which supplies the authoritative code
    list and order; a code missing from a provider keeps its seed value, so every
    expected currency is always present.

3.  **Caching is in-process with a 24-hour TTL.** The runtime database connection
    is read-only, so the cache is intentionally in-memory: a cold start fetches
    once and then serves from memory for the rest of the day. Concurrent refreshes
    collapse into a single request. Daily cadence lines up with the page's ISR
    (`revalidate = 1800`).

4.  **Failures never break the endpoint.** If either provider errors or times out,
    the previous cache is served if available, otherwise the static seed. The
    endpoint cannot fail because of an upstream exchange-rate problem.

5.  **Live fetching is toggleable.** `DONATION_RATES_LIVE=false` disables network
    access entirely (used by the test suite), returning the cache or seed.

6.  **No API keys.** Frankfurter/ECB requires none, and CoinGecko's keyless public
    pool — heavily rate-limited per minute, but ample at two calls per day — avoids
    introducing a secret to the content-repo environment.

## Consequences
- **Pros**: Rates (including crypto) stay close to reality, so display conversion
  and crypto payment amounts are trustworthy; no secrets to manage; the frontend
  and its fallback table are unchanged.
- **Pros**: A provider outage degrades to the last-known or seed rates instead of
  failing the donation endpoint.
- **Cons**: The content API gains a runtime network dependency (first request
  after a cold start / cache expiry is slower) and a 24-hour staleness window.
- **Cons**: The in-memory cache is per instance, so multi-instance or
  serverless deployments may each fetch once per day.
- **Cons**: Exchange-rate values are now third-party data; their terms
  (Frankfurter/ECB, CoinGecko free tier) must remain acceptable for this usage.
