import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  buildReference,
  canonicalJson,
  serializeReference,
  writeReference,
} from '../../scripts/export-translation-reference';

const SAMPLE = {
  zebra: 'last',
  alpha: { gamma: ['b', 'a'], beta: 'x' },
  array: [1, 2, 3],
};

const REORDERED = {
  array: [1, 2, 3],
  alpha: { beta: 'x', gamma: ['b', 'a'] },
  zebra: 'last',
};

describe('translation reference exporter', () => {
  it('canonicalizes object keys while preserving array order', () => {
    expect(canonicalJson({ b: 1, a: ['z', 'a'] })).toBe(
      '{"a":["z","a"],"b":1}',
    );
  });

  it('sorts integer-like keys lexicographically, not numerically', () => {
    expect(canonicalJson({ 300: 'a', 60: 'b', 15: 'c' })).toBe(
      '{"15":"c","300":"a","60":"b"}',
    );
  });

  it('produces the same hash regardless of key order', () => {
    expect(buildReference(REORDERED).hash).toBe(buildReference(SAMPLE).hash);
  });

  it('changes the hash when a value changes', () => {
    const changed = {
      ...SAMPLE,
      alpha: { ...SAMPLE.alpha, beta: 'y' },
    };

    expect(buildReference(changed).hash).not.toBe(buildReference(SAMPLE).hash);
  });

  it('is idempotent when serialized', () => {
    const first = serializeReference(buildReference(SAMPLE));
    const second = serializeReference(buildReference(SAMPLE));

    expect(second).toBe(first);
    expect(first.endsWith('\n')).toBe(true);
  });

  it('only rewrites the file when its content changed', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'translation-ref-'));
    const outputPath = path.join(dir, 'translation-reference.json');

    try {
      expect(writeReference(outputPath, SAMPLE)).toBe(true);
      const written = fs.readFileSync(outputPath, 'utf8');

      expect(JSON.parse(written).hash).toBe(buildReference(SAMPLE).hash);
      expect(writeReference(outputPath, REORDERED)).toBe(false);
      expect(fs.readFileSync(outputPath, 'utf8')).toBe(written);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
