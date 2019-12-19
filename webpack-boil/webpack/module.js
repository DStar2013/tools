const { sep, resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessFunc = require('less-plugin-functions');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  rules: [
    {
      test: /\.(j|t)sx?$/,
      exclude: [/node_modules/],
      use: ['happypack/loader?id=babel']
    },
    {
      test: /\.(css|less)$/,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            javascriptEnabled: true,
            plugins: [new LessFunc()]
          }
        }
      ]
    },
    {
      test: /\.(svg|png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[ext]',
            limit: 8192,
            fallback: 'file-loader'
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: 'font/[name].[ext]',
            fallback: 'file-loader'
          }
        }
      ]
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
      exclude: [/node_modules/]
    }
  ]
};
