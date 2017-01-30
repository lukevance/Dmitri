'use strict';

const program = require('commander');
const Preferences = require('preferences');
const chalk = require('chalk');


let prefs = new Preferences('dmitri');

program.parse(process.argv);

Object.keys(prefs).forEach((env) => {
  console.log(chalk.blue(env + " Environment URL: ") + prefs[env].url);
  console.log(chalk.yellow("User: ") + prefs[env].username);
});
