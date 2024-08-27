import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, PropsWithoutRef } from 'react';

import flapImage from '@/public/assets/images/car-advert.jpg';

const ContainerGiftFlaps: FunctionComponent = () => {
  return (
    <div className="sticky top-0 hidden w-full justify-center md:flex">
      <div className="absolute max-h-screen overflow-hidden">
        <Link href="/super-duper" passHref>
          <Image
            className="object-cover"
            src={flapImage}
            placeholder="blur"
            alt="Super duper car advert"
            width={1920}
            height={1200}
          />
          <GiftFlapText className="bottom-16 left-16 origin-bottom-left -rotate-90">
            DO YOU LIKE FREE MONEY?
          </GiftFlapText>
          <GiftFlapText className="bottom-16 right-16 origin-bottom-right rotate-90">
            DO YOU HATE WORKING?
          </GiftFlapText>
        </Link>
      </div>
    </div>
  );
};

const GiftFlapText: FunctionComponent<
  PropsWithoutRef<JSX.IntrinsicElements['span']>
> = ({ children, className, ...rest }) => {
  return (
    <span
      className={`absolute text-2xl font-bold text-on-primary mix-blend-exclusion ${className}`}
      {...rest}>
      {children}
    </span>
  );
};

export default ContainerGiftFlaps;
