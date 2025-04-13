import { FunctionComponent } from 'react';

type CoverPlaceholderProps = {
  width: number;
  height: number;
};

export const CoverPlaceholder: FunctionComponent<CoverPlaceholderProps> = ({
  width,
  height,
}) => {
  return (
    <div
      className="bg-cover-placeholder after:bg-radial-primary relative bg-repeat after:pointer-events-none after:absolute after:top-0 after:left-0 after:size-full after:mix-blend-saturation"
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    />
  );
};
