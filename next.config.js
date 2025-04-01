/* eslint-disable @typescript-eslint/no-require-imports */
const analyzer = require('@next/bundle-analyzer');
const { withSentryConfig } = require('@sentry/nextjs');

const deploymentMeta = require('./deployment-meta');
const sentryConfig = require('./next-sentry.config');

/** @type {import('next').NextConfig} **/
const nextConfig = {
  publicRuntimeConfig: {
    ...deploymentMeta,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    const oneHourCache = {
      key: 'Cache-Control',
      value: 'public, max-age=3600, immutable',
    };

    return [
      {
        source: '/assets/:all*',
        headers: [oneHourCache],
      },
      {
        source: '/manifest/:all*',
        headers: [oneHourCache],
      },
      {
        source: '/locales/:all*',
        headers: [oneHourCache],
      },
      {
        source: '/favicon.ico',
        headers: [oneHourCache],
      },
    ];
  },
  poweredByHeader: false,
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryConfig);
