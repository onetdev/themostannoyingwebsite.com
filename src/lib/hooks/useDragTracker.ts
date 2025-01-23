import { RefObject, useCallback, useEffect, useState } from 'react';

import { isPointWithinElement } from '@/lib/utils/dom';
import { getPointDistance, Point2d } from '@/lib/utils/math';

type TimedPoint = Point2d & { t: Date };
export type DragTrackerState = {
  isActive: boolean;
  isWithin: boolean;
  velocity: number | null;
  entry: TimedPoint | null;
  history: TimedPoint[];
};

/**
 * Allows you to capture the mouse position and velocity if a user holds
 * down the mouse button and moves it around.
 * Please be aware that the state can change rapidly if the user is dragging
 * around the screen quickly.
 */
const useDragTracker = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  limit: number = 5,
) => {
  const [state, setState] = useState<DragTrackerState>({
    isActive: false,
    isWithin: false,
    velocity: null,
    entry: null,
    history: [],
  });

  const timedClientPoint = (e: MouseEvent): TimedPoint => ({
    x: e.clientX,
    y: e.clientY,
    t: new Date(),
  });

  const onMouseDown = useCallback((e: MouseEvent) => {
    setState({
      isActive: true,
      isWithin: true,
      velocity: null,
      entry: timedClientPoint(e),
      history: [],
    });
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!state.isActive || !state.entry || ref?.current === null) return;
      const current = timedClientPoint(e);
      const reference = state.history[0] ?? { ...current };
      const interval = current.t.getTime() - reference.t.getTime();
      const dist = getPointDistance(reference, current);
      const velocity = Math.sqrt(dist.x ^ (2 + dist.y) ^ 2) / interval;
      setState({
        ...state,
        isWithin: isPointWithinElement(ref.current, current),
        history: [...state.history, current].slice(-limit),
        velocity: velocity > 0 ? velocity : null,
      });
    },
    [limit, ref, state],
  );

  const onMouseUp = () => {
    setState({
      isActive: false,
      isWithin: false,
      velocity: null,
      entry: null,
      history: [],
    });
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    element.addEventListener('mousedown', onMouseDown);

    return () => {
      element.removeEventListener('mousedown', onMouseDown);
    };
  }, [onMouseDown, ref, state]);

  // Registering move and up events on the document will allow drag tracking
  // outside of the bounds of the element.
  useEffect(() => {
    if (!ref.current || !state.isActive) {
      return;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, ref, state]);

  return state;
};

export default useDragTracker;
