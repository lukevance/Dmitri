#!/usr/bin/env node

'use strict';

const commander = require('commander');

commander
  .version('0.0.1')
  .command('init', 'sets up environments for retrieving and comparing elements')
  .command('load', 'downloads element.json for base to compare and edit')
  .command('compare', 'compares elements to other elements or hubs')
  .command('show', 'display information about an elements properties')
  .command('publish <elementkey>', 'generates sql for staged changes to element')
  .command('settings', 'displays current settings from initialization')
  .command('save', 'saves element JSON')
  .parse(process.argv);

AWS4-HMAC-SHA256
Credential=AKIAJ64XHSP2KPY27D5A/20170404/us-east-1/s3/aws4_request,
SignedHeaders=content-type;host;x-amz-content-sha256;x-amz-date,
Signature=eee07cd17f42941b98a20dfe975b514e9cceaf2d0bd6e09708199f2635c97d7e
