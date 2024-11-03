import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { FunctionComponent, PropsWithChildren } from 'react';

export type SiteTitleProps = PropsWithChildren;

const SiteTitle: FunctionComponent<SiteTitleProps> = ({ children }) => {
  const { t } = useTranslation('common');

  const pageTitle = `${children} - ${t('app.title')}`;

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

export default SiteTitle;
