import config from '@maw/config-jest/base';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const jestConfig = createJestConfig({
  ...config,
});

// ESM-only dependencies that Jest must transpile (they ship no CJS build).
// `tslog` is pulled in through @maw/logger, used by the telemetry console sink.
const ESM_PACKAGES = [
  '@formatjs',
  '@inversifyjs',
  '@shadcn',
  'dom-serializer',
  'domelementtype',
  'domhandler',
  'domutils',
  'emittery',
  'entities',
  'htmlparser2',
  'inversify',
  'ky',
  'marked',
  'sanitize-html',
  'tslog',
].join('|');

export default async () => {
  const resolved = await jestConfig();
  resolved.transformIgnorePatterns = [
    `/node_modules/(?!(\\.pnpm/)?(${ESM_PACKAGES}))`,
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return resolved;
};
