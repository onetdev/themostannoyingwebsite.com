import '@/styles/globals.css';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import english from '@/public/locales/en/common.json';
import MainLayout from '@/components/templates/MainLayout';
import ProviderContainer from '@/providers/ProviderContainer';
import GeneratedMetaHead from '@/components/templates/GeneratedMetaHead';

import type { AppProps } from 'next/app';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  // Can't use translations here yet, description will be set on page level
  // https://github.com/i18next/next-i18next?tab=readme-ov-file#serversidetranslations
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

export default appWithTranslation(TheMostAnnoyingWebsite);
