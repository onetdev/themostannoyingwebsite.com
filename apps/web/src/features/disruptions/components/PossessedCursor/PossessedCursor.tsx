'use client';

import { randomInt, randomNumber } from '@maw/utils/random';
import { AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { emit } from '@/core/events/event-bus';
import { useAppConfigContext } from '@/core/react';
import { usePainPreferencesStore, useRuntimeStore } from '@/stores';
import type { CursorPreset } from '../../schemas';
import {
  buildGhostPath,
  getCursorCssValue,
  type NormalizedPoint,
  pickInitialCursor,
  pickNextCursor,
  smoothGhostPath,
} from '../../utils';
import { CaughtPuff } from './CaughtPuff';
import { GhostCursor } from './GhostCursor';

interface ActiveGhost {
  id: number;
  cursorId: string;
  preset: CursorPreset;
  points: NormalizedPoint[];
  lifetimeSeconds: number;
}

interface ActivePuff {
  id: number;
  point: NormalizedPoint;
}

const clampNormalized = (value: number): number =>
  Math.min(0.97, Math.max(0.03, value));

export function PossessedCursor() {
  const isEnabled = usePainPreferencesStore(
    (state) => state.flags.possessedCursor,
  );
  const isTouch = useRuntimeStore((state) => state.isTouch);
  const isVisible = useRuntimeStore((state) => state.document.isVisible);
  const { possessedCursor } = useAppConfigContext().disruptions;
  const {
    cursors,
    firstSwapDelaySeconds,
    swapDelaySeconds,
    ghostLifetimeSeconds,
    maxGhosts,
    ghostPathSteps,
  } = possessedCursor;

  const [current, setCurrent] = useState<CursorPreset | null>(null);
  const [ghosts, setGhosts] = useState<ActiveGhost[]>([]);
  const [puffs, setPuffs] = useState<ActivePuff[]>([]);
  const pointerRef = useRef<NormalizedPoint | undefined>(undefined);
  const hasSwappedRef = useRef(false);
  const ghostIdRef = useRef(0);
  const puffIdRef = useRef(0);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEnabled) {
      setCurrent(null);
      setGhosts([]);
      setPuffs([]);
      hasSwappedRef.current = false;
      return;
    }

    setCurrent(pickInitialCursor(cursors));
    setGhosts([]);
    setPuffs([]);
    hasSwappedRef.current = false;
  }, [isEnabled, cursors]);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      pointerRef.current = {
        x: clampNormalized(event.clientX / window.innerWidth),
        y: clampNormalized(event.clientY / window.innerHeight),
      };
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerdown', handlePointer, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerdown', handlePointer);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || !current || !isVisible) {
      return;
    }

    const delayRange = hasSwappedRef.current
      ? swapDelaySeconds
      : firstSwapDelaySeconds;
    const delaySeconds = randomNumber(delayRange.min, delayRange.max);

    const timer = setTimeout(() => {
      hasSwappedRef.current = true;
      const next = pickNextCursor(cursors, current.id);

      if (!next) {
        return;
      }

      const start = pointerRef.current ?? {
        x: randomNumber(0.2, 0.8),
        y: randomNumber(0.2, 0.8),
      };
      const ghost: ActiveGhost = {
        id: ghostIdRef.current++,
        cursorId: current.id,
        preset: current,
        points: smoothGhostPath(
          buildGhostPath({
            start,
            steps: randomInt(ghostPathSteps.min, ghostPathSteps.max),
          }),
        ),
        lifetimeSeconds: randomNumber(
          ghostLifetimeSeconds.min,
          ghostLifetimeSeconds.max,
        ),
      };

      setGhosts((previous) => [...previous, ghost].slice(-maxGhosts));
      setCurrent(next);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [
    cursors,
    current,
    firstSwapDelaySeconds,
    ghostLifetimeSeconds,
    ghostPathSteps.max,
    ghostPathSteps.min,
    isEnabled,
    isVisible,
    maxGhosts,
    swapDelaySeconds,
  ]);

  useEffect(() => {
    if (!isEnabled || !current || isTouch) {
      return;
    }

    const root = document.documentElement;
    root.dataset.possessedCursor = 'true';
    root.style.setProperty('--possessed-cursor', getCursorCssValue(current));

    return () => {
      delete root.dataset.possessedCursor;
      root.style.removeProperty('--possessed-cursor');
    };
  }, [current, isEnabled, isTouch]);

  const handleGhostExpire = useCallback((id: number) => {
    setGhosts((previous) => previous.filter((ghost) => ghost.id !== id));
  }, []);

  const handlePuffDone = useCallback((id: number) => {
    setPuffs((previous) => previous.filter((puff) => puff.id !== id));
  }, []);

  useEffect(() => {
    if (!isEnabled || ghosts.length === 0) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const elements =
        layerRef.current?.querySelectorAll<HTMLElement>('[data-ghost-id]');

      if (!elements) {
        return;
      }

      for (const element of elements) {
        const bounds = element.getBoundingClientRect();
        const isInside =
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom;

        if (!isInside) {
          continue;
        }

        const ghostId = Number(element.dataset.ghostId);
        const caughtGhost = ghosts.find((ghost) => ghost.id === ghostId);

        if (!caughtGhost) {
          continue;
        }

        emit('possessed-cursor:caught', {
          cursorId: caughtGhost.cursorId,
        });

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        setPuffs((previous) => [
          ...previous,
          {
            id: puffIdRef.current++,
            point: {
              x: clampNormalized(centerX / window.innerWidth),
              y: clampNormalized(centerY / window.innerHeight),
            },
          },
        ]);

        setGhosts((previous) =>
          previous.filter((ghost) => ghost.id !== caughtGhost.id),
        );
        break;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, {
      capture: true,
    });
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, {
        capture: true,
      });
  }, [ghosts, isEnabled]);

  return (
    <div
      ref={layerRef}
      data-testid="possessed-cursor-layer"
      className="pointer-events-none fixed inset-0 z-9998 overflow-hidden"
      aria-hidden
    >
      <AnimatePresence>
        {ghosts.map((ghost) => (
          <GhostCursor
            key={ghost.id}
            id={ghost.id}
            preset={ghost.preset}
            points={ghost.points}
            lifetimeSeconds={ghost.lifetimeSeconds}
            onExpire={handleGhostExpire}
          />
        ))}
      </AnimatePresence>
      {puffs.map((puff) => (
        <CaughtPuff
          key={puff.id}
          id={puff.id}
          point={puff.point}
          onDone={handlePuffDone}
        />
      ))}
    </div>
  );
}
