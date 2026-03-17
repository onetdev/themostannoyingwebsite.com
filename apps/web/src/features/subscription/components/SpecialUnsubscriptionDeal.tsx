'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useNavigationProvider } from '@/core/react';
import type { SubscriptionPackage } from '../schemas';
import { PlanCard } from './PlansPage/PlanCard';

export function SpecialUnsubscriptionDeal() {
  const t = useTranslations('subscription.specialDeal');
  const { push } = useNavigationProvider();

  const handleReject = () => {
    push('plans.cancellation');
  };

  const specialPlan: SubscriptionPackage = {
    key: 'special-deal',
    icon: '🎁',
    titleKey: 'subscription.specialDeal.headline',
    descriptionKey: 'subscription.specialDeal.description',
    monthlyPriceByCycle: {
      monthly: 0,
      yearly: 0,
      biyearly: 0,
    },
    featureIds: [],
    isPopular: true,
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 p-4">
      <h2 className="text-2xl text-center font-black uppercase tracking-tighter text-destructive animate-bounce max-w-2xl">
        {t('offer')}
      </h2>

      <PlanCard plan={specialPlan} billingCycle="monthly" isOutOfStock={true} />

      <Button
        variant="ghost"
        className="w-full max-w-sm text-muted-foreground hover:text-destructive"
        onClick={handleReject}
      >
        {t('backToCancellation')}
      </Button>
    </div>
  );
}
