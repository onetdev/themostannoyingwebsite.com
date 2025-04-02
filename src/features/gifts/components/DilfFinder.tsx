import Image from 'next/image';

import DilfClickOverlay from './DilfClickOverlay';
import { useTranslations } from 'next-intl';

const DilfFinder = () => {
  const t = useTranslations();

  return (
    <div className="relative">
      <Image
        src="/assets/dilf-full.webp"
        width={1900}
        height={1000}
        alt={t('gifts.dilf.title')}
      />
      <DilfClickOverlay className="absolute top-0 w-full" />
    </div>
  );
};

export default DilfFinder;
