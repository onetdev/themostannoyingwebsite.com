'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

export function ProfilePage() {
  const t = useTranslations();

  return (
    <>
      <PageHeadline>{t('navigation.profile')}</PageHeadline>
      <p>Hmm, you are not supposed to be here 😡</p>
    </>
  );
}
