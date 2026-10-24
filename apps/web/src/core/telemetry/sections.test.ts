/**
 * The section registry is the stringly-typed half of the telemetry contract.
 * These guards fail when markup invents a surface that `TELEMETRY_SECTIONS`
 * does not know about (so a typo cannot silently orphan a funnel) and when a
 * declared section is never rendered (so the registry cannot rot).
 *
 * Both the literal attribute and the `section` prop of shared actions are
 * checked: the prop path is invisible to a DOM scan until render time.
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

const SECTION_PATTERN = /(?:data-track-section|section)="([^"{}]+)"/g;
const TELEMETRY_ROOT = path.join(
  path.resolve(process.cwd(), 'src'),
  'core',
  'telemetry',
);

function collectSourceFiles(root: string): string[] {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter((entry) => /\.tsx?$/.test(entry) && !entry.includes('.test.'))
    .map((entry) => path.join(root, entry));
}

function readSources(root: string): Array<{ file: string; source: string }> {
  return collectSourceFiles(root).map((file) => ({
    file,
    source: fs.readFileSync(file, 'utf8'),
  }));
}

const sources = SOURCE_ROOTS.flatMap(readSources);

describe('telemetry sections', () => {
  it('has no duplicate entries', () => {
    expect(new Set(TELEMETRY_SECTIONS).size).toBe(TELEMETRY_SECTIONS.length);
  });

  it('declares every section rendered in markup or passed as a prop', () => {
    const known = new Set<string>(TELEMETRY_SECTIONS);
    const unknown: string[] = [];

    for (const { file, source } of sources) {
      for (const match of source.matchAll(SECTION_PATTERN)) {
        const section = match[1];
        if (!known.has(section)) {
          unknown.push(`${path.relative(process.cwd(), file)}: ${section}`);
        }
      }
    }

    expect(unknown).toEqual([]);
  });

  it('renders every declared section somewhere outside the registry', () => {
    // The registry itself mentions every value, so it is not a usage source.
    const usageCorpus = sources
      .filter(({ file }) => !file.startsWith(TELEMETRY_ROOT))
      .map(({ source }) => source)
      .join('\n');

    const unused = TELEMETRY_SECTIONS.filter(
      (section) =>
        !usageCorpus.includes(`'${section}'`) &&
        !usageCorpus.includes(`"${section}"`),
    );

    expect(unused).toEqual([]);
  });
});
