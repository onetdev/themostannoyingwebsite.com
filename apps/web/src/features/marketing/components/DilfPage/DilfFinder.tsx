'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useAppConfigContext } from '@/core/config/react/AppConfig';
import { DilfClickOverlay } from './DilfClickOverlay';

export function DilfFinder() {
  const config = useAppConfigContext();
  const t = useTranslations();

  return (
    <div className="relative">
      <Image
        src={config.marketing.assets.dilfFullImage}
        width={1900}
        height={1000}
        alt={t('marketing.dilf.title')}
      />
      <DilfClickOverlay
        className="absolute top-0 w-full"
        title={t('marketing.dilf.finderOverlayTitle')}
      />
    </div>
  );
}
