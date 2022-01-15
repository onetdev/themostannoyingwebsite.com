import '@/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '@/components/master/Layout';
import Provider from '@/components/master/Provider';

const TheMostAnnoyingWebsite = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Head>
        <title>The Most Annoying Website</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2f0031" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default TheMostAnnoyingWebsite;
