import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';
export type TooltipProps = PropsWithChildren<{
  text: string;
}>;

const Tooltip: FunctionComponent<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState<TooltipPosition>('top');
  const $container = useRef<HTMLSpanElement>(null);
  const $tooltip = useRef<HTMLSpanElement>(null);

  const getSpaceAround = (): Record<TooltipPosition, number> => {
    if (!$container.current) {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }

    const containerRect = $container.current.getBoundingClientRect();
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

    return {
      top: containerRect.top,
      right: viewportWidth - containerRect.right,
      bottom: viewportHeight - containerRect.bottom,
      left: containerRect.left,
    };
  };

  useEffect(() => {
    if (!visible || !$container.current || !$tooltip.current) {
      return;
    }

    const containerRect = $container.current.getBoundingClientRect();
    const tooltipRect = $tooltip.current.getBoundingClientRect();
    const space = getSpaceAround();

    const bestPosition = Object.entries(space)
      .sort(([, a], [, b]) => b - a)
      .find(([key]) => {
        if (key === 'top') return containerRect.top > tooltipRect.height;
        if (key === 'right') return space.right > tooltipRect.width;
        if (key === 'bottom') return space.bottom > tooltipRect.height;
        if (key === 'left') return containerRect.left > tooltipRect.width;
        return false;
      })?.[0];

    setPosition((bestPosition as TooltipPosition) || 'top');
  }, [visible]);

  const style = useMemo(() => {
    if (!$container.current || !$tooltip.current) return {};

    const containerRect = $container.current.getBoundingClientRect();
    const tooltipRect = $tooltip.current.getBoundingClientRect();

    switch (position) {
      case 'top':
        return {
          left: (tooltipRect.width / 2) * -1,
          bottom: containerRect.height,
          paddingBottom: 8,
        };
      case 'right':
        return {
          left: containerRect.width,
          top: ((tooltipRect.height - containerRect.height) / 2) * -1,
        };
      case 'bottom':
        return {
          left: (tooltipRect.width / 2) * -1,
          top: containerRect.height,
        };
      case 'left':
        return {
          right: containerRect.width,
          top: ((tooltipRect.height - containerRect.height) / 2) * -1,
        };
      default:
        return {};
    }
  }, [position]);

  return (
    <span
      data-position={position}
      data-visible={visible}
      className="group relative inline-block"
      tabIndex={0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      <span className="cursor-pointer" ref={$container}>
        {children}
      </span>
      {visible && (
        <span
          className="absolute z-50 w-96 group-data-[position=bottom]:pt-2 group-data-[position=left]:pr-2 group-data-[position=right]:pl-2 group-data-[position=top]:pb-2"
          style={style}>
          <span
            className="inline-block rounded-md bg-surface p-2 text-xs text-on-surface"
            ref={$tooltip}>
            {text}
          </span>
        </span>
      )}
    </span>
  );
};

export default Tooltip;
