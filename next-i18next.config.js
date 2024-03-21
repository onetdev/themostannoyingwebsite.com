const isDev = process.env.NODE_ENV === 'development';
/** @type {import('next-i18next').UserConfig} */
module.exports = {
  reloadOnPrerender: isDev,
  debug: isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu'],
    localeDetection: true,
  },
};
