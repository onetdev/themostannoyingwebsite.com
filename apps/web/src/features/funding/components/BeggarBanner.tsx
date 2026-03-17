'use client';

import { Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { useBeggarBanner } from '../hooks';

export function BeggarBanner() {
  const t = useTranslations();
  const { isVisible, bannerData, onDismiss } = useBeggarBanner();

  if (!isVisible || !bannerData) {
    return null;
  }

  return (
    <div className="bg-error text-on-error relative z-50 w-full shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-5 xl:px-8">
        <div className="flex-1">
          <p className="text-sm md:text-base">
            <span className="font-bold">{t(bannerData.prefixKey)}</span>{' '}
            {t(bannerData.messageKey)}{' '}
            <Link href="/donate" className="link-as-inherit underline">
              {t(bannerData.linkTextKey)}
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 cursor-pointer"
          aria-label={t('app.dismissBanner')}
        >
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
}
