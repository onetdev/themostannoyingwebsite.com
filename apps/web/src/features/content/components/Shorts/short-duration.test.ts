import { formatShortDuration } from './short-duration';

describe('formatShortDuration', () => {
  it.each([
    [8042, '0:09'],
    [8000, '0:08'],
    [61_000, '1:01'],
    [3_600_000, '60:00'],
    [0, '0:00'],
  ])('formats %dms as %s', (durationMs, expected) => {
    expect(formatShortDuration(durationMs)).toBe(expected);
  });
});
