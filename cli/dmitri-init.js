'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const chalk = require('chalk');

let prefs = new Preferences('dmitri');

// function to get creds for given environemt
let getCreds = function (environments, start, prefs) {
  let currEnv = start;
  let questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter username or e-mail address:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];
  console.log(chalk.blue("Set up your " + environments[currEnv] + " environment"));
  inquirer.prompt(questions)
    .then((answers) => {
      prefs[environments[currEnv]] = answers;
    })
    .then(() => {
      if (environments.length > currEnv + 1){
        currEnv++;
        getCreds(environments, currEnv, prefs);
      } else {
        console.log(prefs);
      }
    });

};

program
  .option('-s, --staging', 'Use staging as dev environment')
  .parse(process.argv);

// store environments to initialize
let environments = ["Production", "Development"];

if (program.staging){
  environments.push("Staging");
}

getCreds(environments, 0, prefs);
