import '@/styles/globals.css';
import Head from 'next/head';
import { UserConfig, appWithTranslation } from 'next-i18next';

import english from '@/public/locales/en/common.json';
import MainLayout from '@/components/templates/MainLayout';
import ProviderContainer from '@/providers/ProviderContainer';
import GeneratedMetaHead from '@/components/templates/GeneratedMetaHead';

import nextI18NextConfig from '@/../next-i18next.config.js';

import type { AppProps } from 'next/app';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  // Can't use translations here yet, description will be set on page level
  // https://github.com/i18next/next-i18next/tree/v15.2.0#serversidetranslations
  const description = english.meta.description;

  return (
    <ProviderContainer>
      <Head>
        <title>The Most Annoying Website</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content="/assets/social.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Most Annoying Website" />
        <meta name="robots" content="follow" />
      </Head>
      <GeneratedMetaHead />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ProviderContainer>
  );
};

// This is to avoid the following build error:
// `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// https://github.com/i18next/next-i18next/tree/v15.2.0#usage-with-fallback-ssg-pages
const emptyInitialI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
    locales: nextI18NextConfig.i18n.locales,
  },
};

export default appWithTranslation(
  TheMostAnnoyingWebsite,
  emptyInitialI18NextConfig,
);
