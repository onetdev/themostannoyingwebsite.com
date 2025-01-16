import type {
  BrowserOptions,
  NodeOptions,
  VercelEdgeOptions,
} from '@sentry/nextjs';

const sentryConfig: VercelEdgeOptions | NodeOptions | BrowserOptions = {
  environment: process.env.VERCEL_ENV,
  release: process.env.VERCEL_GIT_COMMIT_REF,

  // Client, Server, Edge related configs in their own sub configs
};

export default sentryConfig;
