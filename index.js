'use strict';

const getResources = require('./elementReader').getResources;
const getCRUDS = require('./elementReader').getCRUDS;
const combineResources = require('./compareElements').combine;
const combineCRUDS = require('./compareElements').combineCRUDS;
const render = require('./render');

function compile (oldJson, newJson) {
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

  return results;
}


// render resource changes
function dmResource (resource, oldFilePath, newFilePath) {
  let results = compile(oldFilePath, newFilePath);
  render.compareResource(0, results, resource);
}

// render general compare in console
function dmCruds (firstElementJSON, secondElementJSON, compareFromLabel, compareToLabel) {
  let results = compile(firstElementJSON, secondElementJSON);
  render.compareGraph(results, compareFromLabel, compareToLabel);
}

// function requestStuff (stuff) {
//   console.log(stuff);
// }

// const requester = require('./apiHandler');
//
// function logstuff (content) {
//   console.log('name: ' + content.name);
//   console.log('description' + content.description);
//   console.log('key: ' + content.key);
//   console.log(content.resources.length);
// }

// requester.getProdElement('gooddata', logstuff);

// let oldJSON = require(process.argv[2]);
// let newJSON = require(process.argv[3]);
//
// dmCruds(oldJSON, newJSON);

module.exports = {
  resources: dmResource,
  cruds: dmCruds
  // request: requestStuff
};
