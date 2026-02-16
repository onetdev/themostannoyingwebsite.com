'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Icon,
  PageHeadline,
} from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  BillingCycle,
  SubscriptionFeature,
  SubscriptionPackage,
} from '../domain';
import { BillingCycleSelector } from './components/BillingCycleSelector';
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
  const [selectedPlanKey, setSelectedPlanKey] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-screen-xl px-5">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PageHeadline className="mb-0">{t('plansPage.headline')}</PageHeadline>
        <UrgencyCountdown
          onTick={(timeLeft) => setIsDiscountActive(timeLeft > 0)}
        />
      </div>

      <Alert variant="default" className="border-border mb-8">
        <Icon icon="failed" />
        <AlertTitle>{t('plansPage.disclaimer.title')}</AlertTitle>
        <AlertDescription>
          {t('plansPage.disclaimer.description')}
        </AlertDescription>
      </Alert>

      <div className="mb-8 flex justify-center">
        <BillingCycleSelector
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />
      </div>

      <div className="mb-12 flex flex-nowrap justify-center gap-6 overflow-x-auto pb-6">
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
    </div>
  );
}
