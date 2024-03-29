import { FunctionComponent, PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

type Props = PropsWithChildren;
const SiteTitle: FunctionComponent<Props> = ({ children }) => {
  const { t } = useTranslation('common');

  return (
    <Head>
      <title>
        {children} - {t('meta.title')}
      </title>
    </Head>
  );
};

export default SiteTitle;
