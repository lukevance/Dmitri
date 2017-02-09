"use strict";

const program = require('commander');
const fs = require('fs');
const requester = require('../apiHandler');

function writeJSON (elementkey, elementJSON, path) {
  fs.writeFile(path + elementkey + '.json', elementJSON, (err) => {
    if (err) {return console.log(err);}
    console.log("Successfully saved " + elementkey + " element JSON to " + path);
  });
}

function save (elementkey, options) {
  let path = '/Users/lukevance/Documents/scratch/';
  if (options.local) {
    requester.getLocalElement(elementkey, (elementJSON) => {
      writeJSON(elementkey, JSON.stringify(elementJSON), path);
    });
  }
}

program
  .command('elementkey', 'the element to save')
  .option('-l, --local', 'saves element JSON from local dev env')
  .action((elementkey, options) => save(elementkey, options))
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri save {elementKey}');
    console.log('');
  })
  .parse(process.argv);
