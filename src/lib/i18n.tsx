import { default as languageDetectorSuper } from 'next-language-detector';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nextConfig from '@/../next-i18next.config';

import type { GetStaticProps, GetStaticPropsContext } from 'next';

export const languageDetector = languageDetectorSuper({
  supportedLngs: i18nextConfig.i18n.locales,
  fallbackLng: i18nextConfig.i18n.defaultLocale,
});

export const getI18nProps = async (
  context: GetStaticPropsContext,
  ns = ['common'],
) => {
  const locale = context?.params?.locale || i18nextConfig.i18n.defaultLocale;
  return await serverSideTranslations(locale as string, ns);
};

/**
 * `getStaticProps` generathor method for pages with only localisation.
 * If you need any additional parameter, you can use {@linkcode getI18nProps}
 * within your custom call.
 */
export const makeI18nStaticProps = (localeNs?: string[]) => {
  const getStatisProps: GetStaticProps = async (context) => ({
    props: await getI18nProps(context, localeNs),
  });

  return getStatisProps;
};
