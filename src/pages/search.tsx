import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import SiteTitle from '@/components/atoms/SiteTitle';
import { makeI18nStaticProps } from '@/utils/i18n';

const Search: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <main>
      <SiteTitle>{t('navigation.search')}</SiteTitle>
      <h1>{t('navigation.search')}</h1>
      <p>Soon 🥹 👉👈</p>
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Search;
