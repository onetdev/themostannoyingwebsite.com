import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';

import { cssVars } from '@/styles/theme';

import EscapingElement from './EscapingElement';

const Wrap = styled.div<{ maxHeight: number | string }>`
  position: relative;
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === 'string' ? maxHeight : `${maxHeight || 0}px`};
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`;
const Overlay = styled.div<{ isHidden: boolean }>`
  position: absolute;
  bottom: ${({ isHidden }) => (isHidden ? -500 : 0)}px;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  left: 0;
  width: 100%;
  background: ${cssVars.color.surface};
  background: linear-gradient(
    0deg,
    ${cssVars.color.background} 50%,
    transparent 100%
  );
  transition: all 0.3s ease-in-out;
`;
const PaymentButton = styled.button`
  cursor: pointer;
  background: red;
`;
const RevealButton = styled.button`
  cursor: pointer;
  font-size: 0.7rem;
`;
const SmallPrint = styled.small`
  display: block;
  font-size: 0.5rem;
  font-style: italic;
`;

type Props = {
  children: React.ReactNode;
  active?: boolean;
  initialMaxHeight: number;
  steps?: number;
};

const LockedContent = ({
  children,
  initialMaxHeight,
  steps = 200,
  active = true,
}: Props) => {
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

  return (
    <Wrap maxHeight={active ? maxHeight : 'auto'}>
      <div ref={contentRef}>{children}</div>
      <Overlay isHidden={!active || isRevealed}>
        <h1>
          You gott pay a $0.69/hour with 24 months of commitment in order to see
          the next paragraph.
        </h1>
        <EscapingElement boundingBox={{ left: 0, bottom: 0 }}>
          <PaymentButton>Pay! 100% legit and secure*</PaymentButton>
        </EscapingElement>
        <RevealButton onClick={handleRevealClick}>
          Naaah, I&apos;m good, give me free stuff
        </RevealButton>
        <SmallPrint>
          * it might not be as secure and legit but that doesn&apos;t matter
          because you can&apos;t actually pay on this website.
        </SmallPrint>
      </Overlay>
    </Wrap>
  );
};

export default LockedContent;
