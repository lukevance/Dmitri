"use strict";

const program = require('commander');

const makeRequest = require('../index').request;

program
  .command('propertiesPath')
  .option('-u, --user <user>', 'overrides the default user setup during initialization')

  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri add resourceName.CREATE.propertyName');
    console.log('');
  })
  .parse(process.argv);
