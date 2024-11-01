import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { DilfFinder } from '@/features/gifts';
import { makeI18nStaticProps } from '@/utils/i18n';

const Dilf: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('gifts.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('gifts.dilf.description')}</p>
      <DilfFinder />
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default Dilf;
