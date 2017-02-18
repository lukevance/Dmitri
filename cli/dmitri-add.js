"use strict";

const program = require('commander');

const makeRequest = require('../index').request;

const add = function (propertiesPath, options) {
  if (propertiesPath) {
    // get compared element
    // add changes array to (type and rhs value to tmp file)
  } else {
    console.log('Please provide a property to add');
    console.log('e.g. Config.authtype');
  }
};

program
  .command('propertiesPath')
  .option('-u, --user <user>', 'overrides the default user setup during initialization')
  .action((propertiesPath, options) => add(propertiesPath, options)
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri add resourceName.CREATE.propertyName');
    console.log('');
  })
  .parse(process.argv);
