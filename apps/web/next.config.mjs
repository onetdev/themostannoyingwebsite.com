import analyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkGfm from 'remark-gfm';

import deploymentMeta from './deployment-meta.mjs';
import sentryConfig from './next-sentry.config.mjs';

/** @type {import('next').NextConfig} **/
const nextConfig = {
  publicRuntimeConfig: {
    ...deploymentMeta,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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

const withNextIntl = createNextIntlPlugin({});

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(
  withSentryConfig(withNextIntl(withBundleAnalyzer(nextConfig)), sentryConfig),
);
