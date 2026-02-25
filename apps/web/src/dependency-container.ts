import { Container } from 'inversify';

import { FakeAuthRepository } from '@/features/auth/repositories';
import { AuthService } from '@/features/auth/services';
import { CommentService } from '@/features/comments/services';
import { AppArticleService } from '@/features/content/services';
import { DonationService } from '@/features/donation/services';
import { SubscriptionPlansService } from '@/features/subscription/services';
import { StaticCountryRepository } from '@/repositories';
import { AppService } from '@/services';
import { DI } from '@/types';

const container = new Container();

container
  .bind(DI.CountryRepository)
  .to(StaticCountryRepository)
  .inSingletonScope();
container.bind(DI.KernelService).to(AppService).inSingletonScope();
container
  .bind(DI.SubscriptionPlansService)
  .to(SubscriptionPlansService)
  .inSingletonScope();
container.bind(DI.AuthRepository).to(FakeAuthRepository).inSingletonScope();
container.bind(DI.AuthService).to(AuthService).inSingletonScope();
container.bind(DI.DonationService).to(DonationService).inSingletonScope();
container.bind(DI.CommentService).to(CommentService).inSingletonScope();
container.bind(DI.AppArticleService).to(AppArticleService).inSingletonScope();

export function getDependencyContainer() {
  return container;
}
