/* eslint-disable func-names, @typescript-eslint/no-var-requires */
const webpackConfig = require('./webpack/test.js');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [{ pattern: 'test/**/*.spec.js?(x)' }],
    preprocessors: {
      './test/**/*.spec.js?(x)': ['webpack', 'sourcemap']
    },
    reporters: ['mocha'],
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,

    webpack: webpackConfig,
    mochaReporter: {
      colors: {
        success: 'greenBright',
        info: 'cyanBright',
        warning: 'yellowBright',
        error: 'redBright'
      }
    }
  });
};
