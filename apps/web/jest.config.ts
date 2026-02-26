import config from '@maw/config-jest/base';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

// TODO: Meh, I don't have the patience to fix this yet.
export default createJestConfig(config) as unknown as any;
