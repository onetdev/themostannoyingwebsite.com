'use client';

import { Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useDonationService } from '../hooks';

export function BeggarBanner() {
  const t = useTranslations();
  const donationService = useDonationService();
  const [isVisible, setIsVisible] = useState(false);
  const [bannerData, setBannerData] = useState<{
    messageKey: AppTranslationKey;
    prefixKey: AppTranslationKey;
    linkTextKey: AppTranslationKey;
  } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner should be visible
    const shouldShow = donationService.shouldShowBeggingBanner();
    setIsVisible(shouldShow);

    // Get message for current month (deterministic based on month)
    if (shouldShow) {
      const data = donationService.getBeggingBannerData();
      setBannerData(data);
    }
  }, [donationService]);

  const handleDismiss = () => {
    // Dismiss only for current session (no localStorage)
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed || !bannerData) {
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
          onClick={handleDismiss}
          className="shrink-0 cursor-pointer"
          aria-label={t('app.dismissBanner')}
        >
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
}
