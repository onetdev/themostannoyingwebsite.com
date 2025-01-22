// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import getConfig from 'next/config';

const config = getConfig().publicRuntimeConfig || {};

Sentry.init({
  dsn: process.env.SENTRY_SERVER_DSN,

  environment: config.environment,
  release: config.release,
  tracesSampleRate: 1,

  debug: false,
});
