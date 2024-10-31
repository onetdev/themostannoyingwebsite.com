import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

import { makeI18nStaticProps } from '@/utils/i18n';

const FlaimWanPhone: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('gifts.wanPhone.title')}</h1>
      {/* TODO: Add simple questioneer with timer */}
    </main>
  );
};

export const getStaticProps = makeI18nStaticProps();
export default FlaimWanPhone;
