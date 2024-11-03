import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { FlaimSurvery } from '@/features/gifts';
import { makeI18nStaticProps } from '@/utils/i18n';

const FlaimWanPhone: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('gifts.wanPhone.title')}</h1>
      <FlaimSurvery className="my-5 max-w-screen-md" />
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default FlaimWanPhone;
