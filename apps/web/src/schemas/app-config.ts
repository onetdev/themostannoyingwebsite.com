import { z } from 'zod';
import { AchievementsConfigSchema } from '@/features/achievements/schemas';
import { ContentConfigSchema } from '@/features/content/schemas';
import { DonationConfigSchema } from '@/features/donation/schemas';
import { ObstructorConfigSchema } from '@/features/obstructor/schemas';
import { PromotionConfigSchema } from '@/features/promotion/schemas';
import { SubscriptionConfigSchema } from '@/features/subscription/schemas';
import { SupportConfigSchema } from '@/features/support/schemas';
import { VerificationConfigSchema } from '@/features/verification/schemas';
import { AppThemeSchema } from './app-theme';
import { CommonConfigSchema } from './common-config';
import { DeploymentMetaSchema } from './deployment-meta';

export const AppConfigSchema = z.object({
  achievements: AchievementsConfigSchema,
  common: CommonConfigSchema,
  content: ContentConfigSchema,
  defaultColorScheme: AppThemeSchema,
  deploymentMeta: DeploymentMetaSchema,
  donation: DonationConfigSchema,
  obstructor: ObstructorConfigSchema,
  promotion: PromotionConfigSchema,
  subscription: SubscriptionConfigSchema,
  support: SupportConfigSchema,
  verification: VerificationConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
