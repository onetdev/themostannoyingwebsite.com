import { FunctionComponent, PropsWithChildren } from 'react';

const SettingsBlock: FunctionComponent<
  PropsWithChildren<{ title: string }>
> = ({ title, children }) => {
  return (
    <div className="rounded-md border border-secondary bg-surface p-5">
      <h2 className="m-0 mb-5">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default SettingsBlock;
