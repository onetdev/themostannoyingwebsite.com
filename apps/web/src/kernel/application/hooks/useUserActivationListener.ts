'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { useRuntimeStore } from '@/kernel';

/**
 * User action event listener to detect what featureset is available for the
 * application.
 */
export const useUserActivationListener = () => {
  const storeState = useRuntimeStore((state) => state.userActivation);
  const setUserActivation = useRuntimeStore((state) => state.setUserActivation);
  const [state, setState] = useState(storeState);

  useDebounce(() => setUserActivation(state), 50, [state]);

  useEffect(() => {
    // See: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/User_activation
    const unlockEvents = [
      'keydown',
      'mousedown',
      'pointerdown',
      'pointerup',
      'touchend',
    ];

    // These do not unlock features BUT considered user interactivity.
    const interactivityEvents = [
      'scroll',
      'mousemove',
      'keypress', // This would only work if it had output a char, so low reliability
    ];

    const events = [...unlockEvents, ...interactivityEvents];

    const handleInteraction = (e: Event) => {
      setState((previousState) => ({
        ...previousState,
        unlocked: previousState.unlocked || unlockEvents.includes(e.type),
        lastEventAt: new Date().getTime(),
      }));
    };

    events.forEach((event) => {
      window.addEventListener(event, handleInteraction);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);
};
