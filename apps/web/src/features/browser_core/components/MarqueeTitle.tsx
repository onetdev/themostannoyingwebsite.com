import Head from 'next/head';
import { useEffect, useState } from 'react';

import { string_marquee } from '@/features/browser_core';

type MarqueeTitleProps = {
  enabled: boolean;
  speedMs?: number;
  text: string;
};
const MarqueeTitle = ({ enabled, speedMs = 1000, text }: MarqueeTitleProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setTime(0);
    }

    const timer = setInterval(() => setTime((prev) => prev + 1), speedMs);
    return () => {
      clearInterval(timer);
      setTime(0);
    };
  }, [enabled, speedMs]);

  if (!enabled) {
    return null;
  }

  return (
    <Head>
      <title>{string_marquee(text, time)}</title>
    </Head>
  );
};

export default MarqueeTitle;
