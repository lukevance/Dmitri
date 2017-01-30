"use strict";

const chalk = require('chalk');

function httpErrors (err) {
  if (err.cause.code === 'ECONNREFUSED') {
    console.log(chalk.red('    Request to ' + err.cause.address + ':' + err.cause.port + ' was unsuccessful'));
    if (err.options) {
      // console.log(err.options);
      console.log(chalk.yellow('    --> Is ' + err.options.uri.substring(0, err.options.uri.indexOf('/', 7)) + ' running?'));
    }
  } else {
    console.log(chalk.red('    something bad happened!'));
    console.log(err);
  }
}

module.exports = {
  httpErrors: httpErrors
};
