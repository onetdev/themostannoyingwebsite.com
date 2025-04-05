/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  errorOnDeprecated: false,
  fakeTimers: {
    enableGlobally: false,
  },
  moduleNameMapper: {
    '@/public/(.*)$': '<rootDir>/public/$1',
    '@/(.*)$': '<rootDir>/src/$1',
    '@/root/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: undefined,
  watchman: true,
};

export default createJestConfig(config);
