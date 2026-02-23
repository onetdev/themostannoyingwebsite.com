import { injectable } from 'inversify';

import { getFeatures, getPlans } from '../use-cases';

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
