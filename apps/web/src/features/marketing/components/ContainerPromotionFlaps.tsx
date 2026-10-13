'use client';

import { FadeIn } from '@maw/ui-lib';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/core/i18n/navigation';
import { useAppConfigContext } from '@/core/react';

export function ContainerPromotionFlaps() {
  const config = useAppConfigContext();
  const t = useTranslations();

  return (
    <FadeIn className="sticky top-0 hidden w-full justify-center md:flex">
      <div className="absolute max-h-screen overflow-hidden">
        <Link href="/dilf" passHref prefetch={false}>
          <Image
            className="object-cover opacity-30 mix-blend-lighten"
            src={config.marketing.assets.dilfFlapsAd}
            alt={t('marketing.dilf.title')}
            width={1900}
            height={1000}
            priority
          />
        </Link>
      </div>
    </FadeIn>
  );
}
