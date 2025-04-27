import { PropsWithChildren } from 'react';

interface LabelTextProps extends PropsWithChildren {
  className?: string;
}

export function LabelText({ children, className }: LabelTextProps) {
  return (
    <span className={`inline-block text-lg font-semibold ${className}`}>
      {children}
    </span>
  );
}
