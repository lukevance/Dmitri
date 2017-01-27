"use strict";

const program = require('commander');

const makeRequest = require('../index').request;

program
  .option('-u, --user <user>', 'overrides the default user setup during initialization')

  .on('--help', () => {
    console.log('  Some helpful notes...');
  })
  .parse(process.argv);


if (program.elementkey) {
  console.log(program.elementkey);
}



program
  .option('-f, --force', 'force installation')
  .parse(process.argv);

var pkgs = program.args;

if (!pkgs.length) {
  console.error('packages required');
  process.exit(1);
}

console.log();
if (program.force) console.log('  force: install');
pkgs.forEach(function(pkg){
  console.log('  install : %s', pkg);
});
console.log();
