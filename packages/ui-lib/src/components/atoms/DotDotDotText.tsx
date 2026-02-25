'use client';

import { ComponentProps, useEffect, useState } from 'react';

export type DotDotDotTextProps = ComponentProps<'span'> & {
  stepDurationMs?: number;
  message?: string;
};

export function DotDotDotText({
  stepDurationMs = 400,
  message,
  ...rest
}: DotDotDotTextProps) {
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
}
