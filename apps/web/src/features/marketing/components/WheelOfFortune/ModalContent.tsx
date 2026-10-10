'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import Confetti from 'react-confetti';
import { useWheelOfFortune } from '../../hooks';
import { WheelAnimationWrapper } from './WheelAnimationWrapper';

type ModalContentProps = ComponentProps<'div'>;

export function ModalContent({ className, ...rest }: ModalContentProps) {
  const t = useTranslations();
  const wof = useWheelOfFortune();

  const resultDisplay =
    wof.state === 'completed' && wof.prize
      ? t('marketing.wheelOfFortune.spinWin', { prize: wof.prize.text })
      : null;

  return (
    <div
      className={`relative flex flex-col overflow-hidden border-t border-border pt-5 ${className}`}
      {...rest}
    >
      <div className="grow">
        {wof.isUnavailable ? (
          <div
            role="alert"
            className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center"
          >
            <Icon icon="alertTriangle" className="text-3xl text-destructive" />
            <p className="text-lg font-semibold">
              {t('marketing.wheelOfFortune.unavailable')}
            </p>
          </div>
        ) : (
          <>
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
            <div className="bg-muted animate-in fade-in slide-in-from-bottom-4 p-5 duration-500">
              {/* Fixed min-height keeps the dialog from jumping while the
                  footer copy swaps between the button and the spin/result text. */}
              <div className="flex min-h-9 items-center justify-center text-center">
                {!!resultDisplay && (
                  <span className="text-xl font-bold leading-9">
                    {resultDisplay}
                  </span>
                )}
                {!resultDisplay && wof.state === 'ready' && (
                  <Button
                    variant="ghost"
                    className="text-xl"
                    onClick={() => wof.spin()}
                  >
                    <Icon icon="chevronRight" className="text-sm" />{' '}
                    {t('marketing.wheelOfFortune.spinStart')}
                    <Icon icon="chevronLeft" className="text-sm" />
                  </Button>
                )}
                {!resultDisplay && wof.state === 'spinning' && (
                  <span className="text-xl font-bold leading-9">
                    🚨😱⋆˚꩜｡😱🚨
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
