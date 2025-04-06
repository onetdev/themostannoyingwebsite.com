'use client';

import { Link } from '@/root/apps/web/src/i18n/navigation';
import { FunctionComponent } from 'react';

import { useUserGrantsStore } from '@/root/apps/web/src/lib/state/user_grants';
import { useTranslations } from 'next-intl';

const CookieConsent: FunctionComponent = () => {
  const t = useTranslations();
  const completed = useUserGrantsStore((state) => state.reviewCompleted);
  const setReviewCompleted = useUserGrantsStore(
    (state) => state.setReviewCompleted,
  );

  const close = () => setReviewCompleted(true);

  return (
    !completed && (
      <div className="sticky -bottom-3 z-20 rounded-md border border-tertiary bg-surface px-5 py-3 shadow-md">
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
