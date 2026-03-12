'use client';

import { randomNumber } from '@maw/utils/random';
import { useCallback, useEffect, useState } from 'react';
import { useDynamicPageTitle } from './useDynamicPageTitle';

export type UseGlitchyTitleOptions = {
  duration?: number;
  enabled: boolean;
  randomRange?: [number, number];
  text?: string;
};

export function useGlitchyTitle({
  duration = 1000,
  enabled,
  randomRange = [5000, 1000],
  text = DEFAULT_GLITCHY_TEXT,
}: UseGlitchyTitleOptions) {
  const [runCount, setRunCount] = useState(0);
  const { setTitle, resetTitle } = useDynamicPageTitle(enabled);

  const schedule = useCallback(
    (onComplete: () => void) => {
      const rnd = randomNumber(
        Math.min(...randomRange),
        Math.max(...randomRange),
      );

      const inTimer = setTimeout(() => {
        setTitle(text);
      }, rnd);

      const outTimer = setTimeout(() => {
        resetTitle();
        onComplete();
      }, rnd + duration);

      return () => {
        clearTimeout(inTimer);
        clearTimeout(outTimer);
      };
    },
    [duration, randomRange, text, setTitle, resetTitle],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: runCount is crucial for iterative process
  useEffect(() => {
    if (!enabled) {
      setRunCount(0);
      return;
    }

    return schedule(() => setRunCount((prev) => prev + 1));
  }, [enabled, schedule, runCount]);
}

// This is inentionally moved down here because it is so ugly
const DEFAULT_GLITCHY_TEXT = 'Ţ̸̳̦̰̦̝͕͐̒̉̉̈́̉͛̃͆ͅh̵̛̜̲̉̋̀̐̒͒͆̕ë̸̦̝̀́̓ ̸̡̯͕̈́̈́͋͂͗M̴͔̘͙̣̞̈́̏͗̈́̾͊̊̇ͅo̵̢̤͚̯̣͕̾̿̑̓͐͝s̶̫͙̳̼̲̔̄͑̒́̓̃̎̕t̵̛̫̅͌̌̓̒͘̕ ̸͓́́̃͠A̵̲͑̅̚ṅ̸̦̗̱͈̳̰̣̿̽͋͊̚ͅn̵͙̭͆o̵̢͎͙̊̓y̷̡̛̯͙͕̞͕̱̖̾̂́͝i̴̤̠͚̯̲̣͛ṅ̸̛̖̗̟͙̻͂̏̉͒ǵ̶̡͈̒͛̌͐̄͘ ̶̢̦͉̩̗̮̬̺̂̑̆̄͆͐Ẃ̶̡̭̪͖̼̟͕̊̊́̾̕e̴͓̱͐̈͌̈̔̑̕͠b̸̡̘͍͍̹̹̦͑̒̓s̷͎̥̠̦͕͋́̉̔̏i̸̱̗̻̳̦̓̓̓̍͌̓t̷̤̦̳̯̉̿̉̂̌̚ę̷̣͔͇̇͊͑';
