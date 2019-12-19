const { resolve } = require('path');
const entry = require('./entry');
const modules = require('./module');
const plugins = require('./plugins');
const optimization = require('./optimization');

const paths = require('./paths');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry,
  module: modules,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    modules: ['node_modules'],
    alias: {
      '~': paths.src
    },
    symlinks: false
  },
  output: {
    path: paths.output,
    publicPath: isDevelopment ? '/' : './',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins,
  optimization,
  performance: { hints: false },
  stats: {
    entrypoints: false,
    children: false
  },
};
