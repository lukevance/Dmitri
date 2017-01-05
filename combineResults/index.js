"use strict";

function combine (oldResources, newResources){
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

module.exports = {
  combine: combine
};
