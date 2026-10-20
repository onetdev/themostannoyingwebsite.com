import baseConfig from '@maw/config-jest/base';
import type { Config } from 'jest';

const config: Config = {
  ...baseConfig,
  setupFilesAfterEnv: [],
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          target: 'es2022',
          transform: { react: { runtime: 'automatic' } },
        },
        module: { type: 'es6' },
      },
    ],
  },
};

export default config;
