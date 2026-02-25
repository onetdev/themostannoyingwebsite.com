import { z } from 'zod';

import { AppThemeSchema } from './app-theme';
import { DeploymentMetaSchema } from './deployment-meta';

import { DonationConfigSchema } from '@/features/donation/schemas';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
