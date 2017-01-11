"use strict";
const compareJSON = require('deep-diff').diff;

function combineResources (oldResources, newResources){
  let results = [];
  Object.keys(oldResources).forEach((resource) => {
    // console.log(resource);
    let comparedResource = {
      resource: resource,
      old: true
    };
    if (newResources.hasOwnProperty(resource)){
      comparedResource.new = true;
      delete newResources[resource];
    }
    results.push(comparedResource);
  });
  Object.keys(newResources).forEach((resource) => {
    results.push({
      resource: resource,
      new: true,
      old: false
    });
  });
  return results;
}

function combineCRUDS (oldCompiledCRUDS, newCompiledCRUDS){
  let results = [];
  let addedResources = {};
  // loop through old CRUDS
  oldCompiledCRUDS.forEach((resource) => {
    // create compared object
    let comparedResource = {
      resource: resource.resourceName,
      old: resource.methods
    };
    // check new CRUDS for matching resource
    for (let i = 0; i < newCompiledCRUDS.length; i++){
      let newResource = newCompiledCRUDS[i];
      // if resource exists in new CRUDS add to comparedResource
      if (comparedResource.resource === newResource.resourceName) {
        comparedResource.new = newResource.methods;
        // compare old and new resources
        comparedResource.changes = compareJSON(comparedResource.old, comparedResource.new);
      }
    }
    // add resource to results array
    results.push(comparedResource);
    // track name of resource as already checked
    addedResources[comparedResource.resource] = true;
  }); //end of oldCRUDS loop

  // check new CRUDS for additional resources
  newCompiledCRUDS.forEach((newResource) => {
    if (!addedResources[newResource.resourceName]){
      results.push({
        resource: newResource.resourceName,
        new: newResource.methods
      });
    }
  }); // end of newCRUDS loop
  return results;
}

module.exports = {
  resourceNames: combineResources,
  cruds: combineCRUDS
};
