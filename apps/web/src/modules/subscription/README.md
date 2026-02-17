# Subscription Module

Module for managing subscription plans, pricing, and feature comparison with typical "annoying" conversion patterns.

## Features

- **Social Proof** - Live notifications of "recent" subscriptions to create peer pressure.
- **Urgency Countdown** - Fake discount timer that resets to pressure users into making a quick decision.
- **Billing Cycle Selection** - Toggle between monthly and yearly billing with misleading savings highlights.
- **Plan Comparison** - A detailed grid comparing features across different subscription tiers.
- **Dynamic Pricing** - Support for discounts and various billing cycles.
- **Fine Print Disclaimer** - Obfuscated terms and conditions at the bottom of the plans.

## Components

- **`PlansPage`** - The main entry point component that orchestrates the subscription UI.
- **`PlanCard`** - Individual plan cards with pricing and "Most Popular" badges.
- **`PlanComparison`** - Feature comparison table.
- **`UrgencyCountdown`** - Timer component that manages the "limited time" discount state.
- **`SocialProof`** - Animated notifications of other people supposedly subscribing.
- **`BillingCycleSelector`** - Switcher for monthly vs yearly billing.

## Usage

```typescript
// The main PlansPage is typically used in a page component
import { PlansPage, createSubscriptionPlansService } from '@/modules/subscription';

export default async function Page() {
  const service = createSubscriptionPlansService();
  const [plans, features] = await Promise.all([
    service.getPlans(),
    service.getFeatures()
  ]);

  return <PlansPage plans={plans} features={features} />;
}
```

## Domain Entities

- **`SubscriptionPackage`** - Represents a pricing plan (e.g., Free, Pro, Ultimate).
- **`SubscriptionFeature`** - Represents a specific feature and its availability across plans.

## Application Logic

The `SubscriptionPlansService` provides methods to fetch plans and features. It uses use-cases under the hood to handle data retrieval and mapping.

### Dependency Injection

The service is registered in the Inversify container as a singleton. You can use the `DI` constant to inject or retrieve it:

```typescript
import { DI } from '@/modules/subscription/types';
import { SubscriptionPlansService } from '@/modules/subscription';

// In a constructor or using the container
const service = container.get<SubscriptionPlansService>(DI.SubscriptionPlansService);
```
