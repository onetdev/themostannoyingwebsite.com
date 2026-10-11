import { PageHeadline } from '@maw/ui-lib';
import { getTranslations } from 'next-intl/server';
import { ShareButton } from '@/features/share/components';

import { DilfFinder } from './DilfFinder';

export async function DilfPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHeadline actions={<ShareButton />}>
        {t('marketing.dilf.fullTitle')}
      </PageHeadline>
      <p className="my-5 max-w-screen-md">{t('marketing.dilf.description')}</p>
      <DilfFinder />
    </>
  );
}
