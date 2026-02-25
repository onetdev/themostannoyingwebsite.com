'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { PropsWithChildren } from 'react';

import { Link } from '@/i18n/navigation';

export function ContainerPromotionFlaps() {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();

  return (
    <div className="sticky top-0 hidden w-full justify-center md:flex">
      <div className="absolute max-h-screen overflow-hidden">
        <Link href="/dilf" passHref prefetch={false}>
          <Image
            className="object-cover opacity-30 mix-blend-lighten"
            src="/ads/ad-dilf-flaps.webp"
            alt={t('gifts.dilf.title')}
            width={1900}
            height={1000}
            priority={false}
          />
          <PromotionFlapText
            theme={resolvedTheme as AppTheme}
            className="bottom-16 left-16 origin-bottom-left -rotate-90">
            {t('gifts.dilf.flapLeft')}
          </PromotionFlapText>
          <PromotionFlapText
            theme={resolvedTheme as AppTheme}
            className="right-16 bottom-16 origin-bottom-right rotate-90">
            {t('gifts.dilf.flapRight')}
          </PromotionFlapText>
        </Link>
      </div>
    </div>
  );
}

type PromotionFlapText = PropsWithChildren<{
  className?: string;
  theme?: AppTheme;
}>;

function PromotionFlapText({
  children,
  className = '',
  theme,
}: PromotionFlapText) {
  return (
    <span
      suppressHydrationWarning
      data-theme={theme ?? 'dark'}
      className={`absolute text-2xl font-bold text-gray-600 data-[theme=dark]:text-white ${className}`}>
      {children}
    </span>
  );
}
