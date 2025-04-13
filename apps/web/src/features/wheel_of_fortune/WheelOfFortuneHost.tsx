'use client';

import { FunctionComponent, useState } from 'react';

import ModalContent from './components/ModalContent';

import { DimmerOverlay, Icon } from '@maw/ui';
import { useTranslations } from 'next-intl';

const WheelOfFortuneHost: FunctionComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="fixed top-1/2 left-0 z-30">
      <DimmerOverlay
        visible={isOpen}
        onClose={() => setOpen(false)}
        closeOnClickOutside={false}
        closeOnEsc>
        {isOpen && (
          <div className="max-h-screen-dimension-min max-w-screen-dimension-min m-auto flex size-full items-center justify-center">
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
        className="animate-wiggle-8deg bg-error text-on-error -ml-8 cursor-pointer py-3 pr-6 pl-10 text-lg opacity-80 transition-all duration-200 ease-in-out hover:-ml-4 hover:opacity-100"
        onClick={() => setOpen(true)}
        aria-label={t('wheelOfFortune.title')}>
        <Icon icon="tags" size="2xl" />
      </button>
    </div>
  );
};

export default WheelOfFortuneHost;
