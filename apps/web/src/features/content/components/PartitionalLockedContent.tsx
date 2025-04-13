'use client';

import { Button } from '@maw/ui-lib';
import { useTranslations } from 'next-intl';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type PartitionalLockedContentProps = Omit<JSXProxyProps<'div'>, 'styles'> &
  PropsWithChildren<{
    active?: boolean;
    childVisibilityStep?: number;
    initialMaxHeight?: number;
    initialVisibleCount?: number;
    wrapperClassName?: string;
  }>;

export const PartitionalLockedContent: FunctionComponent<
  PartitionalLockedContentProps
> = ({
  children,
  active = true,
  childVisibilityStep = 2,
  className,
  initialMaxHeight = 400,
  initialVisibleCount = 3,
  wrapperClassName = '',
  ...rest
}) => {
  const [totalItemCount, setTotalItemCount] = useState(Infinity);
  const [state, setState] = useState({
    visibleChildren: initialVisibleCount,
    maxHeight: initialMaxHeight,
  });
  const [isRevealed, setRevealed] = useState(
    initialVisibleCount >= totalItemCount ? true : false,
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Extends the max-height of the content until there's content to reveal
  const handleRevealClick = () => {
    const fullPool = Array.from(contentRef.current?.children || []);
    const newVisibleCount = state.visibleChildren + childVisibilityStep;
    const newAdditionalHeight = fullPool
      .slice(state.visibleChildren, newVisibleCount)
      .reduce((acc, item) => acc + item.clientHeight, 0);
    const newMaxHeight = state.maxHeight + newAdditionalHeight;

    setState({
      visibleChildren: newVisibleCount,
      maxHeight: newMaxHeight,
    });
  };

  useEffect(() => {
    const len = Array.from(contentRef.current?.children || []).length;
    setTotalItemCount(len);

    if (len <= state.visibleChildren) {
      setRevealed(true);
    }
  }, [state.visibleChildren]);

  // TODO: Recalculate max height once screen is resized.

  const wrapperStyles = useMemo(() => {
    if (!active || isRevealed) {
      return {};
    }

    return {
      maxHeight: active && !isRevealed ? `${state.maxHeight}px` : 'auto',
    };
  }, [active, isRevealed, state.maxHeight]);

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={wrapperStyles}
      {...rest}>
      <div ref={contentRef} className={wrapperClassName}>
        {children}
      </div>
      <LockerOverlay
        hidden={!active || isRevealed}
        onReveal={handleRevealClick}
      />
    </div>
  );
};

const LockerOverlay = ({
  hidden,
  onReveal,
}: {
  hidden: boolean;
  onReveal: () => void;
}) => {
  const t = useTranslations();
  const [flipActions, setFlipActions] = useState(false);

  const renderButtons = () => {
    const buttons = [
      <Button
        variant="primary"
        className="flex-1"
        key="cta"
        size="md"
        data-testid="paywall-overlay-confirm"
        onMouseEnter={() => setFlipActions((prev) => !prev)}>
        {t('paywall.overlay.confirm')}*
      </Button>,
      <Button
        variant="secondary"
        className="flex-1"
        onClick={onReveal}
        size="md"
        data-testid="paywall-overlay-cancel"
        key="cancel">
        {t('paywall.overlay.cancel')}
      </Button>,
    ];

    return <>{flipActions ? buttons : buttons.reverse()}</>;
  };

  return (
    <div
      data-hidden={hidden.toString()}
      className="bg-bottom-fadeout absolute left-0 w-full opacity-0 transition-all duration-300 ease-in-out data-[hidden=false]:bottom-0 data-[hidden=false]:opacity-100">
      <div className="mx-auto w-full max-w-screen-md pt-16">
        <h3 className="mb-4">{t('paywall.overlay.title')}</h3>
        <div className="my-3 flex gap-2">{renderButtons()}</div>
        <div className="block text-xs italic">
          * {t('paywall.overlay.disclaimer')}
        </div>
      </div>
    </div>
  );
};
