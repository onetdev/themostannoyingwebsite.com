import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/utils/i18n';

const Login: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.login')}</SiteTitle>
      <h1>{t('navigation.login')}</h1>
      <p>Soon 🥹 👉👈</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Login;
