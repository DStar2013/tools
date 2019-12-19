const { resolve } = require('path');
const { existsSync } = require('fs');
const { cpus } = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const entry = require('./entry');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

const defaultEjsPath = './src/app/index.ejs';
const isDevelopment = process.env.NODE_ENV === 'development';
const minify = isDevelopment
  ? false
  : {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    };

const htmlWebpackPluginInstances = Object.keys(entry).map(name => {
  const ejsPath = resolve(entry[name], './index.ejs');
  const ejsExists = existsSync(ejsPath);

  return new HtmlWebpackPlugin({
    template: ejsExists ? ejsPath : defaultEjsPath,
    filename: `${name === 'app' ? 'index' : name}.html`,
    chunks: [name, 'vendor'],
    isDev: isDevelopment,
    minify
  });
});

const definePluginInstance = new webpack.DefinePlugin({
  IS_DEV: JSON.stringify(isDevelopment),
});
const happyThreadPool = HappyPack.ThreadPool({ size: cpus().length });
const happypackInstances = [
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    loaders: ['babel-loader?cacheDirectory']
  })
];

const plugins = [];
const commonPlugins = [
  ...happypackInstances,
  ...htmlWebpackPluginInstances,
  definePluginInstance,
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].css'
  }),
  new CopyWebpackPlugin([
    { from: 'lib/**/*' },
  ]),
  // new webpack.ProvidePlugin({
  //   _: 'lodash',
  // })
];

if (isDevelopment) {
  plugins.push(...commonPlugins, new webpack.HotModuleReplacementPlugin());
} else {
  plugins.push(
    new CleanWebpackPlugin(),
    ...commonPlugins,
    new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i }),
    new BundleAnalyzerPlugin(),
    new DuplicatePackageCheckerPlugin()
  );
}

module.exports = plugins;
