const { resolve } = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['import', 'prettier', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    IS_DEV: 'readonly',
    CONFIG: 'readonly',
    I18N_TEMPLATES: 'readonly',
    _: 'readonly'
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/named': 'off', // typescript interface / type 导出无法正确识别
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['draft'] }
    ],
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/prop-types': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-explicit-any': ['off'],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/extensions': ['warn', 'never', {'less': 'always'}]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: resolve(
          __dirname,
          'webpack/base.js'
        )
      },
      typescript: {},
      'eslint-import-resolver-typescript': true
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
};
