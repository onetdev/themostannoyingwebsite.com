'use client';

import { toast } from '@maw/ui-lib';
import { random, randomInt } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { SubscriptionPackage } from '../../domain';

export interface SocialProofProps {
  plans: SubscriptionPackage[];
  minDelayMs: number;
  maxDelayMs: number;
}

export function SocialProof({
  plans,
  minDelayMs,
  maxDelayMs,
}: SocialProofProps) {
  const t = useTranslations();
  const [iterator, setIterator] = useState(0);

  const pool = useMemo(() => {
    return {
      names: t.raw('plansPage.socialProof.names') as string[],
      locations: (t.raw('plansPage.socialProof.locations') ?? []) as string[],
      planNames: plans.map((p) => t(p.titleKey)),
    };
  }, [plans, t]);

  const showRandomNotification = useCallback(() => {
    const name = pool.names[randomInt(0, pool.names.length)];
    const location = pool.locations[randomInt(0, pool.locations.length)];
    const plan = pool.planNames[randomInt(0, pool.planNames.length)];

    toast(
      t('plansPage.socialProof.justSubscribed', {
        name,
        location,
        plan,
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
      random(minDelayMs, maxDelayMs),
    );

    return () => {
      clearTimeout(timer);
    };
  }, [maxDelayMs, minDelayMs, showRandomNotification, iterator]);

  return null;
}
