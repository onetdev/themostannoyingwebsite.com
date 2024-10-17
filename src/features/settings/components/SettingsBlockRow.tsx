import { FunctionComponent, PropsWithChildren } from 'react';

const SettingsBlockRow: FunctionComponent<
  PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      {children}
    </div>
  );
};

export default SettingsBlockRow;
