'use client';

import { useEffect, useState } from 'react';

export type ProgressBarProps = {
  duration: number;
  warningDuration: number;
};

export function ProgressBar({ duration, warningDuration }: ProgressBarProps) {
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWarning(true), warningDuration * 1000);

    return () => clearTimeout(timer);
  }, [warningDuration]);

  return (
    <div
      data-warning={warning.toString()}
      className="group border-success data-[warning=true]:border-warning w-full overflow-hidden rounded-full border">
      <div
        className="animate-width-100-0 bg-success group-data-[warning=true]:bg-warning h-5"
        style={{ animationDuration: `${duration}s` }}
      />
    </div>
  );
}
