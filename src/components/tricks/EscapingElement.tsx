import React, { MouseEventHandler, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { getRelativePosition } from '@/utils/dom';
import { clamp, random } from '@/utils/math';

type Props = {
  children: React.ReactNode;
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
};

const Wrap = styled.div<{ left: number; top: number }>`
  display: inline-block;
  transform: ${(props) =>
    `translate(${props.left || 0}px, ${props.top || 0}px)`};
  transition: transform 0.1s ease-in-out;
`;

const EscapingElement = ({ children, boundingBox }: Props) => {
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

  return (
    <Wrap
      onMouseMove={onMouseEvent}
      onClick={onMouseEvent}
      left={position.left}
      top={position.top}
      ref={ref}>
      {children}
    </Wrap>
  );
};

export default EscapingElement;
