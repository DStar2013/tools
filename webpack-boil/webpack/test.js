const webpackBaseConfig = require('./base.js');
const merge = require('webpack-merge');

delete webpackBaseConfig.entry;

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
});
