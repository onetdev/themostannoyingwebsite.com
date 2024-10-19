import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import PageHeadline from '@/components/atoms/PageHeadline';
import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/utils/i18n';

const Registration: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.registration')}</SiteTitle>
      <PageHeadline>{t('navigation.registration')}</PageHeadline>
      <p>Soon 🥹 👉👈</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Registration;
