'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

import { Link } from '@/i18n/navigation';

const ContainerGiftFlaps: FunctionComponent = () => {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();

  return (
    <div className="sticky top-0 hidden w-full justify-center md:flex">
      <div className="absolute max-h-screen overflow-hidden">
        <Link href="/dilf" passHref prefetch={false}>
          <Image
            className="object-cover opacity-30 mix-blend-lighten"
            src="/assets/dilf-shaded.webp"
            alt={t('gifts.dilf.title')}
            width={1900}
            height={1000}
            priority={false}
          />
          <GiftFlapText
            theme={resolvedTheme as AppTheme}
            className="bottom-16 left-16 origin-bottom-left -rotate-90">
            {t('gifts.dilf.flapLeft')}
          </GiftFlapText>
          <GiftFlapText
            theme={resolvedTheme as AppTheme}
            className="right-16 bottom-16 origin-bottom-right rotate-90">
            {t('gifts.dilf.flapRight')}
          </GiftFlapText>
        </Link>
      </div>
    </div>
  );
};

type GiftFlapText = PropsWithChildren<{
  className?: string;
  theme?: AppTheme;
}>;

const GiftFlapText: FunctionComponent<GiftFlapText> = ({
  children,
  className = '',
  theme,
}) => {
  return (
    <span
      suppressHydrationWarning
      data-theme={theme ?? 'dark'}
      className={`absolute text-2xl font-bold text-gray-600 data-[theme=dark]:text-white ${className}`}>
      {children}
    </span>
  );
};

export default ContainerGiftFlaps;
