'use client';

import { useCallback, useState } from 'react';

export type ChallengeType = 'emoji' | 'tile' | 'grid';

export type CaptchaStatus = 'idle' | 'loading' | 'challenge' | 'failed';

export interface UseCaptchaChallengeProps {
  onResolved?: () => void;
  onFailed?: () => void;
}

export function useCaptchaChallenge({
  onResolved,
  onFailed,
}: UseCaptchaChallengeProps) {
  const [status, setStatus] = useState<CaptchaStatus>('idle');
  const [challengeType, setChallengeType] = useState<ChallengeType>('emoji');
  const [clickCount, setClickCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback((clicks: number) => {
    return 100 - 100 / (clicks + 1);
  }, []);

  const pickRandomChallenge = useCallback((currentType?: ChallengeType) => {
    const types: ChallengeType[] = ['emoji', 'tile', 'grid'];
    const availableTypes = currentType
      ? types.filter((t) => t !== currentType)
      : types;
    const selected =
      availableTypes[Math.floor(Math.random() * availableTypes.length)];
    setChallengeType(selected);
  }, []);

  const handleCheckboxClick = useCallback(() => {
    if (status === 'challenge' || status === 'loading') {
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
    handleNext();
    onResolved?.();
  }, [handleNext, onResolved]);

  const handleReset = useCallback(() => {
    handleNext();
  }, [handleNext]);

  const handleDismiss = useCallback(() => {
    setStatus('failed');
    onFailed?.();
  }, [onFailed]);

  return {
    status,
    challengeType,
    progress,
    handleCheckboxClick,
    handleChallengeResolved,
    handleReset,
    handleDismiss,
  };
}
