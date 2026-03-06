'use client';

import { toast } from '@maw/ui-lib';
import { randomArrayEntry, randomNumber } from '@maw/utils/random';
import { useMessages, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SubscriptionPackage } from '../../schemas';

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
  const t = useTranslations('subscription.purchaseProofToast');
  const messages = useMessages() as AppTranslationShape;
  const [iterator, setIterator] = useState(0);

  const pool = useMemo(() => {
    return {
      names: messages.subscription.purchaseProofToast.variants.names,
      locations: messages.subscription.purchaseProofToast.variants.locations,
      planNames: plans.map((p) => t(p.titleKey as any)),
    };
  }, [
    plans,
    t,
    messages.subscription.purchaseProofToast.variants.locations,
    messages.subscription.purchaseProofToast.variants.names,
  ]);

  const showRandomNotification = useCallback(() => {
    toast(
      t('justSubscribed', {
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
