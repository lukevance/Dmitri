"use strict";

const program = require('commander');

const loadedElement = () => {
  return false;
};

const show = function (propertiesPath, options) {
  console.log(propertiesPath);
  if (options.file && propertiesPath) {
    console.log(options.file);
  } else if (options.environment && propertiesPath) {
    console.log(options.environment);
  } else if (loadedElement()) {
    console.log(propertiesPath);
  } else {
    console.log('No loaded element found, please load an element or provide an enviroment and element key');
    console.log('Please provide a property to display');
    console.log('e.g. config.authtype');
  }
};

program
  .command('show', '[property || path]')
  .option('-s, --staging <elementkey>', 'overrides the loaded element with the given elementkey and environment')
  .option('-f, --file <filePath>', 'overrides the loaded element with the given element.json file')
  .action((property, options) => show(property, options))
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri show configs');
    console.log('    $ dmitri show resources');
    console.log('    $ dmitri show resources.users.create.path');
    console.log('');
  })
  .parse(process.argv);
