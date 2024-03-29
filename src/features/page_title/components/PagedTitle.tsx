import Head from 'next/head';
import { useEffect, useState } from 'react';

type ArrayPagedTitleProps = {
  enabled: boolean;
  speedMs?: number;
  texts: string[];
};
const ArrayPagedTitle = ({
  enabled,
  speedMs = 1000,
  texts,
}: ArrayPagedTitleProps) => {
  const [time, setTime] = useState(0);

  // Every odd iteration will one of the custom lines while every even one
  // will keep the original title.
  const alternate = time % 2 === 1;
  const text = alternate ? undefined : texts[(time / 2) % texts.length];

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

  return <Head>{enabled && text && <title>{text}</title>}</Head>;
};

export default ArrayPagedTitle;
