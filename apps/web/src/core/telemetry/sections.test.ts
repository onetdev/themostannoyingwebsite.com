/**
 * The section registry is the stringly-typed half of the telemetry contract.
 * This guard fails when markup invents a surface that `TELEMETRY_SECTIONS`
 * does not know about, so a typo cannot silently orphan a funnel.
 *
 * @jest-environment node
 */
import fs from 'node:fs';
import path from 'node:path';
import { TELEMETRY_SECTIONS } from './catalog';

const SOURCE_ROOTS = [
  path.resolve(process.cwd(), 'src'),
  path.resolve(process.cwd(), '../../packages/ui-lib/src'),
];

const SECTION_ATTRIBUTE = /data-track-section="([^"{}]+)"/g;

function collectSourceFiles(root: string): string[] {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter((entry) => /\.tsx?$/.test(entry) && !entry.includes('.test.'))
    .map((entry) => path.join(root, entry));
}

describe('telemetry sections', () => {
  it('has no duplicate entries', () => {
    expect(new Set(TELEMETRY_SECTIONS).size).toBe(TELEMETRY_SECTIONS.length);
  });

  it('declares every section rendered in markup', () => {
    const known = new Set<string>(TELEMETRY_SECTIONS);
    const unknown: string[] = [];

    for (const root of SOURCE_ROOTS) {
      for (const file of collectSourceFiles(root)) {
        const source = fs.readFileSync(file, 'utf8');
        for (const match of source.matchAll(SECTION_ATTRIBUTE)) {
          const section = match[1];
          if (!known.has(section)) {
            unknown.push(`${path.relative(process.cwd(), file)}: ${section}`);
          }
        }
      }
    }

    expect(unknown).toEqual([]);
  });
});
