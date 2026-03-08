import type { Result } from '@maw/utils/result';

import type subscriptionEnLocale from './i18n/en';
import type {
  SubscriptionError,
  SubscriptionFeature,
  SubscriptionPackage,
} from './schemas';

export const DI = {
  SubscriptionPlansService: Symbol.for('SubscriptionPlansService'),
};

export type SubscriptionI18nShape = typeof subscriptionEnLocale;

export interface SubscriptionPlansService {
  getFeatures(): Promise<Result<SubscriptionFeature[], SubscriptionError>>;
  getPlans(): Promise<Result<SubscriptionPackage[], SubscriptionError>>;
}

export interface PurchaseProofVariants {
  names: string[];
  locations: string[];
}

declare global {
  interface AppEvents {
    'subscription:package-selected': {
      packageId: string;
    };
  }
}
