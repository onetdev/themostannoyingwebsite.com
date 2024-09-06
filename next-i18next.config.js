const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  reloadOnPrerender: isDev,
  debug: false, // isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu'],
  },
  defaultNS: 'common',
  ns: ['common', 'chat_bubble', 'gifts', 'notifications', 'wheel_of_fortune'],
};
