import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent } from 'react';

import DimmerOverlay, {
  type DimmerOverlayProps,
} from '@/components/atoms/DimmerOverlay';

type ModalProps = DimmerOverlayProps & {
  title: string;
  actions: React.ReactNode;
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
        <div className="flex flex-row justify-between border-b border-[red] px-5 py-3 text-xl">
          <h3 className="font-bold">{title}</h3>
          <button className="cursor-pointer" onClick={handleClose}>
            <FontAwesomeIcon icon={['fas', 'times']} />
          </button>
        </div>
        <div className="px-5 py-3">{children}</div>
        {actions && <div className="px-5 py-3">{actions}</div>}
      </div>
    </DimmerOverlay>
  );
};

export default Modal;
