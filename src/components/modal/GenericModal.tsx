import { ReactNode, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';

import { cssVars } from '@/styles/theme';

export type GenericModalProps = {
  children: ReactNode;
  show: boolean;
  onClose?: () => void;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
};

const Dimmer = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${cssVars.color.dimmer};
  padding: ${cssVars.spacing.gap2x} ${cssVars.spacing.gap};
  justify-content: center;
  align-items: center;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  &.modal-show {
    opacity: 1;
    visibility: visible;
  }
  &.modal-hide {
    opacity: 0;
    visibility: hidden;
  }
`;

/**
 * Provides a modal window that can be used to display any type of content.
 * Please note that unlike ActionModal, you'll have to prevent click propagation
 * when using clickOutside.
 */
const GenericModal = ({
  children,
  show,
  onClose,
  closeOnEsc = true,
  closeOnClickOutside = true,
}: GenericModalProps) => {
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
    <Dimmer
      className={show ? 'modal-show' : 'modal-hide'}
      onClick={() => closeOnClickOutside && onClose?.()}>
      {children}
    </Dimmer>
  );
};

export default GenericModal;
