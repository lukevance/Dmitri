"use strict";

function getHub (elementJSON) {
  return elementJSON.hub;
}

function getResources (elementJSON) {
  let resources = {};
  elementJSON.resources.forEach((resource) => {
    let objectName = resource.path.split("/")[3];
    if (!resources[objectName]){
      resources[objectName] = true;
    }
  });
  return resources;
}

module.exports = {
  getResources: getResources,
  getHub: getHub
};
