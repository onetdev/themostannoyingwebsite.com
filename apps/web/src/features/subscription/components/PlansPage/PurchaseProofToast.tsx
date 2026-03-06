'use client';

import { toast } from '@maw/ui-lib';
import { randomArrayEntry, randomNumber } from '@maw/utils/random';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SubscriptionPackage } from '../../schemas';
import type { PurchaseProofVariants as PurchaseProofToastVariants } from '../../types';

export interface PurchaseProofToastProps {
  plans: SubscriptionPackage[];
  minDelayMs: number;
  maxDelayMs: number;
}

export function PurchaseProofToast({
  plans,
  minDelayMs,
  maxDelayMs,
}: PurchaseProofToastProps) {
  const t = useTranslations();
  const [iterator, setIterator] = useState(0);

  const pool = useMemo(() => {
    const variants: PurchaseProofToastVariants = {
      names: t.raw('subscription.purchaseProofToast.variants.names'),
      locations:
        t.raw('subscription.purchaseProofToast.variants.locations') ?? [],
    };

    return {
      ...variants,
      planNames: plans.map((p) => t(p.titleKey as AppTranslationKey)),
    };
  }, [plans, t]);

  const showRandomNotification = useCallback(() => {
    toast(
      t('subscription.purchaseProofToast.justSubscribed', {
        name: randomArrayEntry(pool.names),
        location: randomArrayEntry(pool.locations),
        plan: randomArrayEntry(pool.planNames),
      }),
      {
        icon: '🚀',
      },
    );
    setIterator((i) => i + 1);
  }, [pool, t]);

  useEffect(() => {
    const timer = setTimeout(
      showRandomNotification,
      randomNumber(minDelayMs, maxDelayMs),
    );

    return () => {
      clearTimeout(timer);
    };
  }, [maxDelayMs, minDelayMs, showRandomNotification, iterator]);

  return null;
}
