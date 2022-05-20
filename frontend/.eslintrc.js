module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:prettier/recommended', 'react-app'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
      },
    },
  },
};
