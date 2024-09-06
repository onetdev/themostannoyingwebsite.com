import type { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nConfig from '@/root/next-i18next.config';

export const getI18nProps = async (
  context: GetStaticPropsContext,
  ns = ['common'],
) => {
  const locale = context?.locale || context.defaultLocale;
  return await serverSideTranslations(locale as string, ns);
};

/**
 * `getStaticProps` generathor method for pages with only localisation.
 * If you need any additional parameter, you can use {@linkcode getI18nProps}
 * within your custom call.
 */
export const makeI18nStaticProps = (
  localeNs: string[] = [],
  skipDefaults = false,
) => {
  const defaultLoadedNs =
    (typeof i18nConfig.ns === 'string' ? [i18nConfig.ns] : i18nConfig.ns) || [];
  const ns = skipDefaults ? localeNs : [...defaultLoadedNs, ...localeNs];

  const getStatisProps: GetStaticProps = async (context) => ({
    props: await getI18nProps(context, ns),
  });

  return getStatisProps;
};
