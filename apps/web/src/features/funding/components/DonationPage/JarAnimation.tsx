'use client';

import {
  DotLottieReact,
  type DotLottieReactProps,
} from '@lottiefiles/dotlottie-react';
import { useAppConfigContext } from '@/core/config/react-app-config';
import { useDonationBalance } from '../../hooks';

export type JarAnimationProps = Omit<
  DotLottieReactProps,
  'src' | 'loop' | 'autoplay' | 'mode' | 'className' | 'renderConfig'
>;

export function JarAnimation(props: JarAnimationProps) {
  const config = useAppConfigContext();
  const balance = useDonationBalance();

  return (
    <DotLottieReact
      src={config.donation.assets.moneyJarAnimation}
      loop
      autoplay
      mode={balance < 0 ? 'reverse' : 'forward'}
      className="h-64 w-auto md:h-124"
      renderConfig={{ autoResize: true }}
      {...props}
    />
  );
}
