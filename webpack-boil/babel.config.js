module.exports = {
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'ant'
    ]
  ],
  exclude: ['packages/*/lib']
};
