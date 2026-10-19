# ADR 32: Donation Tiers, Goal, and Currency as a Display Concern

## Status
Accepted

Amends [ADR 30](0030-donation-data-served-by-the-content-api.md) (live balance) and
builds on [ADR 29](0029-content-resource-model-pools-and-dedicated-endpoints.md)
(dedicated Content API endpoints).

## Context
ADR 30 moved donation data to a dedicated Content API endpoint
(`GET /api/v1/donation/:lang`) and made the balance a static derivation of the monthly
history. Two consequences of that decision aged badly:

- The balance no longer moved, so the page could not honestly claim the project was
  "running out" of money over time. The original web-side accrual formula was the whole
  point of the gag, and it had been deleted along with the web-side config.
- The endpoint served only read-only "impact" data. The page remained an informational
  artifact, not a place that funnels a visitor towards a support action.

We want to grow the donation page into a more product-like surface:

1.  A hero with a value proposition, a primary CTA, a goal progress bar, a trust row and
    social proof.
2.  A compact tier selector plus a custom amount input.
3.  An on-brand satirical layer (fake urgency, a "€0 · most popular" tier, a tip
    upsell, a contextualized before/after slider) that keeps the joke without getting in
    the way.

At the same time we need to serve visitors in many currencies. The project targets
audiences far outside the Eurozone, but earnings and costs are booked in EUR and the
monthly history is in EUR. Splitting the store of record from the display unit raises a
design question: where does conversion happen, and what happens to the carefully tuned
tier amounts when they are no longer in whole euros?

## Decision

1.  **The balance is live again (amends ADR 30).** The Content API computes
    `totals.balance` at serve time with the project's original accrual algorithm:

    ```
    elapsedDays = (now - costStartEpoch) / 86400
    balance = floor(-elapsedDays * costDailyAvgInEuro) + totalDonationInEuro
    ```

    The base constants (`costStartEpoch = 1630469166`, `costDailyAvgInEuro = 24`,
    `totalDonationInEuro = 0`) are owned by the content repo, where the rest of the
    donation numbers already live. This reverses ADR 30's decision to derive the balance
    from the monthly rows. `totals.donations` and `totals.expenses` stay as the sums of
    the monthly rows, so the monthly chart is unchanged and `balance` is intentionally
    independent of `donations - expenses`.

2.  **The endpoint also serves tiers, a goal, and a supporter count.** Alongside the
    existing totals, monthly history, stats and supporters, the response gains:
    - `tiers`: base amounts in EUR, each with i18n `labelKey`/`blurbKey`.
    - `goal`: `{ amount, period, labelKey }`.
    - `supporterCount`.

    Following ADR 30, everything is a number or an i18n key; no localized copy crosses
    the boundary.

3.  **Currency is a display concern layered on the EUR base.** The API stays in base
    EUR and additionally returns a static `rates` table (approximate, relative to EUR).
    The frontend resolves the display currency from the request locale's region
    **server-side**, so SSR and hydration agree, then converts base amounts with one
    shared `formatCurrency` helper used everywhere:
    - Tier presets apply **charm rounding**: a `.99` ladder for 2-decimal currencies and
      an integer ladder (…1999/5999) for zero-decimal currencies (HUF, JPY).
    - Large figures (balance, monthly totals, goal) convert and format directly, without
      charm rounding.
    - Labels remain i18n keys resolved by the frontend, per ADR 30.

4.  **The page gains a product-page layer.** A new hero renders the value proposition,
    the primary "Support the project" CTA, a secondary "Share instead" action, the goal
    progress, a trust row and social proof. A compact tier selector plus custom amount
    sits next to it, feeding the existing support options. A light satirical layer
    (fake urgency, a "€0 · most popular" tier, a tip upsell, and the contextualized
    before/after slider) is composed on top, deliberately kept thin so the real funnel
    stays legible.

## Consequences
- **Pros**: The balance is honest again and grows with time, restoring the joke that
  motivated the original accrual formula while keeping the numbers in the content repo
  (single owner, no web redeploy to change them).
- **Pros**: The page becomes a funnel — a hero, a concrete goal, and tiers give a
  visitor an obvious next action instead of a wall of statistics.
- **Pros**: Serving a EUR base plus a static `rates` table keeps one store of record and
  one contract; adding a currency needs no content change, and locale-driven,
  server-side resolution avoids hydration mismatches and client conversion logic.
- **Pros**: Charm rounding keeps tier price points recognisable ("5.99", "1999") in
  every currency rather than producing arbitrary converted decimals.
- **Cons**: This reverses an ADR 30 consequence — the balance now depends on `now`, so
  its value is no longer a stable, cacheable constant and the monthly history no longer
  reconciles with `balance`; the divergence is intentional but will surprise readers of
  the older ADR.
- **Cons**: The static `rates` table is approximate and hand-maintained, so it drifts
  from real exchange rates and is unsuited to anything but a display estimate.
- **Cons**: Conversion happens in the frontend, so the API can no longer be read at face
  value as the amount a visitor will pay; correctness of the display rests on the shared
  `formatCurrency` helper being used consistently.
- **Cons**: The satirical layer adds surface area to maintain and risks obscuring the
  real support path if it is not kept light.
