import { loadEnvConfig } from '@next/env';

import { toBool } from '@/lib/utils/math';

// This will also load data from .env.local and similar files from the root
const { combinedEnv: env } = loadEnvConfig(process.cwd());

const isLocalDevelopment = toBool(env.NEXT_PUBLIC_IS_DEV) || false;
let publicUrl =
  env.NEXT_PUBLIC_SITE_URL || 'https://www.themostannoyingwebsite.com';

if (isLocalDevelopment) {
  publicUrl = `https://localhost:${env.PORT || 3000}`;
} else if (env.VERCEL_ENV === 'preview') {
  publicUrl = `https://${env.VERCEL_BRANCH_URL}`;
} else if (env.VERCEL_ENV === 'production') {
  publicUrl = `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
}

const environmentConfig = {
  publicUrl,
  isLocalDevelopment,
  environment: env.VERCEL_ENV || 'development',

  // Sentry won't accept branch names with "/" so this line aims to replace
  // all non-alphanumeric characters with "-"
  release:
    (env.VERCEL_GIT_COMMIT_REF || '').replace(/[^a-z0-9._-]/gi, '-') ||
    undefined,
};

export default environmentConfig;
