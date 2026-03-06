'use client';

import { PageHeadline } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

export function MyProfilePage() {
  const t = useTranslations();

  return (
    <>
      <PageHeadline>{t('navigation.profile')}</PageHeadline>
      <p>{t('user.myProfile.notSupposedToBeHere')}</p>
    </>
  );
}
