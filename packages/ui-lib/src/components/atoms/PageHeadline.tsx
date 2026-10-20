import { cn } from 'cn';
import type { PropsWithChildren, ReactNode } from 'react';

type PageHeadlineProps = PropsWithChildren<{
  className?: string;
  /**
   * Optional actions rendered on the same row as the headline, aligned to the
   * trailing edge (e.g. a share button). When provided, the headline and its
   * actions are laid out as a flex row.
   */
  actions?: ReactNode;
}>;

export function PageHeadline({
  children,
  className,
  actions,
}: PageHeadlineProps) {
  if (!actions) {
    return <h1 className={cn('mb-4', className)}>{children}</h1>;
  }

  return (
    <div
      className={cn('mb-4 flex items-start justify-between gap-4', className)}
    >
      <h1 className="min-w-0 flex-1">{children}</h1>
      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </div>
  );
}
