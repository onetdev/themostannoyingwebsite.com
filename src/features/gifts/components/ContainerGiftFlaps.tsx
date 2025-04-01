import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/lib/utils/i18n';
import { useTheme } from 'next-themes';
import { FunctionComponent, PropsWithChildren } from 'react';

const ContainerGiftFlaps: FunctionComponent = () => {
  const { t } = useTranslation();
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
          />
          <GiftFlapText
            theme={resolvedTheme as AppTheme}
            className="bottom-16 left-16 origin-bottom-left -rotate-90">
            {t('gifts.dilf.flapLeft')}
          </GiftFlapText>
          <GiftFlapText
            theme={resolvedTheme as AppTheme}
            className="bottom-16 right-16 origin-bottom-right rotate-90">
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
      data-theme={theme ?? 'dark'}
      className={`absolute text-2xl font-bold text-gray-600 data-[theme=dark]:text-white ${className}`}>
      {children}
    </span>
  );
};

export default ContainerGiftFlaps;
