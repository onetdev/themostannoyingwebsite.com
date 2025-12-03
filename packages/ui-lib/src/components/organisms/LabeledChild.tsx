import { FunctionComponent, PropsWithChildren } from 'react';

import { Icon, Tooltip } from '../atoms';

export type CompactFormRowProps = PropsWithChildren<{
  info?: string;
  label: string;
  reverse?: boolean;
}>;

export const CompactFormRow: FunctionComponent<CompactFormRowProps> = ({
  children,
  info,
  label,
  reverse = false,
}) => {
  return (
    <label
      data-reverse={reverse.toString()}
      className="flex items-center gap-3 data-[reverse=true]:flex-row-reverse data-[reverse=true]:justify-between">
      {children}
      <span>
        {label}{' '}
        {info && (
          <Tooltip text={info}>
            <Icon icon="info" />
          </Tooltip>
        )}
      </span>
    </label>
  );
};
