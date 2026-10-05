'use client';

import {
  DotLottieReact,
  type DotLottieReactProps,
} from '@lottiefiles/dotlottie-react';
import { useAppConfigContext } from '@/core/react';

export type JarAnimationProps = {
  /** Current donation balance; negative reverses the animation. */
  balance: number;
} & Omit<
  DotLottieReactProps,
  'src' | 'loop' | 'autoplay' | 'mode' | 'className' | 'renderConfig'
>;

export function JarAnimation({ balance, ...props }: JarAnimationProps) {
  const config = useAppConfigContext();

  return (
    <DotLottieReact
      src={config.funding.assets.moneyJarAnimation}
      loop
      autoplay
      mode={balance < 0 ? 'reverse' : 'forward'}
      className="h-64 w-auto md:h-124"
      renderConfig={{ autoResize: true }}
      {...props}
    />
  );
}
