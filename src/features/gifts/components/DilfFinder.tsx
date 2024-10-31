import Image from 'next/image';

import DilfClickOverlay from './DilfClickOverlay';

const DilfFinder = () => {
  // TODO: Add donut specific maps search links
  return (
    <div className="relative">
      <Image
        src="/assets/dilf-full.webp"
        width={1900}
        height={1000}
        alt="The world of DILF"
      />
      <DilfClickOverlay className="absolute top-0 w-full" />
    </div>
  );
};

export default DilfFinder;
