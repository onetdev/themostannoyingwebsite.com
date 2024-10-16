// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const appPackage = require('./package.json');

/** @type {import('favicons').FaviconOptions} */
module.exports = {
  path: '/manifest/',
  appName: 'The Most Annoying Website',
  appShortName: 'The MAW',
  appDescription: '',
  developerName: appPackage.author.name,
  developerURL: appPackage.author.url,
  lang: 'en-US',
  display: 'standalone',
  start_url: '/',
  background: '#2f0031',
  theme_color: '#2f0031',
  orientation: 'portrait-primary',
  version: appPackage.version,
  pixel_art: true,
  // shortcuts: [],
};
