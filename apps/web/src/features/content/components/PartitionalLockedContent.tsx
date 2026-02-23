'use client';

import { Button } from '@maw/ui-lib';
import { formatCurrency } from '@maw/utils/formatter';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren, useMemo, useRef, useState } from 'react';

export type PartitionalLockedContentProps = Omit<
  JSXProxyProps<'div'>,
  'styles'
> &
  PropsWithChildren<{
    active?: boolean;
    initialMaxHeight: number;
    steps?: number;
  }>;

export function PartitionalLockedContent({
  children,
  initialMaxHeight,
  steps = 200,
  active = true,
  className,
  ...rest
}: PartitionalLockedContentProps) {
  const t = useTranslations();
  const [maxHeight, setMaxHeight] = useState(initialMaxHeight);
  const [isRevealed, setRevealed] = useState(false);
  const [flipActions, setFlipActions] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extends the max-height of the content until there's content to reveal
  const handleRevealClick = () => {
    const newMaxHeight = maxHeight + steps;
    if (contentRef.current && newMaxHeight > contentRef.current.clientHeight) {
      setRevealed(true);
    }
    setMaxHeight(newMaxHeight);
  };

  const wrapperStyles = useMemo(() => {
    if (!active || isRevealed) {
      return {};
    }

    return {
      maxHeight: active && !isRevealed ? `${maxHeight}px` : 'auto',
    };
  }, [active, maxHeight, isRevealed]);

  const renderButtons = () => {
    const buttons = [
      <Button
        className="flex-1"
        data-testid="paywall-overlay-confirm"
        key="cta"
        onMouseEnter={() => setFlipActions((prev) => !prev)}
        size="sm">
        {t('paywall.overlay.confirm')}*
      </Button>,
      <Button
        className="flex-1"
        data-testid="paywall-overlay-cancel"
        key="cancel"
        onClick={handleRevealClick}
        size="lg"
        variant="secondary">
        {t('paywall.overlay.cancel')}
      </Button>,
    ];

    return <>{flipActions ? buttons : buttons.reverse()}</>;
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={wrapperStyles}
      {...rest}>
      <div ref={contentRef}>{children}</div>
      <div
        data-hidden={!active || isRevealed ? 'true' : 'false'}
        className="bg-bottom-fadeout absolute left-0 w-full opacity-0 transition-all duration-300 ease-in-out data-[hidden=false]:bottom-0 data-[hidden=false]:opacity-100">
        <div className="mx-auto w-full max-w-screen-md pt-16">
          <h3 className="mb-4">
            {t('paywall.overlay.title', {
              price: formatCurrency(0.69),
            })}
          </h3>
          <div className="my-3 flex gap-2">{renderButtons()}</div>
          <div className="block text-xs italic">
            * {t('paywall.overlay.disclaimer')}
          </div>
        </div>
      </div>
    </div>
  );
}
