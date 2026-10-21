'use client';

import { Button, Icon } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';
import { useWheelOfFortune } from '../../hooks';
import { Confetti } from './Confetti';
import { WheelAnimationWrapper } from './WheelAnimationWrapper';

type ModalContentProps = ComponentProps<'div'>;

export function ModalContent({ className, ...rest }: ModalContentProps) {
  const t = useTranslations();
  const wof = useWheelOfFortune();

  const resultDisplay =
    wof.state === 'completed' && wof.prize
      ? t('marketing.wheelOfFortune.spinWin', { prize: wof.prize.text })
      : null;
  const canSpin = !resultDisplay && wof.state === 'ready';
  const isSpinning = !resultDisplay && wof.state === 'spinning';

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
            {wof.state === 'completed' && <Confetti />}

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
                {canSpin && (
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
                {isSpinning && (
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
