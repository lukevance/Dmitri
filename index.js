'use strict';

const getResources = require('./elementReader').getResources;
const getCRUDS = require('./elementReader').getCRUDS;
const combineResources = require('./compareElements').combine;
const combineCRUDS = require('./compareElements').combineCRUDS;
const render = require('./render');

function compile (oldFilePath, newFilePath) {
  // get path names for files from arguments
  let oldJson = require(oldFilePath);
  let newJson = require(newFilePath);

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
function dmCruds (oldFilePath, newFilePath) {
  let results = compile(oldFilePath, newFilePath);
  render.compareGraph(results);
}

module.exports = {
  resources: dmResource,
  cruds: dmCruds
};
