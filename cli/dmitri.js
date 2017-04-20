#!/usr/bin/env node

'use strict';

const commander = require('commander');

commander
  .version('0.0.1')
  .command('init', 'sets up environments for retrieving and comparing elements')
  .command('load', 'downloads element.json for base to compare and edit')
  .command('compare', 'compares elements to other elements or hubs')
  .command('show', 'display information about an elements properties')
  .command('settings', 'displays current settings from initialization')
  .command('save', 'saves element JSON')
  .parse(process.argv);
