import { FunctionComponent, useEffect, useState } from 'react';

type Props = JSXProxyProps<'span'> & {
  stepDurationMs?: number;
  message?: string;
};

const DotDotDotText: FunctionComponent<Props> = ({
  stepDurationMs = 400,
  message,
  ...rest
}) => {
  const [iteration, setIteration] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIteration((prev) => (prev + 1) % 4);
    }, stepDurationMs);
    return () => clearInterval(timer);
  }, [stepDurationMs]);

  return (
    <span {...rest}>
      {message} {'.'.repeat(iteration)}
    </span>
  );
};

export default DotDotDotText;
