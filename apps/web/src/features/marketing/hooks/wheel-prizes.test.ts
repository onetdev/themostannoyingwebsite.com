import { buildPrizePool } from './wheel-prizes';

describe('buildPrizePool', () => {
  const prizes = [
    {
      id: 'freeLifetimeBeer',
      label: 'Free lifetime beer',
      weight: 10,
      starred: true,
    },
    { id: 'worldPeace', label: 'World peace', weight: 1, starred: true },
    {
      id: 'absolutelyNothing',
      label: 'Absolutelly nothing',
      weight: 100,
    },
    {
      id: 'complimentaryOtter',
      label: 'Complimentary otter',
      weight: 2,
      starred: true,
    },
    {
      id: 'fake70Discount',
      label: 'Fake 70% discount',
      weight: 50,
    },
  ];

  it('maps API labels and weights onto the weighted pool', () => {
    expect(buildPrizePool(prizes)).toEqual([
      { value: 'Free lifetime beer*', weight: 10 },
      { value: 'World peace*', weight: 1 },
      { value: 'Absolutelly nothing', weight: 100 },
      { value: 'Complimentary otter*', weight: 2 },
      { value: 'Fake 70% discount', weight: 50 },
    ]);
  });

  it('does not decorate unstarred segments', () => {
    const result = buildPrizePool([
      { id: 'absolutelyNothing', label: 'Nothing', weight: 100 },
    ]);

    expect(result).toEqual([{ value: 'Nothing', weight: 100 }]);
  });

  it('returns an empty pool when no segments are available', () => {
    expect(buildPrizePool([])).toEqual([]);
  });
});
