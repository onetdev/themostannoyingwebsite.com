import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import { useUserGrantsStore } from '@/state/user_grants';

const CookieBar: FunctionComponent = () => {
  const { t } = useTranslation();
  const completed = useUserGrantsStore((state) => state.reviewCompleted);
  const setReviewCompleted = useUserGrantsStore(
    (state) => state.setReviewCompleted,
  );

  const close = () => setReviewCompleted(true);

  return (
    !completed && (
      <div className="sticky -bottom-3 rounded-md border border-tertiary bg-surface px-5 py-3 shadow-md">
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

export default CookieBar;
