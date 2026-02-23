import { injectable } from 'inversify';

import { getFeatures } from './use-cases/get-features';
import { getPlans } from './use-cases/get-plans';

@injectable()
export class SubscriptionPlansService {
  getFeatures() {
    return getFeatures();
  }

  getPlans() {
    return getPlans();
  }
}

export const createSubscriptionPlansService = () =>
  new SubscriptionPlansService();
