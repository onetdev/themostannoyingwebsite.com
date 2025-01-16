import type {
  BrowserOptions,
  NodeOptions,
  VercelEdgeOptions,
} from '@sentry/nextjs';

const sentryConfig: VercelEdgeOptions | NodeOptions | BrowserOptions = {
  environment: process.env.VERCEL_ENV || 'development',

  // Sentry won't accept branch names with "/" so this line aims to replace
  // all non-alphanumeric characters with "-"
  release: (process.env.VERCEL_GIT_COMMIT_REF || '').replace(
    /[^a-z0-9._-]/gi,
    '-',
  ),

  // Client, Server, Edge related configs in their own sub configs
};

export default sentryConfig;
