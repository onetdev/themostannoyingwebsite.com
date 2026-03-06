'use client';

import { clsx } from '@maw/ui-lib/utils';
import { randomInt } from '@maw/utils/random';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useTaxonomyChallengeData } from '../../hooks/useTaxonomyChallengeData';
import { TaxonomySelector } from './TaxonomySelector';

interface TaxonomyChallengeProps {
  className?: string;
  onProgress: (score: number) => void;
}

export function TaxonomyChallenge({
  className,
  onProgress,
}: TaxonomyChallengeProps) {
  const t = useTranslations();
  const data = useTaxonomyChallengeData({ cols: 3, rows: 3 });
  const prompts = t.raw(
    'humanVerification.captcha.gridSelectPrompts',
  ) as string[];
  const [target] = useState(() => prompts[randomInt(0, prompts.length - 1)]);

  useEffect(() => {
    onProgress((100 / 9) * data.validCount);
  }, [data.validCount, onProgress]);

  return (
    <div
      className={clsx(`w-full max-w-[350px] flex flex-col gap-3`, className)}
    >
      <div>
        {t.rich('humanVerification.captcha.taxonomyChallengePrompt', {
          target,
          spanTag: (chunks) => (
            <span className="font-bold leading-tight">{chunks}</span>
          ),
        })}
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
