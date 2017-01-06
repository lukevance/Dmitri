"use strict";

const compareJSON = require('deep-diff').diff;
const getResources = require('./elementReader').getResources;
const getCRUDS = require('./elementReader').getCRUDS;
const combineResources = require('./compareElements').combine;
const combineCRUDS = require('./compareElements').combineCRUDS;

const render = require('./render');

// get path names for files from arguments
let oldJson = require(process.argv[2]);
let newJson = require(process.argv[3]);

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
console.log(results);

// combine resources into one object for comparing
// let results = combineResources(oldResources, newResources);

// get longest resource
// let longestResource = longResource(results);
// render in console
render.compareGraph(results);

//
// let differences = compareJSON(oldResources, newResources);
// //
// console.log(differences);
//
// let result = [
//   {
//     resource: 'name',
//     old: {
//        Create: {
//          path: '',
//          method: '',
//          description: ''
//        },
//        Retrieve: {},
//        Destroy: {}
//      },
//     new: {
//       Create: {
//         changed: ['list of changed properties']
//       }
//     }
//   }
// ];
