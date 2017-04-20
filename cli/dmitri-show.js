"use strict";

const program = require('commander');
const render = require('../render');

// const element = require('../../elements-bazaar/native/SugarCRM.json');
const getFile = (filePath) => {
  return new Promise((resolve, reject) => {
    let element = require(filePath);
    if (element.hasOwnProperty("resources") && element.hasOwnProperty("configuration")) {
      resolve(element);
    } else {
      reject("Provided JSON file was not a valid element.json file.");
    }
  });
};

const loadedElement = () => {
  return false;
};

const show = function (propertiesPath, options) {
  try {
    // check for file option to load element
    if (options.file && propertiesPath) {
      if (options.file.indexOf('.json') > -1) {
        getFile(options.file)
          .then(element => render.show(element, propertiesPath))
          .catch(e => console.log(e));
      } else {
        throw "Please provide valid file path";
      }
    // check for env option to pull element from
    } else if (options.environment && propertiesPath) {
      console.log(options.environment);
    // check for loaded element
    } else if (loadedElement() && propertiesPath) {
      //show appropriate propertiesPath

    } else {
        console.log('No loaded element found, please load an element or provide an enviroment and element key');
        console.log('Please provide a property to display');
        console.log('e.g. config.authtype');
        return false;
    }
  } catch (e) {
    console.log(e);
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
    console.log('    $ dmitri show resources.*.*.parameters');
    console.log('');
  })
  .parse(process.argv);
