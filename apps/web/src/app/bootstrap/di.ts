import type { Container } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import { AchievementBankService } from '@/features/achievements/services';
import { DI as DIAchievements } from '@/features/achievements/types';
import { FakeAuthRepository } from '@/features/auth/repositories';
import { AuthService } from '@/features/auth/services';
import { DI as DIAuth } from '@/features/auth/types';
import { CommentService } from '@/features/comments/services';
import { DI as DIComments } from '@/features/comments/types';
import { ArticleService } from '@/features/content/services';
import { DI as DIContent } from '@/features/content/types';
import { DonationService } from '@/features/funding/services';
import { DI as DIDonation } from '@/features/funding/types';
import { SubscriptionPlansService } from '@/features/subscription/services';
import { DI as DISubscription } from '@/features/subscription/types';
import { StaticCountryRepository } from '@/repositories';
import { AppService } from '@/services';

export const Symbols = {
  ...CoreSymbols,
  ...DIAchievements,
  ...DIAuth,
  ...DIComments,
  ...DIContent,
  ...DIDonation,
  ...DISubscription,
};

export function configureContainer(container: Container) {
  // Bing dependencies
  container
    .bind(Symbols.CountryRepository)
    .to(StaticCountryRepository)
    .inSingletonScope();
  container.bind(Symbols.KernelService).to(AppService).inSingletonScope();
  container
    .bind(Symbols.SubscriptionPlansService)
    .to(SubscriptionPlansService)
    .inSingletonScope();
  container
    .bind(Symbols.AuthRepository)
    .to(FakeAuthRepository)
    .inSingletonScope();
  container.bind(Symbols.AuthService).to(AuthService).inSingletonScope();
  container
    .bind(Symbols.AchievementBankService)
    .to(AchievementBankService)
    .inSingletonScope();
  container
    .bind(Symbols.DonationService)
    .to(DonationService)
    .inSingletonScope();
  container.bind(Symbols.CommentService).to(CommentService).inSingletonScope();
  container.bind(Symbols.ArticleService).to(ArticleService).inSingletonScope();
}
