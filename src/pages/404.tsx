import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { makeI18nStaticProps } from '@/lib/utils/i18n';

const Error404: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('messages.errors.e404title')}</h1>
      <p>{t('messages.errors.e404description')}</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Error404;
