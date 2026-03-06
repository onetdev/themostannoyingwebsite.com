# Subscription Feature

Provides a "fake facade" for a multi-tiered package comparison page, designed with "Dark UX" patterns to mimic the most frustrating aspects of modern subscription-based services.

## Key Highlights

- **PlansPage**: A classic 3-step package comparison page that lists three increasingly nonsensical tiers (Poorified, Sufficient, Delux).
- **SubscriptionPlansService**: An injectable service (via `inversify`) that manages access to package metadata, pricing, and feature lists.
- **PurchaseProofToast**: A prominent notification that displays fake "just subscribed" messages from random users (e.g., "John D. from a dark basement just subscribed to Delux!") to create social pressure.
- **Cycle Switching Logic**: Supports toggling between monthly, yearly, and bi-yearly billing cycles, with misleading discount labels.
- **Paywall Simulation**: Integrates with the `content` feature to "lock" parts of articles, prompting users to consider one of the fake subscription plans.

## Page Details

- `/plans`: The main comparison and subscription page.
- `PackageCard`: Renders individual tiers with their fake features and prices.
- `CycleSelector`: The toggle for monthly and yearly plans.

## Out of Scope

- **Real Payment Gateways**: Clicking "Subscribe" might trigger fake errors or frustrating redirects but will never handle actual transactions.
- **Backend Persistence**: No subscription states are saved on a server or within the user's account.
- **Real Feature Unlocks**: Subscribing does not actually unlock any site content or disable annoying features.
