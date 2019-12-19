const webpackBaseConfig = require("./base.js");
const merge = require("webpack-merge");

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false
});
