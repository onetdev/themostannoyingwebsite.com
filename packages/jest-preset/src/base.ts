/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
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
    "@/(.*)$": "<rootDir>/src/$1",
    "@/root/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/@maw/jest-preset/src/setup.ts"
  ],
  verbose: undefined,
  watchman: true,
};

export default config;
