import { buildPrizePool, WHEEL_PRIZE_SLOTS } from './wheel-prizes';

describe('buildPrizePool', () => {
  const prizes = [
    { id: 'freeLifetimeBeer', label: 'Free lifetime beer' },
    { id: 'worldPeace', label: 'World peace' },
    { id: 'absolutelyNothing', label: 'Absolutelly nothing' },
    { id: 'complimentaryOtter', label: 'Complimentary otter' },
    { id: 'fake70Discount', label: 'Fake 70% discount' },
  ];

  it('maps pool labels onto the weighted slots', () => {
    expect(buildPrizePool(prizes)).toEqual([
      { value: 'Free lifetime beer*', weight: 10 },
      { value: 'World peace*', weight: 1 },
      { value: 'Absolutelly nothing', weight: 100 },
      { value: 'Complimentary otter*', weight: 2 },
      { value: 'Fake 70% discount', weight: 50 },
    ]);
  });

  it('falls back to the id when a label is missing', () => {
    const result = buildPrizePool([{ id: 'worldPeace', label: 'World peace' }]);
    const byValue = Object.fromEntries(
      result.map((item) => [item.value, item.weight]),
    );

    expect(byValue['freeLifetimeBeer*']).toBe(10);
    expect(byValue.absolutelyNothing).toBe(100);
    expect(byValue['World peace*']).toBe(1);
  });

  it('ignores unknown pool ids and keeps the slot count fixed', () => {
    const result = buildPrizePool([...prizes, { id: 'mystery', label: '???' }]);

    expect(result).toHaveLength(WHEEL_PRIZE_SLOTS.length);
    expect(result.map((item) => item.value)).not.toContain('???');
  });

  it('degrades to id-derived values for an empty pool', () => {
    const result = buildPrizePool([]);

    expect(result).toHaveLength(WHEEL_PRIZE_SLOTS.length);
    expect(result[0]).toEqual({ value: 'freeLifetimeBeer*', weight: 10 });
  });
});
