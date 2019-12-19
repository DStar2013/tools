const webpackBaseConfig = require('./base.js');
const merge = require('webpack-merge');
var portfinder = require('portfinder');
const chalk = require('chalk');
// proxySetting
const paths = require('./paths');
const proxySetting = require(paths.packageJson).proxy;

const devWebpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    noInfo: true,
    open: true,
    host: '0.0.0.0',
    useLocalIp: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' },
      ],
    },
    proxy: proxySetting
  },
});

module.exports = new Promise((resolve, reject) => {
  // 设置插件的初始搜寻端口号
  portfinder.basePort = devWebpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      if (portfinder.basePort !== port) {
        console.log(chalk.blue(`☆ ${portfinder.basePort} 端口被占用，开启新端口 ${port} ☆`));
      }
      // portfinder 得到了可以使用的端口
      devWebpackConfig.devServer.port = port
      //
      resolve(devWebpackConfig)
    }
  });
});
