import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['node_modules', 'dist', 'build', 'public', 'log', '.github'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'error', // Enforce Prettier formatting as ESLint errors
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    },
  },
];
