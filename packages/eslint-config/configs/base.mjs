import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import prettier from 'eslint-plugin-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import turbo from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    name: "base/turbo",
    plugins: {
      turbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    name: "base/onlyWarn",
    plugins: {
      onlyWarn,
    },
  },
  {
    name: "base/noDist",
    ignores: ['dist/**'],
  },
];
