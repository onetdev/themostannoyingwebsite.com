import { FunctionComponent, PropsWithChildren } from 'react';

import Icon from '@/atoms/Icon';
import Tooltip from '@/atoms/Tooltip';

export type LabeledChildProps = PropsWithChildren<{
  info?: string;
  label: string;
  reverse?: boolean;
}>;

const LabeledChild: FunctionComponent<LabeledChildProps> = ({
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

export default LabeledChild;
