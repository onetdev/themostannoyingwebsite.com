// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import deploymentMeta from '@/root/public/deployment-meta.json' with {
  type: 'json',
};

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_CLIENT_DSN,

  environment: deploymentMeta.environment,
  release: deploymentMeta.release ?? undefined,
  tracesSampleRate: 1,

  debug: false,
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED !== 'false',

  // The telemetry layer adds semantic interaction breadcrumbs. Sentry's
  // default DOM integration would add a second, less contextual click for the
  // same action and evict the useful trail from the 100-entry buffer.
  beforeBreadcrumb(breadcrumb) {
    return breadcrumb.category === 'ui.click' ? null : breadcrumb;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
