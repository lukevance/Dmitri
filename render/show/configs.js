'use strict';

const chalk = require('chalk');

const allConfigs = (element) => {
  let configs = element.configuration;
  configs.forEach((config) => {
    console.log(config.name + ': ' + chalk.blue(config.key));
  });
};

module.exports = {
    overview: allConfigs
};