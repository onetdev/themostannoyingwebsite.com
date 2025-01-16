/* eslint-disable @typescript-eslint/no-require-imports */
const analyzer = require('@next/bundle-analyzer');
const { withSentryConfig } = require('@sentry/nextjs');

const { i18n } = require('./next-i18next.config');
const sentryConfig = require('./next-sentry.config');

/** @type {import('next').NextConfig} **/
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  i18n,
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
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryConfig);
