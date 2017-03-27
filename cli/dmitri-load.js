'use strict';

const program = require('commander');
const Preferences = require('preferences');
const chalk = require('chalk');


const prefs = new Preferences('dmitri');

const load = function (elementkey, options) {
  // get element from desired location
}


program
  .command('elementkey', 'the element to begin work on')
  .action((elementkey, options) => load(elementkey, options))
  .option('-e, --env', 'overrides the default enviroment')
  .option('-p, --prod', 'downloads element.json from the production enviroment')
  .option('-f, --file <filePath>', 'overrides hub with specific element JSON')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri load {elementKey}');
    console.log('    $ dmitri compare {elementKey} --file ./path/to/file [optionalSecondFile]');
    console.log('    $ dmitri compare {elementkey} --resource {resourceName} ');
    console.log('');
  })
  .parse(process.argv);
