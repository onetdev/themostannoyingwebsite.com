import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useState } from 'react';

import DimmerOverlay from '@/components/atoms/DimmerOverlay';

import ModalContent from './ModalContent';

const ActionButton: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 z-30">
      <DimmerOverlay
        visible={isOpen}
        onClose={() => setOpen(false)}
        closeOnClickOutside={false}
        closeOnEsc>
        <div onClick={(e) => e.stopPropagation()} hidden={!isOpen}>
          <ModalContent onClose={() => setOpen(false)} />
        </div>
      </DimmerOverlay>
      <button
        className="-ml-12 animate-wiggle-8deg cursor-pointer bg-error p-4 pr-12 text-2xl text-on-error opacity-80 transition-all duration-200 ease-in-out hover:-ml-4 hover:opacity-100"
        onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={['fas', 'tags']} />
      </button>
    </div>
  );
};

export default ActionButton;
