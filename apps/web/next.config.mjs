import analyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

import sentryConfig from './next-sentry.config.mjs';

/** @type {import('next').NextConfig} **/
const nextConfig = {
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

/** @type {import('@next/mdx').NextMDXOptions} **/
const mdxConfig = {
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
};

const withMDX = createMDX(mdxConfig);

export default withSentryConfig(
  withNextIntl(withBundleAnalyzer(withMDX(nextConfig))),
  sentryConfig,
);
