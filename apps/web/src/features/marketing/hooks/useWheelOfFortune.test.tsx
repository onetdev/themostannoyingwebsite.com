/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useWheelOfFortune } from './useWheelOfFortune';

let mockPrizes: {
  id: string;
  label: string;
  weight: number;
  starred?: boolean;
}[] = [];

jest.mock('@/features/content/hooks', () => ({
  usePool: () => mockPrizes,
}));

jest.mock('@/core/events/event-bus', () => ({
  emit: jest.fn(),
}));

describe('useWheelOfFortune', () => {
  it('marks the wheel unavailable and builds no slices for an empty pool', () => {
    mockPrizes = [];
    const { result } = renderHook(() => useWheelOfFortune());

    expect(result.current.isUnavailable).toBe(true);
    // No `'~'` sentinel slices should be produced for an empty pool.
    expect(result.current.items).toEqual([]);
  });

  it('treats malformed segments (empty label / zero weight) as unavailable', () => {
    mockPrizes = [
      { id: 'empty', label: '   ', weight: 10 },
      { id: 'zero', label: 'A prize', weight: 0 },
    ];
    const { result } = renderHook(() => useWheelOfFortune());

    expect(result.current.isUnavailable).toBe(true);
    expect(result.current.items).toEqual([]);
  });

  it('builds slices once the pool has prizes', () => {
    mockPrizes = [{ id: 'beer', label: 'Free beer', weight: 1 }];
    const { result } = renderHook(() => useWheelOfFortune());

    expect(result.current.isUnavailable).toBe(false);
    expect(result.current.items).toHaveLength(10);
    expect(
      result.current.items.every((item) => item.text === 'Free beer'),
    ).toBe(true);
  });
});
