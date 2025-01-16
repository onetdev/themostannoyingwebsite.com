import type {
  BrowserOptions,
  NodeOptions,
  VercelEdgeOptions,
} from '@sentry/nextjs';

const sentryConfig: VercelEdgeOptions | NodeOptions | BrowserOptions = {
  environment: process.env.VERCEL_ENV || 'development',
  release: (process.env.VERCEL_GIT_COMMIT_REF || '').replace(
    /[^a-z0-9._-]/gi,
    '-',
  ),

  // Client, Server, Edge related configs in their own sub configs
};

export default sentryConfig;
