import { z } from 'zod';

import { DeploymentMetaSchema } from './deployment-meta';
import { DonationConfigSchema } from './donation-config';
import { AppThemeSchema } from '../value-object/app-theme';

export const AppConfigSchema = z.object({
  defaultColorScheme: AppThemeSchema,
  donation: DonationConfigSchema,
  deploymentMeta: DeploymentMetaSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
