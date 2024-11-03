export const arrayShuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export const mergeIntervals = (intervals: [number, number][]): number[][] => {
  const validIntervals: number[][] = intervals.map((interval) => [
    interval[0] !== undefined ? interval[0] : -Infinity,
    interval[1] !== undefined ? interval[1] : Infinity,
  ]);

  validIntervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  for (let i = 0; i < validIntervals.length; i++) {
    const current = validIntervals[i];

    if (merged.length === 0) {
      merged.push(current);
    } else {
      const lastMerged = merged[merged.length - 1];

      if (current[0] <= lastMerged[1]) {
        lastMerged[1] = Math.max(lastMerged[1], current[1]);
      } else {
        merged.push(current);
      }
    }
  }

  return merged;
};
