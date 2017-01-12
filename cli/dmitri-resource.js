"use strict";

const program = require('commander');

const resources = require('../index').resources;

program
  .command('resourceName', 'oldFilePath', 'newFilePath')
  .action((resourceName, oldFilePath, newFilePath) => {
    resources(resourceName, oldFilePath, newFilePath);
  })
  .on('--help', () => {
    console.log('  Some helpful notes...');
  })
  .parse(process.argv);
