import { getTranslations } from 'next-intl/server';

import { DilfFinder } from './DilfFinder';

export async function DilfPage() {
  const t = await getTranslations();

  return (
    <>
      <h1>{t('promotions.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('promotions.dilf.description')}</p>
      <DilfFinder />
    </>
  );
}
