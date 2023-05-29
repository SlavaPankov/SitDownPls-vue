module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': [2, { props: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        css: 'never',
        js: 'never',
        vue: 'never',
      },
    ],
    'max-len': ['error', { code: 150 }],
  },
};
