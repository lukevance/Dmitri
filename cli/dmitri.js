#!/usr/bin/env node

'use strict';

const commander = require('commander');

commander
  .version('0.0.1')
  .command('init', 'sets up environment for comparing')
  .command('compare', 'compares elements to other elements or hubs')
  .command('add', 'adds properties to temporary publish list')
  .command('publish <elementkey>', 'generates sql for staged changes to element')
  .parse(process.argv);
