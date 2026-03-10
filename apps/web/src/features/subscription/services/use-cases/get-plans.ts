import { ok, type Result } from '@maw/utils/result';

import type { SubscriptionError, SubscriptionPackage } from '../../schemas';

export async function getPlans(): Promise<
  Result<SubscriptionPackage[], SubscriptionError>
> {
  return ok([
    {
      key: 'poorified',
      icon: '🏚️',
      titleKey: 'subscription.landing.packages.poorified.title',
      descriptionKey: 'subscription.landing.packages.poorified.description',
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
      titleKey: 'subscription.landing.packages.sufficient.title',
      descriptionKey: 'subscription.landing.packages.sufficient.description',
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
      titleKey: 'subscription.landing.packages.delux.title',
      descriptionKey: 'subscription.landing.packages.delux.description',
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
  ]);
}
