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
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;
