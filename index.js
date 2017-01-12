'use strict';

// const commander = require('commander');
//
// commander
//   .version('0.0.1')
//   .command('cruds', 'initalize churros')
//   .command('resource', 'add a new test suite')
//   .parse(process.argv);

// const commander = require('commander');

const getResources = require('./elementReader').getResources;
const getCRUDS = require('./elementReader').getCRUDS;
const combineResources = require('./compareElements').combine;
const combineCRUDS = require('./compareElements').combineCRUDS;
const render = require('./render');

// get path names for files from arguments
let oldJson = require(process.argv[3]);
let newJson = require(process.argv[4]);

// strip resources from element JSON
let oldResources = getResources(oldJson);
let newResources = getResources(newJson);

// get CRUDS info for each resource
let oldCompiledCRUDS = [];
Object.keys(oldResources).forEach((resourceName) => {
  oldCompiledCRUDS.push(getCRUDS(resourceName, oldJson));
});

let newCRUDS = [];
Object.keys(newResources).forEach((resourceName) => {
  newCRUDS.push(getCRUDS(resourceName, newJson));
});

// combine resourceCRUDS into one object for comparing
let results = combineCRUDS(oldCompiledCRUDS, newCRUDS);
// console.log(results[0]);

// get longest resource
// let longestResource = longResource(results);

// render resource changes
// function dmResource (resource) {
  render.compareResource(0, results, process.argv[2]);
// }

// render general compare in console
// function dmCruds () {
  // render.compareGraph(results);
// }
