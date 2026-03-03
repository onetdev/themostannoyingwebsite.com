'use client';

import { randomInt } from '@maw/utils/math';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { TilePuzzle } from './TilePuzzle';

interface TilePuzzleChallengeProps {
  onResolved?: () => void;
}

export function TilePuzzleChallenge({ onResolved }: TilePuzzleChallengeProps) {
  const t = useTranslations();
  const {
    verification: { assets },
  } = useAppConfigContext();

  const imageSrcList = assets.tileChallenge ?? [];
  const [imageSrc] = useState(
    imageSrcList[randomInt(0, imageSrcList.length - 1)],
  );

  return (
    <>
      <div>{t('verification.captcha.tilePuzzleChallengeHint')}</div>
      <TilePuzzle
        imageSrc={imageSrc}
        onResolved={onResolved}
        cols={6}
        rows={4}
      />
    </>
  );
}
