import * as z from 'zod';
import { AchievementsConfigSchema } from '@/features/achievements/schemas';
import { CaptchaConfigSchema } from '@/features/captcha/schemas';
import { ContentConfigSchema } from '@/features/content/schemas';
import { DisruptionsConfigSchema } from '@/features/disruptions/schemas';
import { FundingConfigSchema } from '@/features/funding/schemas';
import { MarketingConfigSchema } from '@/features/marketing/schemas';
import { SubscriptionConfigSchema } from '@/features/subscription/schemas';
import { SupportConfigSchema } from '@/features/support/schemas';
import { AppThemeSchema } from './app-theme';
import { CommonConfigSchema } from './common-config';
import { DeploymentMetaSchema } from './deployment-meta';

export const AppConfigSchema = z.object({
  common: CommonConfigSchema,
  defaultColorScheme: AppThemeSchema,
  deploymentMeta: DeploymentMetaSchema,

  // Feature specific config
  achievements: AchievementsConfigSchema,
  captcha: CaptchaConfigSchema,
  content: ContentConfigSchema,
  disruptions: DisruptionsConfigSchema,
  funding: FundingConfigSchema,
  marketing: MarketingConfigSchema,
  subscription: SubscriptionConfigSchema,
  support: SupportConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
