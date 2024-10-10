import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Measured } from '@/utils/elements';

type MarqueeProps = PropsWithChildren<{
  className?: string;
  pixelPerSeconds?: number;
}>;

const Marquee: FunctionComponent<MarqueeProps> = ({
  children,
  className,
  pixelPerSeconds = 10,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemsWidth, setItemsWidth] = useState(0);

  const fitMultiplier =
    containerWidth > 0 && itemsWidth > 0
      ? Math.ceil(containerWidth / itemsWidth)
      : 0;

  const durationMs = itemsWidth > 0 ? (itemsWidth / pixelPerSeconds) * 1000 : 0;

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setContainerWidth(containerRef.current.clientWidth);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        className="animate-marQueeLeft whitespace-nowrap"
        style={{
          width: itemsWidth * fitMultiplier,
          animationDuration: durationMs + 'ms',
        }}>
        <Measured
          mode={itemsWidth > 0 ? 'render' : 'both'}
          onMeasure={({ width }) => setItemsWidth(width)}>
          {children}
        </Measured>
      </div>
    </div>
  );
};

export default Marquee;
