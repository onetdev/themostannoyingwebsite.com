import { getTranslations } from 'next-intl/server';

import { DilfFinder } from './DilfFinder';

export async function DilfPage() {
  const t = await getTranslations();

  return (
    <>
      <h1>{t('marketing.dilf.fullTitle')}</h1>
      <p className="my-5 max-w-screen-md">{t('marketing.dilf.description')}</p>
      <DilfFinder />
    </>
  );
}
