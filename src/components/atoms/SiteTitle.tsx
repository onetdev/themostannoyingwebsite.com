import Head from 'next/head';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useTranslations } from 'next-intl';

export type SiteTitleProps = PropsWithChildren;

const SiteTitle: FunctionComponent<SiteTitleProps> = ({ children }) => {
  const t = useTranslations('common');

  const pageTitle = `${children} - ${t('app.title')}`;

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

export default SiteTitle;
