import { FunctionComponent, PropsWithoutRef, useEffect, useState } from 'react';

const DotDotDotText: FunctionComponent<
  PropsWithoutRef<JSX.IntrinsicElements['span']> & { stepDurationMs?: number }
> = ({ stepDurationMs = 400, ...rest }) => {
  const [iteration, setIteration] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIteration((prev) => (prev + 1) % 4);
    }, stepDurationMs);
    return () => clearInterval(timer);
  }, [stepDurationMs]);

  return <span {...rest}>Agent is typing {'.'.repeat(iteration)}</span>;
};

export default DotDotDotText;
