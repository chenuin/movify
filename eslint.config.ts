// @ts-check
/** @type {import('typescript-eslint').Config} */
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import {globalIgnores} from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      '@stylistic': stylistic,
    },
    rules: {
      'semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-max-props-per-line': ['error', {maximum: 1, when: 'multiline'}],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'react/jsx-sort-props': ['off', {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      }],
      'react/jsx-indent-props': ['error', 2],
    },
  },
]);
