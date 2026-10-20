import type { Container } from 'inversify';
import { createAppContentClient } from '@/core/content';
import { CoreSymbols } from '@/core/di/symbols';
import { HttpClient } from '@/core/http/HttpClient';
import { AchievementBankService } from '@/features/achievements/services';
import { DI as DIAchievements } from '@/features/achievements/types';
import { FakeAuthRepository } from '@/features/auth/repositories';
import { AuthService } from '@/features/auth/services';
import { DI as DIAuth } from '@/features/auth/types';
import { DI as DIContent } from '@/features/content/types';
import { DonationService } from '@/features/funding/services';
import { DI as DIDonation } from '@/features/funding/types';
import { SubscriptionPlansService } from '@/features/subscription/services';
import { DI as DISubscription } from '@/features/subscription/types';
import { AppService } from '@/services';

/**
 * Registers the client-safe bindings shared by the browser and server
 * containers.
 *
 * Every service registered here must be importable from the client bundle.
 * Anything that `import 'server-only'` belongs in `container.server.ts`
 * instead, so it never reaches the browser.
 */
export function configureBaseContainer(container: Container) {
  container.bind(CoreSymbols.HttpClient).to(HttpClient).inSingletonScope();
  container
    .bind(DIContent.ContentApiClient)
    .toDynamicValue(() => createAppContentClient())
    .inSingletonScope();
  container.bind(CoreSymbols.AppService).to(AppService).inSingletonScope();
  container
    .bind(DISubscription.SubscriptionPlansService)
    .to(SubscriptionPlansService)
    .inSingletonScope();
  container
    .bind(DIAuth.AuthRepository)
    .to(FakeAuthRepository)
    .inSingletonScope();
  container.bind(DIAuth.AuthService).to(AuthService).inSingletonScope();
  container
    .bind(DIAchievements.AchievementBankService)
    .to(AchievementBankService)
    .inSingletonScope();
  container
    .bind(DIDonation.DonationService)
    .to(DonationService)
    .inSingletonScope();
}
