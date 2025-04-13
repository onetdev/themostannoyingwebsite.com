/** @type {import('@sentry/nextjs').SentryBuildOptions} **/
const sentryConfig = {
  org: 'onetdev',
  project: 'themostannoyingwebsite',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
};

export default sentryConfig;
