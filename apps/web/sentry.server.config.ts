// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import deploymentMeta from '@/root/public/deployment-meta.json';

Sentry.init({
  dsn: process.env.SENTRY_SERVER_DSN,

  environment: deploymentMeta.environment,
  release: deploymentMeta.release,
  tracesSampleRate: 1,

  debug: false,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false',
});
