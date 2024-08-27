import { FunctionComponent } from 'react';

type Props = {
  width: number;
  height: number;
};

const CoverPlaceholder: FunctionComponent<Props> = ({ width, height }) => {
  return (
    <div
      className="relative bg-cover-placeholder bg-repeat after:pointer-events-none after:absolute after:left-0 after:top-0 after:size-full after:bg-radial-primary after:mix-blend-saturation"
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    />
  );
};

export default CoverPlaceholder;
