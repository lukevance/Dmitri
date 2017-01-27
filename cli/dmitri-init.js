'use strict';

const program = require('commander');
const inquirer = require('inquirer');
const Preferences = require('preferences');
const chalk = require('chalk');

let prefs = new Preferences('dmitri');

let defaults = {
  Production: {
    url: 'console.cloud-elements.com'
  },
  Staging: {
    url: 'staging.cloud-elements.com'
  },
  Development: {
    url: 'localhost:8080'
  }
}

//TODO add url value for development environment

// function to get creds for given environemt
let getCreds = function (environments, start, prefs) {
  let currEnv = start;
  let questions = [
    {
      name: 'url',
      type: 'url',
      message: 'Set the base url: ',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter a base URL';
        }
      }
    },
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
  questions.forEach((q) => {
    // console.log(q.name);
    // console.log(defaults[environments[currEnv]][q.name]);
    if (defaults.hasOwnProperty(environments[currEnv]) && defaults[environments[currEnv]].hasOwnProperty(q.name)) {
      q.default = defaults[environments[currEnv]][q.name];
      console.log(q.default);
    }
  });
  inquirer.prompt(questions)
    .then((answers) => {
      prefs[environments[currEnv]] = answers;
    })
    .then(() => {
      if (environments.length > currEnv + 1){
        currEnv++;
        getCreds(environments, currEnv, prefs);
      } else {
        console.log();
        console.log(chalk.green("Dmitri setup is complete"));
        console.log(chalk.green("Start comparing elements or use 'dmitri --help' for more info"));
        console.log();
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
