/** @type {import('@sentry/nextjs').SentryBuildOptions} **/
const sentryConfig = {
  org: 'onetdev',
  project: 'themostannoyingwebsite',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: true,
    reactComponentAnnotation: {
      enabled: true,
    },
  },
};

export default sentryConfig;
