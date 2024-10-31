import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

export type OneByOneGiftProps = {
  size?: number;
};

const OneByOneGift: FunctionComponent<OneByOneGiftProps> = ({
  size = 1024,
}) => {
  return (
    <Link href="/flaim-wan-phone">
      <Image
        src="/assets/wan-phone.webp"
        width={size}
        height={size}
        alt="One by one gift"
        className="h-auto w-full object-cover"
      />
    </Link>
  );
};

export default OneByOneGift;
