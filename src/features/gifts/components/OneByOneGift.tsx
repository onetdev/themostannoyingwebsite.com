import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FunctionComponent } from 'react';

import { useExperienceFlagsStore } from '@/state/experience_flags';

export type OneByOneGiftProps = {
  size?: number;
};

const OneByOneGift: FunctionComponent<OneByOneGiftProps> = ({
  size = 1024,
}) => {
  const { t } = useTranslation();
  const enabled = useExperienceFlagsStore((state) => state.gifts.oneByOne);

  if (!enabled) return null;

  return (
    <Link href="/flaim-a-phone">
      <Image
        src="/assets/wan-a-phone.webp"
        width={size}
        height={size}
        alt={t('gifts.wanPhone.title')}
        className="h-auto w-full object-cover"
      />
    </Link>
  );
};

export default OneByOneGift;
