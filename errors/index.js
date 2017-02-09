"use strict";

const chalk = require('chalk');

function httpErrors (err, elementkey) {
  if (err.cause && err.cause.code === 'ECONNREFUSED') {
    console.log(chalk.red('    Request to ' + err.cause.address + ':' + err.cause.port + ' was unsuccessful'));
    if (err.options) {
      // console.log(err.options);
      console.log(chalk.yellow('    --> Is ' + err.options.uri.substring(0, err.options.uri.indexOf('/', 7)) + ' running?'));
    }
  } else if (err.error.message === 'No element found with the specified key') {
    console.log(chalk.red('    Sorry, I could not find that element :/'));
    console.log(chalk.yellow('    Did you spell elementkey ') + chalk.blue(elementkey) + chalk.yellow(' correctly?'));
  } else {
    console.log(chalk.red('    something bad happened!'));
    console.log(chalk.yellow('    Status Code: ' + err.statusCode));
    console.log(err.error);
  }
}

module.exports = {
  httpErrors: httpErrors
};
