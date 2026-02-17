'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  BillingCycle,
  SubscriptionFeature,
  SubscriptionPackage,
} from '../domain';
import { BillingCycleSelector } from './components/BillingCycleSelector';
import { Disclaimer } from './components/Disclaimer';
import { PlanCard } from './components/PlanCard';
import { PlanComparison } from './components/PlanComparison';
import { UrgencyCountdown } from './components/UrgencyCountdown';

interface PlansPageProps {
  plans: SubscriptionPackage[];
  features: SubscriptionFeature[];
}

const URGENCY_DISCOUNT = 0.2;

export function PlansPage({ plans, features }: PlansPageProps) {
  const t = useTranslations();
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanKey, setSelectedPlanKey] = useState<string>(
    plans.find((plan) => plan.isPopular)?.key ?? '',
  );

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PageHeadline className="mb-0">{t('plansPage.headline')}</PageHeadline>
      </div>

      <div className="mb-8 flex flex-col items-center gap-5 md:flex-row md:items-baseline md:justify-between">
        <div>
          <UrgencyCountdown
            discount={Math.round(URGENCY_DISCOUNT * 100)}
            onTick={(timeLeft) => setIsDiscountActive(timeLeft > 0)}
          />
        </div>
        <BillingCycleSelector
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-6 pb-6">
        {plans.map((plan) => {
          return (
            <PlanCard
              key={plan.key}
              plan={plan}
              billingCycle={billingCycle}
              extraDiscount={isDiscountActive ? URGENCY_DISCOUNT : undefined}
              isSelected={selectedPlanKey === plan.key}
              onSelect={() => setSelectedPlanKey(plan.key)}
            />
          );
        })}
      </div>

      <div className="mb-20 overflow-x-auto">
        <PlanComparison features={features} plans={plans} />
      </div>

      <Disclaimer />
    </>
  );
}
