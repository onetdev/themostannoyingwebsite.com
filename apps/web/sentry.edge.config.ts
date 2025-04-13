// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import deploymentMeta from './deployment-meta.mjs';

Sentry.init({
  dsn: process.env.SENTRY_EDGE_DSN,

  environment: deploymentMeta.environment,
  release: deploymentMeta.release,
  tracesSampleRate: 1,

  debug: false,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false',
});
