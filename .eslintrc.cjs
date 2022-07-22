module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    '@monorepo-template/typescript',
    '@monorepo-template/typescript-fixable',
    '@monorepo-template/typescript-strict',
    'prettier',
  ],

  overrides: [
    {
      files: ['.eslintrc.cjs'],
      extends: '@monorepo-template/typescript/eslint',
    },

    {
      files: ['*.cjs', '*.js', '*.jsx'],
      extends: '@monorepo-template/typescript/cjs',
    },

    {
      files: ['*.cjs', '*.js', '*.jsx', '*.mjs'],
      extends: [
        '@monorepo-template/typescript/js',
        '@monorepo-template/typescript-fixable/js',
      ],
    },

    {
      files: ['*.json'],
      extends: [
        '@monorepo-template/typescript/json',
        '@monorepo-template/typescript-fixable/json',
      ],
    },

    {
      files: ['*.ts', '*.tsx'],
      extends: '@monorepo-template/typescript/ts',
    },
  ],

  parserOptions: {
    extraFileExtensions: ['.json'],
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};
