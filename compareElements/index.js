"use strict";

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
  // loop through old CRUDS
  oldCompiledCRUDS.forEach((resource) => {
    // console.log(resource);
    let comparedResource = {
      resource: resource.resourceName,
      old: resource.methods
    };
    // ----------- THIS IS WHERE I LEFT OFF!! ---------------
    newCompiledCRUDS.forEach((newResource) => {
      if (comparedResource.resource === newResource.resourceName) {
        
      }
    });
    if (newCompiledCRUDS.hasOwnProperty(resource)){
      comparedResource.new = true;
      delete newCompiledCRUDS[resource];
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

module.exports = {
  combine: combineResources,
  combineCRUDS: combineCRUDS
};
