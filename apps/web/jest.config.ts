import config from '@maw/config-jest/base';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

// TODO: Meh, I don't have the patience to fix this yet.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createJestConfig(config) as unknown as any;
