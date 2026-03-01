import config from '@maw/config-jest/base';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

export default createJestConfig({
  ...config,
  transformIgnorePatterns: [
    '/node_modules/(?!emittery)/',
  ],
});
