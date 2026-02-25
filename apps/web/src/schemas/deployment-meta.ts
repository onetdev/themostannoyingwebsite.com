import { z } from 'zod';

import { EnvironmentSchema } from './environment';

export const DeploymentMetaSchema = z.object({
  author: z.string(),
  githubUrl: z.string(),
  contactEmail: z.string(),
  version: z.string(),
  publicUrl: z.string(),
  isLocalDevelopment: z.boolean(),
  environment: EnvironmentSchema,
  release: z.string(),
});

export type DeploymentMeta = z.infer<typeof DeploymentMetaSchema>;
