
const chalk = require('chalk')
const ora = require('ora')

const spinner = ora('building for production...')

spinner.stop()
console.log('\n')
console.log(chalk.cyan('  Build complete.\n'))
console.log(chalk.yellow(
  '  Tip: built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
))
