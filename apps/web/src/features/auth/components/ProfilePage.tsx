'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

export function ProfilePage() {
  const t = useTranslations();

  return (
    <>
      <PageHeadline>{t('navigation.profile')}</PageHeadline>
      <p>{t('user.profile.notSupposedToBeHere')}</p>
    </>
  );
}
