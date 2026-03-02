import type { PropsWithChildren } from 'react';

type PageHeadlineProps = PropsWithChildren<{
  className?: string;
}>;

export function PageHeadline({ children, className }: PageHeadlineProps) {
  return <h1 className={`${className ?? ''} mb-4`}>{children}</h1>;
}
