const fs = require("fs");
const { resolve } = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => resolve(appDirectory, relativePath || '');

module.exports = {
  app: resolveApp('.'),
  output: resolveApp('./dist'),
  src: resolveApp('src'),
  packageJson: resolveApp('package.json'),
  packages: resolveApp('packages'),
};
