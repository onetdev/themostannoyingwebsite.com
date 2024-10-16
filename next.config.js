// eslint-disable-next-line @typescript-eslint/no-require-imports
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} **/
module.exports = {
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
