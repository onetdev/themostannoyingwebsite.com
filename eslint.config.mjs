import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// TODO
//  Once all the configs/extends are compatible with ESLint 9 (FlatConfig)
//  we can remove the compat layer, but we can't yet.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// When can we upgrade? List of compatible and incompatible configs
//  - next/core-web-vitals
//    - UNSUPPORTED as of 2024-10-25
//  - plugin:@typescript-eslint/recommended
//    - https://typescript-eslint.io/getting-started/#step-2-configuration
//    - import eslint from "@eslint/js";
//    - import tseslint from "typescript-eslint";
//  - plugin:prettier/recommended
//    - https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
//    - import prettierRecommended from "eslint-plugin-prettier/recommended";
//  - plugin:tailwindcss/recommended
//    - https://github.com/francoismassart/eslint-plugin-tailwindcss?tab=readme-ov-file#eslintconfigjs
//    - import tailwind from "eslint-plugin-tailwindcss";
//  - plugin:storybook/recommended
//    - https://github.com/storybookjs/eslint-plugin-storybook?tab=readme-ov-file#configuration-eslintconfigcmjs
//    - import storybook from "eslint-plugin-storybook";

const rules = [
  {
    ignores: ['**/*.css', '**/*.svg'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended',
  ),
  {
    rules: {
      'import/order': [
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

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Usage of relative parent imports is not allowed.',
            },
          ],
        },
      ],

      'react/no-unescaped-entities': ['warn'],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];

export default rules;
