'use client';

import { toast } from '@maw/ui-lib';
import { random } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { SubscriptionPackage } from '../../domain';

interface SocialProofProps {
  plans: SubscriptionPackage[];
}

export function SocialProof({ plans }: SocialProofProps) {
  const t = useTranslations();

  useEffect(() => {
    const names = t.raw('plansPage.socialProof.names') as string[];
    const locations = t.raw('plansPage.socialProof.locations') as string[];
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

    // First one after 3 seconds
    const initialTimeout = setTimeout(showRandomNotification, 3000);

    // Then every 10-20 seconds
    const interval = setInterval(
      () => {
        showRandomNotification();
      },
      random(10000, 20000),
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [plans, t]);

  return null;
}
