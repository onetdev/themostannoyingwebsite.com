import { FunctionComponent, PropsWithChildren } from 'react';

const SettingsBlockRow: FunctionComponent<
  PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
  return (
    <div>
      <label className="flex items-center justify-between">
        <span>{label}</span>
        {children}
      </label>
    </div>
  );
};

export default SettingsBlockRow;
