import { z } from 'zod';
import { AchievementsConfigSchema } from '@/features/achievements/schemas';
import { CaptchaConfigSchema } from '@/features/captcha/schemas';
import { ContentConfigSchema } from '@/features/content/schemas';
import { ObstructorConfigSchema } from '@/features/disruptions/schemas';
import { DonationConfigSchema } from '@/features/funding/schemas';
import { PromotionConfigSchema } from '@/features/marketing/schemas';
import { SubscriptionConfigSchema } from '@/features/subscription/schemas';
import { SupportConfigSchema } from '@/features/support/schemas';
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
  verification: CaptchaConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
