require('colors');
const exec = require('child_process').exec;
const fs = require('fs');
const CLIEngine = require('eslint').CLIEngine;
const cli = new CLIEngine({ fix: true });
const grepStagedScripts = 'git diff --cached --name-only | grep -E \"(src|packages).*(.js|.jsx|.ts|.tsx)$\" || true;'

function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}

console.log('开始执行代码检查....'.cyan);
console.log('注意: 提交代码前必须通过eslint!');

const notWebpack = path => !path.startsWith('webpack/');
const notScripts = path => !path.startsWith('scripts/');
const notFromLib = path => !/^packages\/.+\/lib/.test(path);

let pass = 0;
exec(grepStagedScripts, (error, stdout) => {
  if (stdout.length) {
    const files = stdout.split('\n')
      .filter(fs.existsSync)
      .filter(notWebpack)
      .filter(notScripts)
      .filter(notFromLib);

    if (files.length) {
      console.log('\n开始检查以下文件: ');
      console.log(files.join('\n'));
    }

    const report = cli.executeOnFiles(files);
    let errorCount = 0;
    let warningCount = 0;

    const autoFixedFiles = report.results.filter(result => result.output);

    if (autoFixedFiles.length) {
      console.log('自动修复以下文件:');
      console.log(autoFixedFiles.map(result=> result.filePath).join('\n'));
    }

    report.results.forEach(result => {
      errorCount += result.errorCount;
      warningCount += result.warningCount;

      if (result.messages.length > 0) {
        console.log('\n');
        console.log(result.filePath);

        result.messages.forEach(obj => {
          const level = getErrorLevel(obj.severity);
          console.log(`   ${obj.line || '--'}:${obj.column || '--'}  ${level}  ${obj.message}  ${obj.ruleId || ''}`);
          pass = 1;
        });
      }
    });

    CLIEngine.outputFixes(report);

    if (warningCount > 0 || errorCount > 0) {
      console.log(
        `\n   ${errorCount +
          warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)\n`
      );
      console.log('代码检查失败：请先修复以上问题再提交\n'.red);
    }
    else {
      console.log('代码检查通过\n'.cyan);
    }

    process.exit(pass);
  }

  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
