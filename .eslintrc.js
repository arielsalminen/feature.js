module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['eslint:recommended', 'google'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-var': 'off',
    'valid-jsdoc': 'off'
  }
};
