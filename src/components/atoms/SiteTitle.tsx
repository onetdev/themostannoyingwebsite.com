import { FunctionComponent, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

export type SiteTitleProps = PropsWithChildren;

const SiteTitle: FunctionComponent<SiteTitleProps> = ({ children }) => {
  const { t } = useTranslation('common');

  const pageTitle = `${children} - ${t('meta.title')}`;

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

export default SiteTitle;
