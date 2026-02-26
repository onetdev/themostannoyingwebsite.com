import type { Result } from '@maw/utils/result';

import type { SubscriptionError, SubscriptionPackage } from '../../schemas';

export async function getPlans(): Promise<
  Result<SubscriptionPackage[], SubscriptionError>
> {
  return {
    success: true,
    data: [
      {
        key: 'poorified',
        icon: '🏚️',
        titleKey: 'plansPage.packages.poorified.title',
        descriptionKey: 'plansPage.packages.poorified.description',
        monthlyPriceByCycle: {
          monthly: 99,
          yearly: 89,
          biyearly: 67,
        },
        featureIds: [
          'adSupported',
          'gpuPriceSpike',
          'lowTierLimits',
          'ramPriceSpike',
          'superSlowSpeed',
        ],
        isPopular: false,
      },
      {
        key: 'sufficient',
        icon: '🥪',
        titleKey: 'plansPage.packages.sufficient.title',
        descriptionKey: 'plansPage.packages.sufficient.description',
        monthlyPriceByCycle: {
          monthly: 299,
          yearly: 249,
          biyearly: 189,
        },
        featureIds: [
          'adSupported',
          'creativeMath',
          'fakeFacts',
          'gpuPriceSpike',
          'heavySighs',
          'judgmentalEllipses',
          'ramPriceSpike',
        ],
        isPopular: true,
      },
      {
        key: 'delux',
        icon: '💎',
        titleKey: 'plansPage.packages.delux.title',
        descriptionKey: 'plansPage.packages.delux.description',
        monthlyPriceByCycle: {
          monthly: 999,
          yearly: 749,
          biyearly: 599,
        },
        featureIds: [
          'creativeMath',
          'exEmails',
          'fakeFacts',
          'gpuPriceSpike',
          'heavySighs',
          'imaginarySources',
          'judgmentalEllipses',
          'ramPriceSpike',
          'submissive',
        ],
        isPopular: false,
      },
    ],
  };
}
