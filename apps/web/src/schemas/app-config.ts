import { z } from 'zod';
import { AchievementsConfigSchema } from '@/features/achievements/schemas';
import { AuthConfigSchema } from '@/features/auth/schemas';
import { ContentConfigSchema } from '@/features/content/schemas';
import { DonationConfigSchema } from '@/features/donation/schemas';
import { ObstructorConfigSchema } from '@/features/obstructor/schemas';
import { PromotionConfigSchema } from '@/features/promotion/schemas';
import { SubscriptionConfigSchema } from '@/features/subscription/schemas';
import { SupportConfigSchema } from '@/features/support/schemas';
import { AppThemeSchema } from './app-theme';
import { CommonConfigSchema } from './common-config';
import { DeploymentMetaSchema } from './deployment-meta';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  achievements: AchievementsConfigSchema,
  auth: AuthConfigSchema,
  content: ContentConfigSchema,
  donation: DonationConfigSchema,
  obstructor: ObstructorConfigSchema,
  promotion: PromotionConfigSchema,
  support: SupportConfigSchema,
  subscription: SubscriptionConfigSchema,
  common: CommonConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
