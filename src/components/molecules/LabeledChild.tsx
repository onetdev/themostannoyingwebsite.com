import { FunctionComponent, PropsWithChildren } from 'react';

export type LabeledChildProps = PropsWithChildren<{
  label: string;
  reverse?: boolean;
}>;

const LabeledChild: FunctionComponent<LabeledChildProps> = ({
  label,
  children,
  reverse = false,
}) => {
  return (
    <label
      data-reverse={reverse.toString()}
      className="flex items-center gap-3 data-[reverse=true]:flex-row-reverse data-[reverse=true]:justify-between">
      {children}
      <span>{label}</span>
    </label>
  );
};

export default LabeledChild;
