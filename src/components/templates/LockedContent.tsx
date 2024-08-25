import React, {
  FunctionComponent,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';

import EscapingElement from './EscapingElement';

type Props = PropsWithChildren<{
  active?: boolean;
  initialMaxHeight: number;
  steps?: number;
}>;

const LockedContent: FunctionComponent<Props> = ({
  children,
  initialMaxHeight,
  steps = 200,
  active = true,
}) => {
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
    <div
      className="relative overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: active ? `${maxHeight}px` : 'auto' }}>
      <div ref={contentRef}>{children}</div>
      <div
        data-hidden={!active || isRevealed ? 'true' : 'false'}
        className="absolute bottom-[-500px] left-0 w-full bg-bottom-fadeout opacity-0 transition-all duration-300 ease-in-out data-[hidden=false]:bottom-0 data-[hidden=false]:opacity-100">
        <h1>
          You gott pay a $0.69/hour with 24 months of commitment in order to see
          the next paragraph.
        </h1>
        <EscapingElement boundingBox={{ left: 0, bottom: 0 }}>
          <div className="cursor-pointer bg-[red]">
            Pay! 100% legit and secure*
          </div>
        </EscapingElement>
        <div className="cursor-pointer text-xs" onClick={handleRevealClick}>
          Naaah, I&apos;m good, give me free stuff
        </div>
        <div className="block text-xs italic">
          * it might not be as secure and legit but that doesn&apos;t matter
          because you can&apos;t actually pay on this website.
        </div>
      </div>
    </div>
  );
};

export default LockedContent;
