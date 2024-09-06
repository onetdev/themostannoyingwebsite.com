import { useTranslation } from 'next-i18next';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button from '@/components/atoms/Button';
import EscapingElement from '@/components/templates/EscapingElement';

type PartitionalLockedContentProps = Omit<JSXProxyProps<'div'>, 'styles'> &
  PropsWithChildren<{
    active?: boolean;
    initialMaxHeight: number;
    steps?: number;
  }>;

const PartitionalLockedContent: FunctionComponent<
  PartitionalLockedContentProps
> = ({
  children,
  initialMaxHeight,
  steps = 200,
  active = true,
  className,
  ...rest
}) => {
  const { t } = useTranslation(['contentLimiter']);
  const [maxHeight, setMaxHeight] = useState(initialMaxHeight);
  const [isRevealed, setIsRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Extends the max-height of the content until there's content to reveal
  const handleRevealClick = () => {
    const newMaxHeight = maxHeight + steps;
    if (contentRef.current && newMaxHeight > contentRef.current.clientHeight) {
      setIsRevealed(true);
    }
    setMaxHeight(newMaxHeight);
  };

  const wrapperStyles = useMemo(
    () => ({
      maxHeight: active ? `${maxHeight}px` : 'auto',
    }),
    [active, maxHeight],
  );

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={wrapperStyles}
      {...rest}>
      <div ref={contentRef}>{children}</div>
      <div
        data-hidden={!active || isRevealed ? 'true' : 'false'}
        className="absolute bottom-[-500px] left-0 w-full bg-bottom-fadeout opacity-0 transition-all duration-300 ease-in-out data-[hidden=false]:bottom-0 data-[hidden=false]:opacity-100">
        <h1>{t('partitional.title')}</h1>
        <EscapingElement boundingBox={{ left: 0, bottom: 0 }} trigger="hover">
          <Button variant="primary">
            {t('contentLimiter:partitional.cta')}*
          </Button>
        </EscapingElement>
        <Button variant="secondary" onClick={handleRevealClick}>
          {t('contentLimiter:partitional.cancel')}
        </Button>
        <div className="block text-xs italic">
          * {t('contentLimiter:partitional.disclaimer')}
        </div>
      </div>
    </div>
  );
};

export default PartitionalLockedContent;
