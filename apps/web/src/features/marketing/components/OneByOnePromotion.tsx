'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { Link } from '@/i18n/navigation';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';

export type OneByOnePromotionProps = {
  size?: number;
};

export function OneByOnePromotion({ size = 1024 }: OneByOnePromotionProps) {
  const config = useAppConfigContext();
  const t = useTranslations();
  const enabled = usePainPreferencesStore(
    (state) => state.flags['promotions.oneByOne'],
  );
  const reducedMotion = useRuntimeStore((state) => state.systemReducedMotion);

  if (!enabled) return null;

  return (
    <Link href="/flaim-a-phone" className="overflow-hidden">
      <Image
        src={config.promotion.assets.wanAPhoneAd}
        width={size}
        height={size}
        alt={t('marketing.wanPhone.title')}
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
        className="data-[reduced-motion=false]:animate-gift-callout h-auto w-full object-cover"
      />
    </Link>
  );
}
