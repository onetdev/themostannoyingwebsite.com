import React, { FunctionComponent } from 'react';

import { DimmerOverlay, type DimmerOverlayProps } from '../atoms/DimmerOverlay';
import { Icon } from '../atoms/Icon';

export type ModalProps = DimmerOverlayProps & {
  title: string;
  actions?: React.ReactNode;
};

export const Modal: FunctionComponent<ModalProps> = ({
  title,
  children,
  onClose: handleClose,
  actions,
  ...rest
}) => {
  return (
    <DimmerOverlay {...rest} onClose={handleClose}>
      <div
        className="min-w-clamp-400 bg-background mx-auto flex max-h-full max-w-full flex-col self-center rounded-lg"
        onClick={(e) => e.stopPropagation()}>
        <div className="border-hr-surface flex flex-row justify-between border-b px-5 py-3 text-xl">
          <h4>{title}</h4>
          <button className="cursor-pointer" onClick={handleClose}>
            <Icon icon="close" size="lg" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {actions && (
          <div className="border-hr-surface border-t px-5 py-4">{actions}</div>
        )}
      </div>
    </DimmerOverlay>
  );
};
