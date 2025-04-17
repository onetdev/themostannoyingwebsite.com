import { FunctionComponent, PropsWithChildren } from 'react';

export type BorderedBoxProps = PropsWithChildren<{
  className?: string;
  title?: string;
}>;

export const BorderedBox: FunctionComponent<BorderedBoxProps> = ({
  children,
  className = '',
  title,
}) => {
  return (
    <div
      className={`border-on-surface bg-surface-alt rounded-md border p-5 ${className}`}>
      {title && <h2 className="m-0 mb-5">{title}</h2>}
      <div className="flex w-full flex-col gap-1">{children}</div>
    </div>
  );
};
