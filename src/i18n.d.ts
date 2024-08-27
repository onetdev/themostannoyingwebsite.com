import 'i18next';
/* eslint-disable no-restricted-imports */
import common from '../public/locales/en/common.json';
import settings from '../public/locales/en/settings.json';

type Common = typeof common;
type Settings = typeof settings;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      settings: typeof settings;
    };
  }
}
