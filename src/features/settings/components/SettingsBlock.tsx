import { FunctionComponent, PropsWithChildren } from 'react';

const SettingsBlock: FunctionComponent<
  PropsWithChildren<{ title: string }>
> = ({ title, children }) => {
  return (
    <div className="rounded-md border border-on-surface bg-surface-alt p-5">
      <h2 className="m-0 mb-5">{title}</h2>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

export default SettingsBlock;
