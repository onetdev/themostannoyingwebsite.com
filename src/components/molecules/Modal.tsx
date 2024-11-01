import React, { FunctionComponent } from 'react';

import DimmerOverlay, {
  type DimmerOverlayProps,
} from '@/components/atoms/DimmerOverlay';
import Icon from '@/components/atoms/Icon';

export type ModalProps = DimmerOverlayProps & {
  title: string;
  actions?: React.ReactNode;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  children,
  onClose: handleClose,
  actions,
  ...rest
}) => {
  return (
    <DimmerOverlay {...rest} onClose={handleClose}>
      <div
        className="mx-auto flex max-h-full min-w-clamp-400 max-w-full flex-col self-center rounded-lg bg-background"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row justify-between border-b border-hr-surface px-5 py-3 text-xl">
          <h4>{title}</h4>
          <button className="cursor-pointer" onClick={handleClose}>
            <Icon icon="close" size="lg" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {actions && (
          <div className="border-t border-hr-surface px-5 py-4">{actions}</div>
        )}
      </div>
    </DimmerOverlay>
  );
};

export default Modal;
