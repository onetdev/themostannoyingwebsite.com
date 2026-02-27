'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppConfig } from '@/contexts/AppConfig';
import { DilfClickOverlay } from './DilfClickOverlay';

export function DilfFinder() {
  const config = useAppConfig();
  const t = useTranslations();

  return (
    <div className="relative">
      <Image
        src={config.promotion.assets.dilfFullImage}
        width={1900}
        height={1000}
        alt={t('gifts.dilf.title')}
      />
      <DilfClickOverlay
        className="absolute top-0 w-full"
        title={t('gifts.dilf.finderOverlayTitle')}
      />
    </div>
  );
}
