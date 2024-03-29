import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import { random } from '@/utils/math';

export type RandomBlinkTitleProps = {
  duration?: number;
  enabled: boolean;
  randomRange?: [number, number];
  text?: string;
};
const GlitchyTitle = ({
  duration = 1000,
  enabled,
  randomRange = [5000, 1000],
  text = glitchyText,
}: RandomBlinkTitleProps) => {
  const [blink, setBlink] = useState(false);
  // Incrementing this will trigger a rerender/reschedule
  const [runCount, setRunCount] = useState(0);

  const schedule = useCallback(
    (onComplete: () => void) => {
      const rnd = random(Math.min(...randomRange), Math.max(...randomRange));
      const inTimer = setTimeout(() => setBlink(true), rnd);
      const outTimer = setTimeout(() => {
        setBlink(false);
        onComplete();
      }, rnd + duration);

      return () => {
        clearTimeout(inTimer);
        clearTimeout(outTimer);
      };
    },
    [duration, randomRange],
  );

  useEffect(() => {
    if (!enabled) {
      setBlink(false);
      setRunCount(0);
      return;
    }

    const remove = schedule(() => setRunCount((prev) => prev + 1));
    return remove;
  }, [enabled, schedule, runCount]);

  return <Head>{enabled && blink && <title>{text}</title>}</Head>;
};

// This looks soo funky :D
const glitchyText = 'Ţ̸̳̦̰̦̝͕͐̒̉̉̈́̉͛̃͆ͅh̵̛̜̲̉̋̀̐̒͒͆̕ë̸̦̝̀́̓ ̸̡̯͕̈́̈́͋͂͗M̴͔̘͙̣̞̈́̏͗̈́̾͊̊̇ͅo̵̢̤͚̯̣͕̾̿̑̓͐͝s̶̫͙̳̼̲̔̄͑̒́̓̃̎̕t̵̛̫̅͌̌̓̒͘̕ ̸͓́́̃͠A̵̲͑̅̚ṅ̸̦̗̱͈̳̰̣̿̽͋͊̚ͅn̵͙̭͆o̵̢͎͙̊̓y̷̡̛̯͙͕̞͕̱̖̾̂́͝i̴̤̠͚̯̲̣͛ṅ̸̛̖̗̟͙̻͂̏̉͒ǵ̶̡͈̒͛̌͐̄͘ ̶̢̦͉̩̗̮̬̺̂̑̆̄͆͐Ẃ̶̡̭̪͖̼̟͕́̊́̾̕e̴͓̱͐̈͌̈̔̑̕͠b̸̡̘͍͍̹̹̦͑̒̓s̷͎̥̠̦͕͋́̉̔̏i̸̱̗̻̳̦̓̓̓̍͌̓t̷̤̦̳̯̉̿̉̂̌̚ę̷̣͔͇̇͊͑';

export default GlitchyTitle;
