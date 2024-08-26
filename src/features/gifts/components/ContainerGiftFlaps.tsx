import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import flapImage from '@/public/assets/images/car-advert.jpg';

const ContainerGiftFlaps: FunctionComponent = () => {
  return (
    <div
      className="sticky top-0 w-full"
      style={{
        // TODO: Use proper tailwind classes instead of inline styles
        maxWidth: 'calc(${cssVars.spacing.container} + 250px)',
        left: 'calc(50% - calc(${cssVars.spacing.container} / 2) - 125px)',
      }}>
      <div className="absolute inset-x-0 max-h-screen overflow-hidden">
        <Link href="/super-duper" passHref>
          <Image
            className="object-cover"
            src={flapImage}
            placeholder="blur"
            alt="Super duper car advert"
            width={1920}
            height={1200}
          />
          <GiftFlapText className="left-16 top-0 origin-bottom-left -translate-x-screen-h-1/2 -rotate-90">
            VERY CHEAP LOAN?
          </GiftFlapText>
          <GiftFlapText className="right-16 top-0 origin-bottom-right translate-x-screen-h-1/2 rotate-90">
            NO BACKGROUND CHECK?
          </GiftFlapText>
        </Link>
      </div>
    </div>
  );
};

const GiftFlapText: FunctionComponent<JSX.IntrinsicElements['span']> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <span
      className={`absolute text-2xl font-bold text-on-primary mix-blend-exclusion ${className}`}
      {...rest}>
      {children}
    </span>
  );
};

export default ContainerGiftFlaps;
