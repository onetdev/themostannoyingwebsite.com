'use client';

import { useEffect, useState } from 'react';
import { useUserPreferencesStore } from '@/stores';
import { useDonationService } from '../hooks';

export function useBeggarBanner() {
  const donationService = useDonationService();
  const { donationLastDismissedDate, setDonationLastDismissedDate } =
    useUserPreferencesStore();
  const [isVisible, setIsVisible] = useState(false);
  const [bannerData, setBannerData] = useState<{
    messageKey: AppTranslationKey;
    prefixKey: AppTranslationKey;
    linkTextKey: AppTranslationKey;
  } | null>(null);

  useEffect(() => {
    // Check if banner should be visible based on date range
    const shouldShow = donationService.shouldShowBeggingBanner();

    if (!shouldShow) {
      setIsVisible(false);
      return;
    }

    // Check if dismissed this month
    if (donationLastDismissedDate) {
      const lastDismissed = new Date(donationLastDismissedDate);
      const now = new Date();
      const isSameMonth =
        lastDismissed.getMonth() === now.getMonth() &&
        lastDismissed.getFullYear() === now.getFullYear();

      if (isSameMonth) {
        setIsVisible(false);
        return;
      }
    }

    setIsVisible(true);
    setBannerData(donationService.getBeggingBannerData());
  }, [donationService, donationLastDismissedDate]);

  const onDismiss = () => {
    setDonationLastDismissedDate(new Date().toISOString());
  };

  return {
    isVisible: isVisible && !!bannerData,
    bannerData,
    onDismiss,
  };
}
