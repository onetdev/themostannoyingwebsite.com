// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import deplotmentMeta from '@/root/apps/web/public/deployment-meta.json';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_CLIENT_DSN,

  environment: deplotmentMeta.environment,
  release: deplotmentMeta.release ?? undefined,
  tracesSampleRate: 1,

  debug: false,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false',
});
