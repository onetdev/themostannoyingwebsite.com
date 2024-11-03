import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { FlaimSurvery } from '@/features/gifts';
import { makeI18nStaticProps } from '@/lib/utils/i18n';

const FlaimWanPhone: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main className="mx-auto max-w-screen-lg py-0 md:py-14">
      <h1>{t('gifts.wanPhone.title')}</h1>
      <FlaimSurvery className="my-5 w-full" />
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default FlaimWanPhone;
