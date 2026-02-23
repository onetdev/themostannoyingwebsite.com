import { getTranslations } from 'next-intl/server';

import { DilfFinder } from '@/features/promotion';

export async function DilfPage() {
  const t = await getTranslations();

  return (
    <>
      <h1>{t('gifts.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('gifts.dilf.description')}</p>
      <DilfFinder />
    </>
  );
}
