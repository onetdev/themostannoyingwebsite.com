# Funding Feature

Manages the site's donation information and funneling user traffic towards various support mechanisms.

## Data (Content API)

Donation data is served by the Content API's dedicated endpoint
(`GET /api/v1/donation/:lang`) and fetched server-side, per
`adr/0030-donation-data-served-by-the-content-api.md` and
`adr/0032-donation-tiers-goal-and-currency-display.md`.

- **Live balance**: `totals.balance` is computed at serve time from the accrual formula
  (`floor(-elapsedDays * costDailyAvgInEuro) + totalDonationInEuro`), so it grows with
  time. `totals.donations`/`totals.expenses` remain the sums of the monthly rows; the
  monthly chart is unchanged and the balance is intentionally independent of
  `donations - expenses`.
- **Currency-tagged amounts**: every monetary value in the response is a
  `{ value, currency }` amount — totals, each monthly entry, currency-formatted stats,
  preset tiers and the goal. There is no response-level currency field. See
  `adr/0036-currency-tagged-donation-amounts.md`.
- **Tiers + goal**: the response also carries `tiers` (currency-tagged amounts with i18n
  label/blurb keys), a `goal` (`{ amount, period, labelKey }`) and `supporterCount`.
- **Currency display**: the API tags amounts with their base currency and serves exchange
  rates (units per 1 base unit) from its dedicated currency endpoint
  (`GET /api/v1/currency/rates`), refreshed daily from Frankfurter/ECB (fiat) and
  CoinGecko (crypto), with a static seed as the fallback — see
  `adr/0033-donation-exchange-rates.md` and `adr/0035-dedicated-currency-rates-endpoint.md`.
  The balance and the "Impact in numbers" figures render in the currency they were
  tagged with (EUR today); they no longer follow the visitor's locale. Only the
  donation options expose a currency picker (base plus the fiat currencies offered by
  the API) rendered as a compact segmented button group and defaulting to the base.
  - Preset tiers are charm-rounded in the selected currency — a `.99` ladder for
    2-decimal currencies and an integer ladder (…1999/5999) for zero-decimal
    currencies (JPY).
  - The custom amount is entered in the selected currency and converted back to the
    base currency, so PayPal receives exactly the displayed amount.
  - BTC/ETH estimates always derive from the base amount, so changing the display
    currency never moves the crypto estimate.
  - Labels stay i18n keys resolved by the frontend, and one shared `formatMoney`
    helper is used everywhere. The conversion/formatting helpers live in the
    donation-independent `@/core/currency` module (explicit base currency + rate
    table), so other features can reuse them for their own monetary figures.

## Key Highlights

- **DonationPage**: A product-style hero and balance block on the left, the tier selector at the top right, then the before/after comparison sample and the FAQ side by side, then the "impact in numbers" section (a single container whose first block groups the trend statistic cards, followed by the supporters podium and the support-vs-costs chart).
- **Hero**: The value proposition, the primary "Support the project" CTA (shown only when the support options sit below the hero), and a secondary "Share instead" action (native share sheet first).
- **Tier selector**: A compact preset tier list plus a custom amount input, with a
  segmented currency picker (EUR default) that reprices the presets and the
  amount-aware provider links.
- **BeforeAfterSlider**: Standalone draggable comparison component (`inset()` clip over two layers) placed below the FAQ; imagery is passed in so it can be swapped without touching the component.
- **BeggarBanner**: A prominent, non-dismissible alert at the top of the site that encourages users to donate. Its visibility is often linked to the first 10 days of each month to simulate "real-world" funding urgency.
- **DonationService**: An injectable service that provides calculated estimates for the project's financial status and determines if the `BeggarBanner` should be displayed.
- **Crypto Donations**: `SupportOptions` lists classic and crypto methods; the BTC/ETH buttons reveal a dynamically generated QR code, network and copy-to-clipboard address inside a `Popover` (see `docs/shadcn-adoption-log.md`, BEH-21).

## Service Details

- `isBannerActive()`: Returns a boolean indicating if the beggar banner should currently be shown.
- `getCostEstimation()`: Provides the estimated monthly hosting and maintenance costs of the platform.

## Out of Scope

- **Real-Time Payment Integration**: Clicking "Donate" might redirect to third-party sites but does not handle payments directly within the application.
- **Live Transaction Tracking**: All financial data shown is estimated or manually updated, not pulled from a live blockchain or payment processor API.
