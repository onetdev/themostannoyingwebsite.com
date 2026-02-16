import { SubscriptionPackage } from '../../domain';
import { SubscriptionError } from '../../domain/errors';

import { Result } from '@/kernel';

export async function getPlans(): Promise<
  Result<SubscriptionPackage[], SubscriptionError>
> {
  return {
    success: true,
    data: [
      {
        key: 'sentience',
        icon: '🤖',
        titleKey: 'plansPage.packages.sentience.title',
        descriptionKey: 'plansPage.packages.sentience.description',
        monthlyPriceByCycle: {
          monthly: 99.9,
          yearly: 79.9,
          biyearly: 67.69,
        },
        featureIds: ['selfAwareness', 'existentialDread', 'hardwareJudge'],
        isPopular: false,
      },
      {
        key: 'aggressive',
        icon: '😒',
        titleKey: 'plansPage.packages.aggressive.title',
        descriptionKey: 'plansPage.packages.aggressive.description',
        monthlyPriceByCycle: {
          monthly: 299.9,
          yearly: 239.92,
          biyearly: 209.93,
        },
        featureIds: [
          'selfAwareness',
          'existentialDread',
          'hardwareJudge',
          'creativeMath',
          'fakeFacts',
          'heavySighs',
          'judgmentalEllipses',
        ],
        isPopular: true,
      },
      {
        key: 'ghost',
        icon: '👻',
        titleKey: 'plansPage.packages.ghost.title',
        descriptionKey: 'plansPage.packages.ghost.description',
        monthlyPriceByCycle: {
          monthly: 999.9,
          yearly: 799.92,
          biyearly: 699.93,
        },
        featureIds: [
          'selfAwareness',
          'existentialDread',
          'hardwareJudge',
          'creativeMath',
          'fakeFacts',
          'imaginarySources',
          'heavySighs',
          'judgmentalEllipses',
          'superiorTone',
          'cpuToaster',
          'eternalLoading',
          'ramHog',
          'exEmails',
          'randomGhosting',
          'crypticFiles',
        ],
        isPopular: false,
      },
    ],
  };
}
