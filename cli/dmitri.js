#!/usr/bin/env node

'use strict';

const commander = require('commander');

commander
  .version('0.0.1')
  .command('init', 'sets up environment for comparing')
  .command('compare <elementkey>', 'compares elements to other elements or hubs')
  // .command('normalize <elementkey> [hub || element]', 'compares element resources to hub or other element')
  // .command('resources [elementFilePath]', 'this is still a test')
  .parse(process.argv);
