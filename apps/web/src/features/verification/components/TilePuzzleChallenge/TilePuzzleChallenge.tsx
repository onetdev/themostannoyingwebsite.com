'use client';

import { randomInt } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useTilePuzzleData } from '../../hooks/useTilePuzzleData';
import { TilePuzzle } from './TilePuzzle';

interface TilePuzzleChallengeProps {
  className?: string;
  onResolved?: () => void;
}

export function TilePuzzleChallenge({
  className,
  onResolved,
}: TilePuzzleChallengeProps) {
  const t = useTranslations();
  const {
    verification: { assets },
  } = useAppConfigContext();

  const cols = 8;
  const rows = 3;

  const data = useTilePuzzleData({
    cols,
    rows,
    onResolved: () => onResolved?.(),
  });
  const imageSrcList = assets.tileChallenge ?? [];
  const [imageSrc] = useState(
    imageSrcList[randomInt(0, imageSrcList.length - 1)],
  );

  return (
    <div className={`w-full max-w-[350px] ${className}`}>
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
