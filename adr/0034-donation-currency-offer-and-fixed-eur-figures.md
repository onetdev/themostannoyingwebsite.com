# ADR 34: Donation Currency Offer and EUR-Fixed Figures

## Status
Accepted

Amends [ADR 32](0032-donation-tiers-goal-and-currency-display.md) (locale-driven
display currency) and [ADR 33](0033-donation-exchange-rates.md) (offered rate list).

## Context
ADR 32 made the display currency a frontend display concern resolved from the
visitor's locale region, and applied it to every donation figure: the live balance,
the impact statistics and chart, the preset tiers and the amount-aware provider
links. In practice an `en-US` visitor saw the "current balance" and the "impact in
numbers" figures in USD, even though the project's books are kept in EUR and the
monthly history is EUR.

Two problems followed:

- The balance and the impact figures are satirical, but they read as a financial
  statement. Converting them implies the project holds those amounts in the
  visitor's currency, which is misleading.
- Locale-driven conversion gave the visitor no agency over the amount they would
  actually pay, and it happened silently for the support options too.

At the same time the API served ten fiat rates plus two crypto rates, and the
crypto rates were mixed into the same list as the display currencies, so "which
currencies are offered" was implicit.

## Decision

1.  **The balance and the impact figures are always EUR.** The counter and the
    impact section render the summary's base currency directly and no longer
    convert. The locale only affects number formatting (symbol placement,
    grouping, decimal separator), not the currency.

2.  **Currency selection belongs to the support options.** The tier selector gains
    a compact segmented button group offering the base currency plus the fiat
    currencies served by the API, defaulting to EUR. The selection drives the
    preset prices, the custom amount and the amount-aware provider link (PayPal).

3.  **The API owns the offered currency set.** `DONATION_RATES` lists only the
    offered fiat currencies (`USD`, `GBP`, `JPY`) plus `BTC`/`ETH`; EUR stays
    implicit as the base. The set is chosen for global reach: USD and EUR dominate
    international payment value, with GBP and JPY next (CNY is excluded as
    impractical for a PayPal-based funnel). The frontend derives the picker by
    taking the base first and excluding the crypto codes, so adding or removing an
    offered currency is a content-API change with no web redeploy.

4.  **The custom amount is denominated in the selected currency.** It is converted
    back to the EUR base for provider links and crypto estimates, and the value is
    preserved when the visitor switches currency. Presets keep their charm rounding
    (a `.99` ladder for 2-decimal currencies, an integer ladder for zero-decimal
    ones); the custom amount is used exactly as typed.

5.  **Crypto estimates stay EUR-based.** `BTC`/`ETH` amounts always derive from the
    EUR base amount, so changing the display currency never moves the crypto
    estimate — only the amount does.

6.  **The selection is session state.** It is not persisted, so server and client
    render the same EUR default and hydration stays deterministic. The
    locale-to-region currency resolution and its region map are removed.

7.  **Conversion helpers are a shared, donation-independent core module.**
    `src/core/currency` owns locale-aware conversion, charm rounding and
    formatting behind an explicit base currency + rate table, with no knowledge of
    donations. The funding feature keeps only its donation-specific constants
    (base currency, crypto codes, fallback seed), so other surfaces can reuse the
    same helpers for their own monetary figures.

## Consequences
- **Pros**: The balance and impact figures are honest about the currency the
  project actually operates in, while the visitor still gets a familiar price in
  the currency they will pay with.
- **Pros**: Currency is now an explicit, visible choice instead of a silent
  locale-driven conversion, and the offered set lives in one place (the API).
- **Pros**: Removing the server-side locale resolution simplifies the page: the
  balance and impact components lost their conversion props and logic.
- **Pros**: The crypto estimate stays anchored to the EUR base, matching the store
  of record, and charm rounding still produces recognisable price points.
- **Pros**: Currency conversion and formatting now live in `src/core/currency`,
  independent of the donation feature, so future money surfaces share one
  implementation instead of duplicating `Intl` logic.
- **Cons**: This reverses an ADR 32 consequence — a visitor outside the Eurozone no
  longer gets a locale-matched currency automatically for the support options; they
  must pick one (EUR is the default).
- **Cons**: The API's `rates` list is now both a conversion table and the de-facto
  offer list, so the frontend has to exclude the crypto codes explicitly.
- **Cons**: Rolling out the trimmed rate list requires the API to deploy before the
  web app, otherwise the picker briefly offers the previous, longer list.
