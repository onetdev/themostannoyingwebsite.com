import js from '@eslint/js';
import pluginImportX from 'eslint-plugin-import-x';
import onlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turbo from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    name: 'base/turbo',
    plugins: {
      turbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    name: 'base/onlyWarn',
    plugins: {
      onlyWarn,
    },
  },
  {
    name: 'base/noDist',
    ignores: ['dist/**'],
  },
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  {
    name: 'base/importOrder',
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'import-x/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          groups: [
            ['builtin', 'external', 'object', 'type'],
            ['internal', 'parent', 'sibling', 'index'],
          ],

          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],

          'newlines-between': 'always',
        },
      ],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },
];
