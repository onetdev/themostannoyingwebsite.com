import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import config from '@/core/config';

const cursors = config.disruptions.possessedCursor.cursors;

describe('possessed cursor assets', () => {
  it('contains at least two presets with unique ids', () => {
    expect(cursors.length).toBeGreaterThanOrEqual(2);
    expect(new Set(cursors.map((cursor) => cursor.id)).size).toBe(
      cursors.length,
    );
  });

  it('keeps every hotspot inside the 32x32 canvas', () => {
    for (const cursor of cursors) {
      expect(cursor.hotspot.x).toBeGreaterThanOrEqual(0);
      expect(cursor.hotspot.x).toBeLessThanOrEqual(31);
      expect(cursor.hotspot.y).toBeGreaterThanOrEqual(0);
      expect(cursor.hotspot.y).toBeLessThanOrEqual(31);
    }
  });

  it.each(cursors)('ships a valid 32x32 SVG for $id', (cursor) => {
    const assetPath = join(process.cwd(), 'public', cursor.src);
    expect(existsSync(assetPath)).toBe(true);

    const svg = readFileSync(assetPath, 'utf8');
    expect(svg).toMatch(/<svg[^>]*width="32"[^>]*height="32"/);
    expect(svg).toMatch(/viewBox="0 0 32 32"/);
  });
});
