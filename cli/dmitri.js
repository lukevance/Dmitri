#!/usr/bin/env node

'use strict';

const commander = require('commander');

commander
  .version('0.0.1')
  .command('cruds', 'compare cruds for files')
  .command('resource', 'compare all resources')
  .parse(process.argv);
