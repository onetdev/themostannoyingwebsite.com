'use client';

import { toast } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { SubscriptionPackage } from '../../domain';

export interface SocialProofProps {
  plans: SubscriptionPackage[];
  initialDelayMs: number;
  minDelayMs: number;
  maxDelayMs: number;
}

export function SocialProof({
  plans,
  initialDelayMs,
  minDelayMs,
  maxDelayMs,
}: SocialProofProps) {
  const t = useTranslations();

  useEffect(() => {
    const names = t.raw('plansPage.socialProof.names') as string[];
    const locations = (t.raw('plansPage.socialProof.locations') ??
      []) as string[];
    const planNames = plans.map((p) => t(p.titleKey));

    const showRandomNotification = () => {
      const name = names[Math.floor(random(0, names.length))];
      const location = locations[Math.floor(random(0, locations.length))];
      const plan = planNames[Math.floor(random(0, planNames.length))];

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
    };

    // First one after initial delay
    const initialTimeout = setTimeout(showRandomNotification, initialDelayMs);

    // Then every min-max delay
    const interval = setInterval(
      () => {
        showRandomNotification();
      },
      random(minDelayMs, maxDelayMs),
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [initialDelayMs, maxDelayMs, minDelayMs, plans, t]);

  return null;
}
