// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import config from './environment.config';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_CLIENT_DSN,

  environment: config.environment,
  release: config.release,
  tracesSampleRate: 1,

  debug: false,
});
