"use strict";

const program = require('commander');

const cruds = require('../index').cruds;


program
  .command('oldFilePath', 'newFilePath')
  .action((oldFilePath, newFilePath) => {
    cruds(oldFilePath, newFilePath);
  })
  .on('--help', () => {
    console.log('  Some helpful notes...');
  })
  .parse(process.argv);
