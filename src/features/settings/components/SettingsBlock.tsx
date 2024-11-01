import { FunctionComponent, PropsWithChildren } from 'react';

export type SettingsBlockProps = PropsWithChildren<{
  className?: string;
  title: string;
}>;

const SettingsBlock: FunctionComponent<SettingsBlockProps> = ({
  children,
  className = '',
  title,
}) => {
  return (
    <div
      className={`rounded-md border border-on-surface bg-surface-alt p-5 ${className}`}>
      <h2 className="m-0 mb-5">{title}</h2>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

export default SettingsBlock;
