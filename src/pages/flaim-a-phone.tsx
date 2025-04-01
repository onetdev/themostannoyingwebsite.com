import { NextPage } from 'next';
import { useTranslation } from '@/lib/utils/i18n';

import { FlaimSurvery } from '@/features/gifts';

const FlaimWanPhone: NextPage = () => {
  const { t } = useTranslation();

  return (
    <main className="mx-auto max-w-screen-lg py-0 md:py-14">
      <h1>{t('gifts.wanPhone.title')}</h1>
      <FlaimSurvery className="my-5 w-full" />
    </main>
  );
};

export default FlaimWanPhone;
