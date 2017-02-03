"use strict";

const program = require('commander');
const dmitri = require('../index');
const requester = require('../apiHandler');

const terminate = (msg, args) => {
  args ? console.error(msg, args) : console.error(msg);
  process.exit(1);
};

const localToProd = (elementkey, next, options) => {
  requester.getLocalElement(elementkey, (localElement) => {
    requester.getProdElement(elementkey, (prodElement) => {
      if (options.resource) {
        next(prodElement, localElement, options.resource);
      } else if (options.labels) {
        next(prodElement, localElement, options.labels[0], options.labels[1]);
      } else {
        next(prodElement, localElement, 'Prod', 'Local');
      }
    });
  });
};

const configuration = function (elementkey){
  console.log(elementkey);
  requester.getLocalElement(elementkey, (localElement) => {
    // console.log(Object.keys(localElement));
    // console.log(localElement.configuration);
    dmitri.configs(localElement);
  });
};

const compare = (elementkey, options) => {
  if (elementkey){
    // console.log(Object.keys(options));
    // console.log(options.resource);
    if (options.configs) {
      configuration(elementkey);
    } else if (options.file) {
      console.log('the file options');
      console.log(options.file);
      console.log(elementkey);
    } else if (options.resource){
      console.log(options.resource);
      localToProd(elementkey, dmitri.resource, {resource: options.resource});
      // show
    } else if (elementkey && !options.resource && !options.file && !options.labels){
      // by default compare prod and local elements via elementkey
      localToProd(elementkey, dmitri.cruds, {labels: ['Prod', 'Local']});
    } else {
      console.log('you messed up the command');
    }
  } else {
    console.log('whaat');
    terminate('No elementkey provided');
  }
};

program
  .command('elementkey', 'the element to compare')
  .action((elementkey, options) => compare(elementkey, options))
  .option('-c, --configs', 'compares config values')
  .option('-p, --prod-local [prodElementKey]', 'compares to element in production')
  .option('-f, --file-file <filePath> [secondFilePath]', 'overrides hub with specific element JSON')
  .option('-r, --resource <resourceName', 'shows change details for specific resource')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri compare {elementKey}');
    console.log('    $ dmitri compare {elementKey} --file ./path/to/file [optionalSecondFile]');
    console.log('    $ dmitri compare {elementkey} --resource {resourceName} ');
    console.log('');
  })
  .parse(process.argv);

// authenticate user
// requester.authenticate();
// let oldJson
  // cruds(oldJson, newJson);
// requester.getProdElement(elementkey);
// console.log(program);
