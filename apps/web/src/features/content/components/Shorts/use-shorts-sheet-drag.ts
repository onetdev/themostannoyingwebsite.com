'use client';

import {
  type PointerEventHandler,
  type RefObject,
  useCallback,
  useRef,
} from 'react';

const DISMISS_THRESHOLD_PX = 120;

interface UseShortsSheetDragOptions {
  sheetRef: RefObject<HTMLElement | null>;
  onDismiss: () => void;
}

/**
 * Drag-to-dismiss for the mobile comments sheet.
 *
 * The transform is written directly to a CSS variable so pointer moves do not
 * re-render the comment tree. Desktop never renders the handle, so the same
 * hook stays idle there.
 */
export function useShortsSheetDrag({
  sheetRef,
  onDismiss,
}: UseShortsSheetDragOptions) {
  const pointerId = useRef<number | null>(null);
  const startY = useRef(0);
  const dragY = useRef(0);

  const setDrag = useCallback(
    (value: number) => {
      dragY.current = value;
      sheetRef.current?.style.setProperty('--shorts-sheet-drag', `${value}px`);
    },
    [sheetRef],
  );

  const setDragging = useCallback(
    (dragging: boolean) => {
      const sheet = sheetRef.current;
      if (!sheet) {
        return;
      }

      if (dragging) {
        sheet.dataset.dragging = 'true';
      } else {
        delete sheet.dataset.dragging;
      }
    },
    [sheetRef],
  );

  const endDrag = useCallback(() => {
    if (pointerId.current === null) {
      return;
    }

    const shouldDismiss = dragY.current >= DISMISS_THRESHOLD_PX;

    pointerId.current = null;
    setDragging(false);

    if (shouldDismiss) {
      onDismiss();
      return;
    }

    setDrag(0);
  }, [onDismiss, setDrag, setDragging]);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerId.current !== null) {
      return;
    }

    pointerId.current = event.pointerId;
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerId.current !== event.pointerId) {
      return;
    }

    setDrag(Math.max(0, event.clientY - startY.current));
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerId.current !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    endDrag();
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    if (pointerId.current !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerId.current = null;
    setDragging(false);
    setDrag(0);
  };

  return {
    handleProps: {
      onPointerCancel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
