import deploymentMeta from './deployment-meta.mjs';

/** @type {import('favicons').FaviconOptions} */
const config = {
  path: '/manifest/',
  appName: 'The Most Annoying Website',
  appShortName: 'The MAW',
  appDescription: '',
  developerName: deploymentMeta.author.name,
  developerURL: deploymentMeta.author.url,
  lang: 'en-US',
  display: 'standalone',
  start_url: '/',
  background: '#2f0031',
  theme_color: '#2f0031',
  orientation: 'portrait-primary',
  version: deploymentMeta.version,
  pixel_art: true,
  // shortcuts: [],
};

export default config;
