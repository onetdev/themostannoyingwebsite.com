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
    '/node_modules/(?!(\\.pnpm/)?(@formatjs|@shadcn|emittery|inversify|@inversifyjs|ky|marked|sanitize-html|htmlparser2|domhandler|domutils|domelementtype|dom-serializer|entities))',
    '^.+\\.module\\.(css|sass|scss)$',
  ];
  return resolved;
};
