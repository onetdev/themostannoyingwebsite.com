'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { useExperienceFlagsStore } from '@/lib/state/experience_flags';
import { useRuntimeStore } from '@/lib/state/runtime';
import { useTranslations } from 'next-intl';

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
        className="h-auto w-full object-cover data-[reduced-motion=false]:animate-gift-callout"
      />
    </Link>
  );
};

export default OneByOneGift;
