'use client';

import { mapToLogScale, randomInt } from '@maw/utils/math';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import type { ChallengeType } from '../schemas';

export interface UseCaptchaChallengeProps {
  onResolved?: () => void;
  onFailed?: () => void;
}

interface State {
  challengeType?: ChallengeType;
  currentChallengeScore?: number;
  totalSkipped: number;
  totalVerified: number;
}

type Action =
  | { type: 'START_CHALLENGE'; nextChallengeType: ChallengeType }
  | {
      type: 'CHALLENGE_SCORE_UPDATE';
      score: number;
    }
  | { type: 'CHALLENGE_SKIP'; nextChallengeType: ChallengeType }
  | { type: 'CHALLENGE_VERIFY'; nextChallengeType: ChallengeType }
  | { type: 'RESET'; nextChallengeType: ChallengeType }
  | { type: 'FAIL' };

/**
 * Picks a random challenge type, optionally avoiding the current one.
 */
const getRandomChallenge = (
  allowedChallenges: ChallengeType[],
  currentType?: ChallengeType,
): ChallengeType => {
  const availableTypes = currentType
    ? allowedChallenges.filter((t) => t !== currentType)
    : allowedChallenges;
  const randomIndex = randomInt(0, availableTypes.length - 1);
  return availableTypes[randomIndex];
};

const initialState: State = {
  totalSkipped: 0,
  totalVerified: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHALLENGE_SCORE_UPDATE':
      return {
        ...state,
        currentChallengeScore: action.score,
      };
    case 'CHALLENGE_VERIFY':
    case 'CHALLENGE_SKIP': {
      const isSkip = Math.floor(state.currentChallengeScore ?? 0) === 0;
      return {
        ...state,
        challengeType: action.nextChallengeType,
        currentChallengeScore: 0,
        totalSkipped: state.totalSkipped + (isSkip ? 1 : 0),
        totalVerified: state.totalVerified + (isSkip ? 0 : 1),
      };
    }
    case 'START_CHALLENGE':
    case 'RESET':
      return {
        ...state,
        challengeType: action.nextChallengeType,
        currentChallengeScore: 0,
        totalSkipped: 0,
        totalVerified: 0,
      };
    case 'FAIL':
      return {
        ...state,
      };
    default:
      return state;
  }
}

/**
 * Hook to manage the state of the captcha challenge.
 * Designed to be as annoying as possible by never reaching 100% progress
 * and constantly switching challenge types.
 */
export function useCaptchaChallenge({
  onResolved,
  onFailed,
}: UseCaptchaChallengeProps) {
  const {
    verification: { allowedChallenges, requiredCompletedChallanges },
  } = useAppConfigContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount to prevent state updates on unmounted component
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleStart = useCallback(() => {
    dispatch({
      type: 'START_CHALLENGE',
      nextChallengeType: getRandomChallenge(allowedChallenges),
    });
  }, [allowedChallenges]);

  /**
   * Advances the challenge to the next type and increments progress.
   * Also triggers the onResolved callback.
   */
  const handleChallengeScoreUpdate = useCallback((score: number) => {
    dispatch({
      type: 'CHALLENGE_SCORE_UPDATE',
      score,
    });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({
      type: 'RESET',
      nextChallengeType: getRandomChallenge(allowedChallenges),
    });
  }, [allowedChallenges]);

  const handleDismiss = useCallback(() => {
    dispatch({ type: 'FAIL' });
    onFailed?.();
  }, [onFailed]);

  const handleVerify = useCallback(() => {
    dispatch({
      type: 'CHALLENGE_VERIFY',
      nextChallengeType: getRandomChallenge(
        allowedChallenges,
        state.challengeType,
      ),
    });
  }, [allowedChallenges, state.challengeType]);

  const handleSkip = useCallback(() => {
    dispatch({
      type: 'CHALLENGE_SKIP',
      nextChallengeType: getRandomChallenge(
        allowedChallenges,
        state.challengeType,
      ),
    });
  }, [state.challengeType, allowedChallenges]);

  useEffect(() => {
    if (state.totalVerified >= requiredCompletedChallanges) {
      onResolved?.();
    }
  }, [onResolved, requiredCompletedChallanges, state.totalVerified]);

  return {
    challengeType: state.challengeType,
    completion: state.totalVerified
      ? mapToLogScale(state.totalVerified, requiredCompletedChallanges, 1)
      : 0,
    currentChallengeScore: state.currentChallengeScore ?? 0,
    handleChallengeScoreUpdate,
    handleDismiss,
    handleReset,
    handleSkip,
    handleStart,
    handleVerify,
    totalSkipped: state.totalSkipped,
    totalVerified: state.totalVerified,
  };
}
