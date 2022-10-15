module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  rules: {
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'no-console': 'off',
    radix: 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off'
  }
};
