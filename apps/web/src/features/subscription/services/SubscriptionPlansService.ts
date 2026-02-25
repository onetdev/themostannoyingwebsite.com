import { Container, injectable } from 'inversify';

import {
  DI,
  type SubscriptionPlansService as ISubscriptionPlansService,
} from '../types';
import { getFeatures } from './use-cases/get-features';
import { getPlans } from './use-cases/get-plans';

@injectable()
export class SubscriptionPlansService implements ISubscriptionPlansService {
  getFeatures() {
    return getFeatures();
  }

  getPlans() {
    return getPlans();
  }
}

export function getSubscriptionPlansService(container: Container) {
  return container.get<ISubscriptionPlansService>(DI.SubscriptionPlansService);
}
