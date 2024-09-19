import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ElementMeasurements, MeasuredMulti } from '@/utils/elements';

type MarqueeProps = {
  className?: string;
  items: ReactNode[];
  pixelPerSeconds?: number;
};

const Marquee: FunctionComponent<MarqueeProps> = ({
  items,
  className,
  pixelPerSeconds = 10,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemsWidth, setItemsWidth] = useState(0);

  const fitMultiplier = useMemo(
    () =>
      containerWidth > 0 && itemsWidth > 0
        ? Math.ceil(containerWidth / itemsWidth)
        : 0,
    [containerWidth, itemsWidth],
  );

  const renderItems = useMemo(
    () =>
      Array(fitMultiplier > 0 ? fitMultiplier * 2 : 1)
        .fill(items)
        .flat(),
    [fitMultiplier, items],
  );

  const durationMs = useMemo(
    () => (itemsWidth > 0 ? (itemsWidth / pixelPerSeconds) * 1000 : 0),
    [itemsWidth, pixelPerSeconds],
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setContainerWidth(containerRef.current.clientWidth);
  }, []);

  const onMeasured = (itemDims: ElementMeasurements[]) => {
    setItemsWidth(itemDims.reduce((acc, { width }) => acc + width, 0));
  };

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        className="animate-marQueeLeft whitespace-nowrap"
        style={{
          width: itemsWidth * fitMultiplier,
          animationDuration: durationMs + 'ms',
        }}>
        <MeasuredMulti
          mode={itemsWidth > 0 ? 'render' : 'both'}
          items={renderItems}
          onMeasure={onMeasured}
          measureTrigger="all"
        />
      </div>
    </div>
  );
};

export default Marquee;
