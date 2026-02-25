'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';
import Confetti from 'react-confetti';

import { WheelAnimationWrapper } from './WheelAnimationWrapper';
import { useWheelOfFortune } from '../../hooks';

type ModalContentProps = ComponentProps<'div'>;

export function ModalContent({ className, ...rest }: ModalContentProps) {
  const t = useTranslations();
  const wof = useWheelOfFortune();

  const resultDisplay =
    wof.state === 'completed' && wof.prize
      ? t('wheelOfFortune.spinWin', { prize: wof.prize.text })
      : null;

  return (
    <div
      className={`relative flex flex-col overflow-hidden border-t pt-5 ${className}`}
      {...rest}>
      <div className="grow">
        {wof.state === 'completed' && (
          <Confetti
            className="absolute z-0 size-full"
            height={600}
            numberOfPieces={100}
            width={600}
          />
        )}

        <WheelAnimationWrapper
          highlightIndex={wof.prize?.index}
          items={wof.items}
          onAnimationComplete={wof.complete}
          state={wof.state}
        />
        <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 p-5 text-center duration-500">
          {!!resultDisplay && (
            <span className="text-xl font-bold">{resultDisplay}</span>
          )}
          {!resultDisplay && wof.state === 'ready' && (
            <Button
              variant="ghost"
              className="text-xl"
              onClick={() => wof.spin()}>
              <Icon icon="chevronRight" className="text-sm" />{' '}
              {t('wheelOfFortune.spinStart')}
              <Icon icon="chevronLeft" className="text-sm" />
            </Button>
          )}
          {!resultDisplay && wof.state === 'spinning' && (
            <span className="text-xl font-bold">🚨😱⋆˚꩜｡😱🚨</span>
          )}
        </div>
      </div>
    </div>
  );
}
