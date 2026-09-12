import baseConfig from '@maw/config-jest/base';
import type { Config } from 'jest';

const config: Config = {
  ...baseConfig,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
