import { Container } from 'inversify';

import { SubscriptionPlansService } from './application';
import { DI } from './types';

export const init = (di: Container) => {
  di.bind(DI.SubscriptionPlansService)
    .to(SubscriptionPlansService)
    .inSingletonScope();
};
