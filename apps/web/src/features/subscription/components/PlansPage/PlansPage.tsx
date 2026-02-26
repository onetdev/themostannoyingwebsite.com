'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { useEventBridge } from '@/contexts/EventBridgeContext';
import type {
  BillingCycle,
  SubscriptionFeature,
  SubscriptionPackage,
} from '../../schemas';
import type { SubscriptionEvent } from '../../types';
import { BillingCycleSelector } from './BillingCycleSelector';
import { Disclaimer } from './Disclaimer';
import { PlanCard } from './PlanCard';
import { PlanComparison } from './PlanComparison';
import { SocialProof, type SocialProofProps } from './SocialProof';
import {
  UrgencyCountdown,
  type UrgencyCountdownProps,
} from './UrgencyCountdown';

interface PlansPageProps {
  plans: SubscriptionPackage[];
  features: SubscriptionFeature[];
  socialProofConfig: Pick<SocialProofProps, 'minDelayMs' | 'maxDelayMs'>;
  urgencyConfig?: Pick<
    UrgencyCountdownProps,
    'discountPercentage' | 'timeoutSeconds'
  >;
}

export function PlansPage({
  plans,
  features,
  urgencyConfig,
  socialProofConfig,
}: PlansPageProps) {
  const t = useTranslations();
  const { dispatch } = useEventBridge();
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlanKey, setSelectedPlanKey] = useState<string>(
    plans.find((plan) => plan.isPopular)?.key ?? '',
  );

  const onUrgencyTick = useCallback(
    (timeLeft: number) => setIsDiscountActive(timeLeft > 0),
    [],
  );

  const handleSelectPlan = useCallback(
    (key: string) => {
      setSelectedPlanKey(key);
      dispatch<SubscriptionEvent['payload']>('SUBSCRIPTION_PACKAGE_SELECTED', {
        packageId: key,
      });
    },
    [dispatch],
  );

  return (
    <>
      <SocialProof plans={plans} {...socialProofConfig} />
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <PageHeadline className="mb-0">{t('plansPage.headline')}</PageHeadline>
      </div>

      <div className="mb-8 flex flex-col items-center gap-5 md:flex-row md:items-baseline md:justify-between">
        <div>
          {urgencyConfig && (
            <UrgencyCountdown onTick={onUrgencyTick} {...urgencyConfig} />
          )}
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
              extraDiscountPercentage={
                isDiscountActive
                  ? (urgencyConfig?.discountPercentage ?? 0)
                  : undefined
              }
              isSelected={selectedPlanKey === plan.key}
              onSelect={() => handleSelectPlan(plan.key)}
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
