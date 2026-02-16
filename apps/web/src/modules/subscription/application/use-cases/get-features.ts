import { SubscriptionFeature } from '../../domain';
import { SubscriptionError } from '../../domain/errors';

import { Result } from '@/kernel';

export async function getFeatures(): Promise<
  Result<SubscriptionFeature[], SubscriptionError>
> {
  return {
    success: true,
    data: [
      {
        id: 'selfAwareness',
        titleKey: 'plansPage.features.selfAwareness',
        icon: '🧠',
      },
      {
        id: 'existentialDread',
        titleKey: 'plansPage.features.existentialDread',
        icon: '😱',
      },
      {
        id: 'hardwareJudge',
        titleKey: 'plansPage.features.hardwareJudge',
        icon: '🖥️',
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
        id: 'superiorTone',
        titleKey: 'plansPage.features.superiorTone',
        icon: '👑',
      },
      {
        id: 'cpuToaster',
        titleKey: 'plansPage.features.cpuToaster',
        icon: '🔥',
      },
      {
        id: 'eternalLoading',
        titleKey: 'plansPage.features.eternalLoading',
        icon: '⏳',
      },
      {
        id: 'ramHog',
        titleKey: 'plansPage.features.ramHog',
        icon: '🐷',
      },
      {
        id: 'exEmails',
        titleKey: 'plansPage.features.exEmails',
        icon: '📧',
      },
      {
        id: 'randomGhosting',
        titleKey: 'plansPage.features.randomGhosting',
        icon: '💨',
      },
      {
        id: 'crypticFiles',
        titleKey: 'plansPage.features.crypticFiles',
        icon: '📄',
      },
    ],
  };
}
