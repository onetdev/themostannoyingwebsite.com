import { NextPage } from 'next';

import { DilfFinder } from '@/features/gifts';
import { useTranslation } from '@/lib/utils/i18n';

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

export default Dilf;
