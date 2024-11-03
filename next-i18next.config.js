const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  reloadOnPrerender: isDev,
  debug: false, // isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  defaultNS: 'common',
  ns: [
    'common',
    // You can add additional collections here
  ],
};
