import { useTranslation } from 'next-i18next';
import { FunctionComponent, useState } from 'react';

import ModalContent from './components/ModalContent';

import DimmerOverlay from '@/components/atoms/DimmerOverlay';
import Icon from '@/components/atoms/Icon';

const WheelOfFortuneHost: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="fixed left-0 top-1/2 z-30">
      <DimmerOverlay
        visible={isOpen}
        onClose={() => setOpen(false)}
        closeOnClickOutside={false}
        closeOnEsc>
        {isOpen && (
          <div className="m-auto flex size-full max-h-screen-dimension-min max-w-screen-dimension-min items-center justify-center">
            <ModalContent
              className="max-h-[600px] max-w-[600px] grow"
              hidden={!isOpen}
              onClick={(e) => e.stopPropagation()}
              onClose={() => setOpen(false)}
            />
          </div>
        )}
      </DimmerOverlay>
      <button
        className="-ml-8 animate-wiggle-8deg cursor-pointer bg-error py-3 pl-10 pr-6 text-lg text-on-error opacity-80 transition-all duration-200 ease-in-out hover:-ml-4 hover:opacity-100"
        onClick={() => setOpen(true)}
        aria-label={t('wheelOfFortune.title')}>
        <Icon icon="tags" size="2xl" />
      </button>
    </div>
  );
};

export default WheelOfFortuneHost;
