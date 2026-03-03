'use client';

import { randomInt } from '@maw/utils/math';
import { useState } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { TilePuzzle } from './TilePuzzle';

interface TilePuzzleChallengeProps {
  onResolved?: () => void;
}

export function TitlePuzzleChallenge({ onResolved }: TilePuzzleChallengeProps) {
  const {
    verification: { assets },
  } = useAppConfigContext();

  const imageSrcList = assets.tileChallenge ?? [];
  const [imageSrc] = useState(
    imageSrcList[randomInt(0, imageSrcList.length - 1)],
  );

  return (
    <>
      <div>Move the pieces by clicking on nearby tiles next to empty space</div>
      <TilePuzzle
        imageSrc={imageSrc}
        onResolved={onResolved}
        cols={6}
        rows={4}
      />
    </>
  );
}
