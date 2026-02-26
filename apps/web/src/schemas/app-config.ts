import { z } from 'zod';
import { DonationConfigSchema } from '@/features/donation/schemas';
import { AppThemeSchema } from './app-theme';
import { DeploymentMetaSchema } from './deployment-meta';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
