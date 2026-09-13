import config from '@maw/config-jest/base';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const jestConfig = createJestConfig({
  ...config,
});

export default async () => {
  const resolved = await jestConfig();
  resolved.transformIgnorePatterns = [
    '/node_modules/(?!(\\.pnpm/)?(emittery|inversify|@inversifyjs|ky|marked|sanitize-html))',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return resolved;
};
