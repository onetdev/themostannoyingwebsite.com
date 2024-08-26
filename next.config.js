const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} **/
module.exports = {
  poweredByHeader: false,
  trailingSlash: true,
  i18n,
};
