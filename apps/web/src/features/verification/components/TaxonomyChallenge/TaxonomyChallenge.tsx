'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useTaxonomyData } from '../../hooks/useTaxonomyData';
import { TaxonomySelector } from './TaxonomySelector';

interface TaxonomyChallengeProps {
  className?: string;
  onResolved?: () => void;
}

export function TaxonomyChallenge({
  className,
  onResolved,
}: TaxonomyChallengeProps) {
  const t = useTranslations();
  const data = useTaxonomyData({ cols: 3, rows: 3 });

  useEffect(() => {
    if (data.validCount < 9) {
      return;
    }
    onResolved?.();
  }, [data.validCount, onResolved]);

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

      <TaxonomySelector
        items={data.items}
        cols={data.cols}
        rows={data.rows}
        onSelect={data.handleSelect}
      />
    </div>
  );
}
