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
- **Tiers + goal**: the response also carries `tiers` (base EUR amounts with i18n
  label/blurb keys), a `goal` (`{ amount, period, labelKey }`) and `supporterCount`.
- **Currency display**: the API stays in base EUR and returns a `rates` table (units
  per 1 EUR) refreshed daily from Frankfurter/ECB (fiat) and CoinGecko (crypto), with
  a static seed as the fallback — see `adr/0033-donation-exchange-rates.md`. The
  frontend resolves the display currency from the locale
  region server-side (so SSR and hydration agree), converts base amounts, and applies
  **charm rounding** to tier presets — a `.99` ladder for 2-decimal currencies and an
  integer ladder (…1999/5999) for zero-decimal currencies (HUF, JPY). Big figures
  convert without charm rounding. Labels stay i18n keys resolved by the frontend, and
  one shared `formatMoney` helper is used everywhere.

## Key Highlights

- **DonationPage**: A product-style hero and balance block on the left, the tier selector at the top right, then the before/after comparison sample and the FAQ side by side, then the "impact in numbers" chart, supporters podium and the coffees-consumed stat.
- **Hero**: The value proposition, the primary "Support the project" CTA (shown only when the support options sit below the hero), a secondary "Share instead" action (native share sheet first), a trust row and social proof.
- **Tier selector**: A compact preset tier list plus a custom amount input, feeding the existing support options.
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
