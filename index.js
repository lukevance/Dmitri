'use strict';

const getResources = require('./elementReader').getResources;
const getCRUDS = require('./elementReader').getCRUDS;
const getConfigs = require('./elementReader').configs;
const combineResources = require('./compareElements').combine;
const combineCRUDS = require('./compareElements').combineCRUDS;
const render = require('./render');

const compile = (oldJson, newJson) => {
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
const dmResource = (oldFilePath, newFilePath, resource) => {
  let results = compile(oldFilePath, newFilePath);
  render.compareResource(0, results, resource);
}

// render general compare in console
const dmCruds = (firstElementJSON, secondElementJSON, compareFromLabel, compareToLabel) => {
  let results = compile(firstElementJSON, secondElementJSON);
  render.compareGraph(results, compareFromLabel, compareToLabel);
}

// render differences in configuration values for elements
const configs = (firstElementJSON, secondElementJSON, compareFromLabel, compareToLabel) = {
  console.log(getConfigs(firstElementJSON));
  // console.log(getConfigs(secondElementJSON));
}


module.exports = {
  configs: configs,
  resource: dmResource,
  cruds: dmCruds
};
