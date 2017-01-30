"use strict";

const program = require('commander');
const cruds = require('../index').cruds;
const requester = require('../apiHandler');

const compare = (elementkey, options) => {
  if (options.hub) {
    console.log('the hub option');
  } else if (options.file) {
    console.log('the file options');
    console.log(options.file);
    console.log(elementkey);
  } else {
    // get prodElementKey
    requester.getLocalElement(elementkey, (localElement) => {
      requester.getProdElement(elementkey, (prodElement) => {
        cruds(localElement, prodElement);
      });
    });
    // get local element

  }
};

function compareToHub (elementkey, hubName) {
  console.log(elementkey);
  console.log(hubName);
}

function compareToProd (elementkey) {
  console.log(elementkey);
}

program
  .command('elementkey', 'the element to compare')
  .action((elementkey, options) => compare(elementkey, options))
  .option('-b, --hub <hubname>', 'overrides default hub')
  .option('-p, --prod [prodElementKey]', 'compares to element in production')
  .option('-f, --file <filePath>', 'overrides hub with specific element JSON')
  .option('-r, --resource <resourceName', 'shows change details for specific resource')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri compare ./path/to/file ./path/to/secondFile');
    console.log('    $ dmitri compare -hub {elementkey}');
    console.log('');
  })
  .parse(process.argv);

// authenticate user
// requester.authenticate();
// let oldJson
  // cruds(oldJson, newJson);
// requester.getProdElement(elementkey);
// console.log(program);
