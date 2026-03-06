import type { Result } from '@maw/utils/result';

import type { SubscriptionError, SubscriptionFeature } from '../../schemas';

export async function getFeatures(): Promise<
  Result<SubscriptionFeature[], SubscriptionError>
> {
  return {
    success: true,
    data: [
      {
        id: 'lowTierLimits',
        titleKey: 'subscription.landing.features.lowTierLimits',
        icon: '📉',
      },
      {
        id: 'superSlowSpeed',
        titleKey: 'subscription.landing.features.superSlowSpeed',
        icon: '🐢',
      },
      {
        id: 'adSupported',
        titleKey: 'subscription.landing.features.adSupported',
        icon: '📺',
      },
      {
        id: 'ramPriceSpike',
        titleKey: 'subscription.landing.features.ramPriceSpike',
        icon: '📈',
      },
      {
        id: 'gpuPriceSpike',
        titleKey: 'subscription.landing.features.gpuPriceSpike',
        icon: '🎮',
      },
      {
        id: 'creativeMath',
        titleKey: 'subscription.landing.features.creativeMath',
        icon: '🧮',
      },
      {
        id: 'fakeFacts',
        titleKey: 'subscription.landing.features.fakeFacts',
        icon: '🤥',
      },
      {
        id: 'imaginarySources',
        titleKey: 'subscription.landing.features.imaginarySources',
        icon: '📚',
      },
      {
        id: 'heavySighs',
        titleKey: 'subscription.landing.features.heavySighs',
        icon: '😮‍💨',
      },
      {
        id: 'judgmentalEllipses',
        titleKey: 'subscription.landing.features.judgmentalEllipses',
        icon: '💬',
      },
      {
        id: 'submissive',
        titleKey: 'subscription.landing.features.submissive',
        icon: '🥺',
      },
      {
        id: 'exEmails',
        titleKey: 'subscription.landing.features.exEmails',
        icon: '📧',
      },
    ],
  };
}
