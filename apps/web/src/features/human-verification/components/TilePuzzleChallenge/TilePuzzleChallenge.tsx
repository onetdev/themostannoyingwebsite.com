'use client';

import { clsx } from '@maw/ui-lib/utils';
import { randomInt } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useTilePuzzleChallengeData } from '../../hooks/useTilePuzzleData';
import { TilePuzzle } from './TilePuzzle';

interface TilePuzzleChallengeProps {
  className?: string;
  onProgress: (score: number) => void;
}

export function TilePuzzleChallenge({
  className,
  onProgress,
}: TilePuzzleChallengeProps) {
  const t = useTranslations();
  const {
    verification: { assets, tilePuzzleCols: cols, tilePuzzleRows: rows },
  } = useAppConfigContext();

  const data = useTilePuzzleChallengeData({
    cols,
    rows,
    onProgress,
  });
  const imageSrcList = assets.tileChallenge ?? [];
  const [imageSrc] = useState(
    imageSrcList[randomInt(0, imageSrcList.length - 1)],
  );

  return (
    <div
      className={clsx(`w-full max-w-[350px] flex flex-col gap-3`, className)}
    >
      <div>{t('verification.captcha.tilePuzzleChallengeHint')}</div>
      <TilePuzzle
        cols={cols}
        imageSrc={imageSrc}
        items={data.items}
        onMove={data.handleMove}
        rows={rows}
      />
    </div>
  );
}
