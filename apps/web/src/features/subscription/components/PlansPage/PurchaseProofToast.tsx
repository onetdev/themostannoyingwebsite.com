'use client';

import { toast } from '@maw/ui-lib';
import { randomArrayEntry, randomNumber } from '@maw/utils/random';
import { useMessages, useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLogger } from '@/core/react';
import type { SubscriptionPackage } from '../../schemas';

export interface PurchaseProofToastProps {
  plans: SubscriptionPackage[];
  minDelayMs: number;
  maxDelayMs: number;
  /** Social proof name pool, sourced from the Content API when available. */
  names?: string[];
  /** Social proof location pool, sourced from the Content API when available. */
  locations?: string[];
}

export function PurchaseProofToast({
  plans,
  minDelayMs,
  maxDelayMs,
  names,
  locations,
}: PurchaseProofToastProps) {
  const logger = useLogger('PurchaseProofToast');
  const t = useTranslations();
  const messages = useMessages() as AppTranslationShape;
  const [iterator, setIterator] = useState(0);

  const pool = useMemo(() => {
    return {
      names: names ?? messages.subscription.purchaseProofToast.variants.names,
      locations:
        locations ??
        messages.subscription.purchaseProofToast.variants.locations,
      planNames: plans.map((p) => t(p.titleKey)),
    };
  }, [
    plans,
    t,
    names,
    locations,
    messages.subscription.purchaseProofToast.variants.locations,
    messages.subscription.purchaseProofToast.variants.names,
  ]);

  const showRandomNotification = useCallback(() => {
    const data = {
      name: randomArrayEntry(pool.names) ?? '',
      location: randomArrayEntry(pool.locations) ?? '',
      plan: randomArrayEntry(pool.planNames) ?? '',
    };

    if (!data.name || !data.location || !data.plan) {
      logger.warn('Critical random toast data is missing');
      return;
    }

    toast(t('subscription.purchaseProofToast.justSubscribed', data), {
      icon: '🚀',
    });

    setIterator((i) => i + 1);
  }, [pool, t, logger.warn]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: We need the iterator for the scheduler and cleanup.
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
