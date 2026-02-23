import { Result } from '@maw/utils/result';

import { SubscriptionFeature } from '../../domain';
import { SubscriptionError } from '../../domain/errors';

export async function getFeatures(): Promise<
  Result<SubscriptionFeature[], SubscriptionError>
> {
  return {
    success: true,
    data: [
      {
        id: 'lowTierLimits',
        titleKey: 'plansPage.features.lowTierLimits',
        icon: '📉',
      },
      {
        id: 'superSlowSpeed',
        titleKey: 'plansPage.features.superSlowSpeed',
        icon: '🐢',
      },
      {
        id: 'adSupported',
        titleKey: 'plansPage.features.adSupported',
        icon: '📺',
      },
      {
        id: 'ramPriceSpike',
        titleKey: 'plansPage.features.ramPriceSpike',
        icon: '📈',
      },
      {
        id: 'gpuPriceSpike',
        titleKey: 'plansPage.features.gpuPriceSpike',
        icon: '🎮',
      },
      {
        id: 'creativeMath',
        titleKey: 'plansPage.features.creativeMath',
        icon: '🧮',
      },
      {
        id: 'fakeFacts',
        titleKey: 'plansPage.features.fakeFacts',
        icon: '🤥',
      },
      {
        id: 'imaginarySources',
        titleKey: 'plansPage.features.imaginarySources',
        icon: '📚',
      },
      {
        id: 'heavySighs',
        titleKey: 'plansPage.features.heavySighs',
        icon: '😮‍💨',
      },
      {
        id: 'judgmentalEllipses',
        titleKey: 'plansPage.features.judgmentalEllipses',
        icon: '💬',
      },
      {
        id: 'submissive',
        titleKey: 'plansPage.features.submissive',
        icon: '🥺',
      },
      {
        id: 'exEmails',
        titleKey: 'plansPage.features.exEmails',
        icon: '📧',
      },
    ],
  };
}
