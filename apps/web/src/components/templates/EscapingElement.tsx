import React, {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';

import { getRelativePosition } from '@/root/apps/web/src/lib/utils/dom';
import { clamp, random } from '@/root/apps/web/src/lib/utils/math';

type EscapingElementProps = PropsWithChildren<{
  trigger?: 'hover' | 'activationStart';
  /**
   * Maximum distance the element can move in a certain direction.
   * By default the limit is half of the element's dimension on a given axes.
   */
  boundingBox?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}>;

const EscapingElement: FunctionComponent<EscapingElementProps> = ({
  trigger = 'hover',
  children,
  boundingBox,
}) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const updatePaymentButtonPosition = (_x: number, _y: number) => {
    const width = ref.current?.clientWidth || 0;
    const height = ref.current?.clientHeight || 0;
    setPosition({
      left: clamp(
        random(width / -2, width + width / 2),
        boundingBox?.left || -Infinity,
        boundingBox?.right || Infinity,
      ),
      top: clamp(
        random(height / -2, height + height / 2),
        boundingBox?.top || -Infinity,
        boundingBox?.bottom || Infinity,
      ),
    });
  };

  const onMouseEvent: MouseEventHandler<HTMLDivElement> = (e) => {
    const position = getRelativePosition(document.body, e.currentTarget);
    updatePaymentButtonPosition(e.clientX - position.x, e.clientY - position.y);
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (trigger !== 'hover') {
      return;
    }
    onMouseEvent(e);
  };

  const onActivationStart: MouseEventHandler<HTMLDivElement> = (e) => {
    if (trigger !== 'activationStart') {
      return;
    }
    onMouseEvent(e);
  };

  return (
    <div
      className={`inline-block transition-transform duration-100`}
      style={{
        transform: `translate(${position.left || 0}px, ${position.top || 0}px)`,
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onActivationStart}
      ref={ref}>
      {children}
    </div>
  );
};

export default EscapingElement;
