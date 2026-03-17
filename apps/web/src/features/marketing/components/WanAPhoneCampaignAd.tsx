'use client';

import { FadeIn } from '@maw/ui-lib';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { useAppConfigContext, useLogger } from '@/core/react';
import { useLocaleResource } from '@/hooks';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';

export type WanAPhoneCampaignAdProps = {
  size?: number;
};

export function WanAPhoneCampaignAd({ size = 1024 }: WanAPhoneCampaignAdProps) {
  const logger = useLogger('marketing.oneByOnePromotion');
  const config = useAppConfigContext();
  const { resolve, locale } = useLocaleResource();
  const t = useTranslations();
  const enabled = usePainPreferencesStore(
    (state) => state.flags['promotions.oneByOne'],
  );
  const reducedMotion = useRuntimeStore((state) => state.systemReducedMotion);
  const resolvedAssetUri = resolve(config.marketing.assets.wanAPhoneAd);

  if (!resolvedAssetUri) {
    logger.warn(
      `Ad asset URI cannot be resolved using "${locale}" nor default locale.`,
    );
    return null;
  }

  return (
    <AnimatePresence>
      {enabled && (
        <FadeIn className="overflow-clip" key="wan-a-phone-ad">
          <Link href="/flaim-a-phone">
            <Image
              src={resolvedAssetUri}
              width={size}
              height={size}
              alt={t('marketing.wanPhone.title')}
              data-reduced-motion={reducedMotion ? 'true' : 'false'}
              className="data-[reduced-motion=false]:animate-gift-callout h-auto w-full object-cover"
            />
          </Link>
        </FadeIn>
      )}
    </AnimatePresence>
  );
}
