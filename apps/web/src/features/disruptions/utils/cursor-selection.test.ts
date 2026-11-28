import type { CursorPreset } from '../schemas';
import {
  getCursorCssValue,
  pickInitialCursor,
  pickNextCursor,
} from './cursor-selection';

const cursor = (overrides: Partial<CursorPreset>): CursorPreset => ({
  id: 'arrow-a',
  src: '/assets/cursors/arrow-a.svg',
  hotspot: { x: 1, y: 1 },
  kind: 'arrow',
  ...overrides,
});

const presets: CursorPreset[] = [
  cursor({ id: 'arrow-a', src: '/assets/cursors/arrow-a.svg' }),
  cursor({ id: 'arrow-b', src: '/assets/cursors/arrow-b.svg' }),
  cursor({
    id: 'busy',
    src: '/assets/cursors/busy.svg',
    hotspot: { x: 16, y: 16 },
    kind: 'busy',
  }),
];

describe('pickInitialCursor', () => {
  it('only picks arrow cursors when arrows are available', () => {
    for (let index = 0; index < 10; index++) {
      expect(pickInitialCursor(presets)?.kind).toBe('arrow');
    }
  });

  it('falls back to the full set when there are no arrows', () => {
    const busyOnly = presets.filter((preset) => preset.kind !== 'arrow');
    expect(pickInitialCursor(busyOnly)?.id).toBe('busy');
  });
});

describe('pickNextCursor', () => {
  it('never returns the cursor that is currently applied', () => {
    for (let index = 0; index < 20; index++) {
      expect(pickNextCursor(presets, 'arrow-a')?.id).not.toBe('arrow-a');
    }
  });

  it('returns null when there is nothing else to pick', () => {
    expect(pickNextCursor([presets[0] as CursorPreset], 'arrow-a')).toBeNull();
  });

  it('is deterministic with an injected random source', () => {
    expect(pickNextCursor(presets, 'arrow-a', () => 0)?.id).toBe('arrow-b');
    expect(pickNextCursor(presets, 'arrow-a', () => 0.99)?.id).toBe('busy');
  });
});

describe('getCursorCssValue', () => {
  it('includes the source, hotspot and a native fallback', () => {
    expect(getCursorCssValue(presets[2] as CursorPreset)).toBe(
      'url("/assets/cursors/busy.svg") 16 16, default',
    );
  });
});
