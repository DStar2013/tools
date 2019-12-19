const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  runtimeChunk: {
    name: 'vendor'
  },
  splitChunks: {
    cacheGroups: {
      commons: {
        name: 'vendor',
        chunks: 'initial',
        minChunks: 2
      }
    }
  }
};
