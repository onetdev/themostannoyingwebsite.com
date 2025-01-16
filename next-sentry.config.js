/** @type {import('@sentry/nextjs').SentryBuildOptions} **/
const sentryConfig = {
  org: 'onetdev',
  project: 'themostannoyingwebsite',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

module.exports = sentryConfig;
