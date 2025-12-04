'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { useDonationBalance } from '../../application/hooks/useDonationBalance';

export function JarAnimation() {
  const balance = useDonationBalance();

  return (
    <DotLottieReact
      src="/animations/money-jar.lottie"
      loop
      autoplay
      mode={balance < 0 ? 'reverse' : 'forward'}
      className="h-64 w-auto md:h-124"
      renderConfig={{ autoResize: true }}
    />
  );
}
