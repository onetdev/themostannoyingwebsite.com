import type { Container } from 'inversify';
import { CoreSymbols } from '@/core/di/symbols';
import { HttpClient } from '@/core/http/HttpClient';
import { AchievementBankService } from '@/features/achievements/services';
import { DI as DIAchievements } from '@/features/achievements/types';
import { FakeAuthRepository } from '@/features/auth/repositories';
import { AuthService } from '@/features/auth/services';
import { DI as DIAuth } from '@/features/auth/types';
import { DI as DIComments } from '@/features/comments/types';
import { DI as DIContent } from '@/features/content/types';
import { DonationService } from '@/features/funding/services';
import { DI as DIDonation } from '@/features/funding/types';
import { DI as DIMarketing } from '@/features/marketing/types';
import { SubscriptionPlansService } from '@/features/subscription/services';
import { DI as DISubscription } from '@/features/subscription/types';
import { AppConfigService, AppService } from '@/services';

export const Symbols = {
  ...CoreSymbols,
  ...DIAchievements,
  ...DIAuth,
  ...DIComments,
  ...DIContent,
  ...DIDonation,
  ...DIMarketing,
  ...DISubscription,
};

export function configureCommonContainer(container: Container) {
  // Bing dependencies
  container
    .bind(Symbols.AppConfigService)
    .to(AppConfigService)
    .inSingletonScope();
  container.bind(Symbols.HttpClient).to(HttpClient).inSingletonScope();
  container.bind(Symbols.AppService).to(AppService).inSingletonScope();
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
}
