'use client';

import { Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useDonationService } from '../application';

import { Link } from '@/i18n/navigation';

export function BeggarBanner() {
  const t = useTranslations();
  const donationService = useDonationService();
  const [isVisible, setIsVisible] = useState(false);
  const [bannerData, setBannerData] = useState<{
    message: string;
    prefix: string;
    linkText: string;
  } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner should be visible
    const shouldShow = donationService.shouldShowBeggingBanner();
    setIsVisible(shouldShow);

    // Get message for current month (deterministic based on month)
    if (shouldShow) {
      const data = donationService.getBeggingBannerData(t);
      setBannerData(data);
    }
  }, [donationService, t]);

  const handleDismiss = () => {
    // Dismiss only for current session (no localStorage)
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed || !bannerData) {
    return null;
  }

  return (
    <div className="bg-error text-on-error z-50 w-full shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 px-5 py-5 xl:px-8">
        <div className="flex-1">
          <p className="text-sm md:text-base">
            <span className="font-bold">{bannerData.prefix}</span>{' '}
            {bannerData.message}{' '}
            <Link href="/donate" className="as-text underline">
              {bannerData.linkText}
            </Link>
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 cursor-pointer"
          aria-label="Dismiss banner">
          <Icon icon="close" />
        </button>
      </div>
    </div>
  );
}
