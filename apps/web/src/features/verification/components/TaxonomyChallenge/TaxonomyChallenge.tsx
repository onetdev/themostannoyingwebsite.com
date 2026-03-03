'use client';

import { useTranslations } from 'next-intl';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { TaxonomySelectorSelect } from './TaxonomySelector';

interface TaxonomyChallengeProps {
  className?: string;
  onResolved?: () => void;
}

export function TaxonomyChallenge({
  className,
  onResolved,
}: TaxonomyChallengeProps) {
  const t = useTranslations();
  const {
    verification: { assets },
  } = useAppConfigContext();

  const onCountChange = (count: number) => {
    if (count === 9) {
      onResolved?.();
    }
  };

  return (
    <div className={`w-full max-w-[350px] ${className}`}>
      <div className="bg-primary text-primary-foreground mb-2 p-4">
        <div className="opacity-90">
          {t.rich('verification.captcha.taxonomyChallengePrompt', {
            target: 'pamparam',
            spanTag: (chunks) => (
              <span className="font-bold leading-tight">{chunks}</span>
            ),
          })}
        </div>
        <div className="mt-1 text-xs opacity-75">
          {t('verification.captcha.taxonomyChallengeSkipHint')}
        </div>
      </div>

      <TaxonomySelectorSelect
        onSelectionChange={onCountChange}
        sprites={assets.taxonomyChallengeSprites}
      />
    </div>
  );
}
