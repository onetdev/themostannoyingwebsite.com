import type { Result } from '@maw/utils/result';

import type {
  SubscriptionError,
  SubscriptionFeature,
  SubscriptionPackage,
} from './schemas';

export const DI = {
  SubscriptionPlansService: Symbol.for('SubscriptionPlansService'),
};

export interface SubscriptionPlansService {
  getFeatures(): Promise<Result<SubscriptionFeature[], SubscriptionError>>;
  getPlans(): Promise<Result<SubscriptionPackage[], SubscriptionError>>;
}
