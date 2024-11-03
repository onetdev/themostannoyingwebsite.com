import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import DilfClickOverlay from './DilfClickOverlay';

const DilfFinder = () => {
  const { t } = useTranslation();

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
