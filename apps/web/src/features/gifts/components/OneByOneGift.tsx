'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FunctionComponent } from 'react';

import { Link } from '@/i18n/navigation';
import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';

export type OneByOneGiftProps = {
  size?: number;
};

const OneByOneGift: FunctionComponent<OneByOneGiftProps> = ({
  size = 1024,
}) => {
  const t = useTranslations();
  const enabled = useExperienceFlagsStore((state) => state.gifts.oneByOne);
  const reducedMotion = useRuntimeStore((state) => state.reducedMotion);

  if (!enabled) return null;

  return (
    <Link href="/flaim-a-phone" className="overflow-hidden">
      <Image
        src="/assets/wan-a-phone.webp"
        width={size}
        height={size}
        alt={t('gifts.wanPhone.title')}
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
        className="data-[reduced-motion=false]:animate-gift-callout h-auto w-full object-cover"
      />
    </Link>
  );
};

export default OneByOneGift;
