'use client';

import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { Link } from '@/i18n/navigation';
import { useUserGrantsStore } from '@/kernel';

const CookieConsent: FunctionComponent = () => {
  const t = useTranslations();
  const completed = useUserGrantsStore((state) => state.reviewCompleted);
  const setReviewCompleted = useUserGrantsStore(
    (state) => state.setReviewCompleted,
  );

  const close = () => setReviewCompleted(true);

  return (
    !completed && (
      <div className="border-tertiary bg-surface sticky -bottom-3 z-20 rounded-md border px-5 py-3 shadow-md">
        <p>{t('app.cookieConsent')}</p>
        <div className="my-2 flex items-center justify-end gap-3">
          <Link href="/settings" passHref prefetch={false}>
            {t('navigation.settings')}
          </Link>
          <button onClick={close}>{t('common.ok')}</button>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
