import analyzer from '@next/bundle-analyzer';
import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

import sentryConfig from './next-sentry.config.mjs';

/** @type {import('next').NextConfig} **/
const nextConfig = {
  transpilePackages: ['emittery'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async headers() {
    const oneDayCache = {
      key: 'Cache-Control',
      value: 'public, max-age=86400, stale-while-revalidate=600',
    };
    const oneYearCache = {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    };

    return [
      {
        source: '/ads/:all*',
        headers: [oneYearCache],
      },
      {
        source: '/assets/:all*',
        headers: [oneYearCache],
      },
      {
        source: '/manifest/:all*',
        headers: [oneYearCache],
      },
      {
        source: '/deployment-meta.json',
        headers: [oneDayCache],
      },
      {
        source: '/favicon.ico',
        headers: [oneYearCache],
      },
    ];
  },
  poweredByHeader: false,
};

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/core/i18n/request.ts',
});

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
