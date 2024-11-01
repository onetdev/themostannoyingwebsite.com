import { FunctionComponent, PropsWithChildren } from 'react';

export type SettingsBlockRowProps = PropsWithChildren<{
  label: string;
  reverse?: boolean;
}>;

const SettingsBlockRow: FunctionComponent<SettingsBlockRowProps> = ({
  label,
  children,
  reverse = false,
}) => {
  return (
    <div>
      <label
        data-reverse={reverse.toString()}
        className="flex items-center gap-3 data-[reverse=true]:flex-row-reverse data-[reverse=true]:justify-between">
        {children}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default SettingsBlockRow;
