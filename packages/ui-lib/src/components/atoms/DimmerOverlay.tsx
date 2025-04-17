'use client';

import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
} from 'react';

export type DimmerOverlayProps = PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
}>;

/**
 * Provides a modal window that can be used to display any type of content.
 * Please note that unlike ActionModal, you'll have to prevent click propagation
 * when using clickOutside.
 */
export const DimmerOverlay: FunctionComponent<DimmerOverlayProps> = ({
  children,
  visible,
  onClose,
  closeOnEsc = true,
  closeOnClickOutside = true,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!closeOnEsc || e.key !== 'Escape') return;
      onClose?.();
    },
    [closeOnEsc, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      data-visible={visible.toString()}
      className="bg-dimmer transition-visibility-opacity invisible fixed top-0 left-0 z-50 flex size-full px-2 py-1 opacity-0 backdrop-blur-md duration-300 data-[visible=true]:visible data-[visible=true]:opacity-100"
      onClick={() => closeOnClickOutside && onClose?.()}>
      {children}
    </div>
  );
};
