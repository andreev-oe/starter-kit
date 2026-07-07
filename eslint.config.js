import queryPlugin from '@tanstack/eslint-plugin-query';
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptEslint from 'typescript-eslint';

const IGNORED_PATH_PATTERNS = ['.astro/**', 'dist/**', 'node_modules/**'];
const API_QUERY_OPTIONS_FILE_PATTERNS = ['src/frameworks/react/api/api-query-options.ts'];
const REACT_SOURCE_FILE_PATTERNS = ['src/frameworks/react/**/*.{ts,tsx}'];
const REACT_VERSION_DETECTION_MODE = 'detect';

export default typescriptEslint.config(
  {
    ignores: IGNORED_PATH_PATTERNS,
  },
  {
    files: REACT_SOURCE_FILE_PATTERNS,
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      reactHooksPlugin.configs.flat.recommended,
      ...queryPlugin.configs['flat/recommended'],
      prettierConfig,
    ],
    rules: {
      'no-undef': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: REACT_VERSION_DETECTION_MODE,
      },
    },
  },
  {
    files: API_QUERY_OPTIONS_FILE_PATTERNS,
    rules: {
      '@tanstack/query/exhaustive-deps': 'off',
    },
  },
);
