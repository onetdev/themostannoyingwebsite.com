'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';

import { Link } from '@/core/i18n/navigation';
import { useUserGrantsStore } from '@/stores';

export function CookieConsent() {
  const t = useTranslations();
  const completed = useUserGrantsStore((state) => state.reviewCompleted);
  const setReviewCompleted = useUserGrantsStore(
    (state) => state.setReviewCompleted,
  );

  const close = () => setReviewCompleted(true);

  return (
    !completed && (
      <div className="border-tertiary bg-card sticky -bottom-3 z-20 rounded-md border px-gutter py-3 shadow-md">
        <p>{t('common.app.cookieConsent')}</p>
        <div className="my-2 flex items-center justify-end gap-3">
          <Link href="/settings" passHref prefetch={false}>
            {t('common.navigation.settings')}
          </Link>
          <Button variant="outline" size="sm" type="button" onClick={close}>
            {t('common.action.ok')}
          </Button>
        </div>
      </div>
    )
  );
}
