'use client';

import { useCallback, useState } from 'react';

export type ChallengeType = 'emoji' | 'tile' | 'grid';

export type CaptchaStatus = 'idle' | 'loading' | 'challenge';

export interface UseCaptchaChallengeProps {
  onResolved?: () => void;
  gridSelectPrompts: string[];
  captchaRandom: string[];
}

export function useCaptchaChallenge({
  onResolved,
  gridSelectPrompts,
  captchaRandom,
}: UseCaptchaChallengeProps) {
  const [status, setStatus] = useState<CaptchaStatus>('idle');
  const [challengeType, setChallengeType] = useState<ChallengeType>('emoji');
  const [gridPrompt, setGridPrompt] = useState('');
  const [gridImage, setGridImage] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback((clicks: number) => {
    // 100 - (100 / (clicks + 1)) will never reach 100
    // 0: 0%
    // 1: 50%
    // 2: 66.6%
    // 3: 75%
    // 10: 90.9%
    // 100: 99.01%
    return 100 - 100 / (clicks + 1);
  }, []);

  const pickRandomChallenge = useCallback(
    (currentType?: ChallengeType) => {
      const types: ChallengeType[] = ['emoji', 'tile', 'grid'];
      const availableTypes = currentType
        ? types.filter((t) => t !== currentType)
        : types;
      const selected =
        availableTypes[Math.floor(Math.random() * availableTypes.length)];
      setChallengeType(selected);

      if (selected === 'grid') {
        const prompt =
          gridSelectPrompts[
            Math.floor(Math.random() * gridSelectPrompts.length)
          ];
        const image =
          captchaRandom[Math.floor(Math.random() * captchaRandom.length)];
        setGridPrompt(prompt);
        setGridImage(image);
      }
    },
    [gridSelectPrompts, captchaRandom],
  );

  const handleCheckboxClick = useCallback(() => {
    if (status !== 'idle') {
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      pickRandomChallenge();
      setStatus('challenge');
    }, 2000);
  }, [status, pickRandomChallenge]);

  const handleNext = useCallback(() => {
    const nextClickCount = clickCount + 1;
    setClickCount(nextClickCount);
    setProgress(calculateProgress(nextClickCount));
    pickRandomChallenge(challengeType);
  }, [clickCount, challengeType, pickRandomChallenge, calculateProgress]);

  const handleChallengeResolved = useCallback(() => {
    // In this annoying website, resolving a challenge just gives you another one
    handleNext();
    onResolved?.();
  }, [handleNext, onResolved]);

  const handleReset = useCallback(() => {
    handleNext();
  }, [handleNext]);

  return {
    status,
    challengeType,
    gridPrompt,
    gridImage,
    progress,
    handleCheckboxClick,
    handleChallengeResolved,
    handleReset,
  };
}
