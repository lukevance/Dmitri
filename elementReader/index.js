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

function getCRUDS (resourceName, elementJSON) {
  try {
    // TODO: add check for valid elementJSON

    // check that valid resourceName has been specified
    if (resourceName && (typeof resourceName === 'string') && (resourceName.length > 0)) {
      let resourceCRUDS = {};
      resourceCRUDS.resourceName = resourceName;
      resourceCRUDS.methods = {};
      let count = 0;
      elementJSON.resources.forEach((resource) => {
        // check current resource in loop for match
        if (resource.path.split("/")[3] === resourceName){
          // temporary store of properties desired
          let resourceProperties = {
            path: resource.path,
            method: resource.method,
            description: resource.description
          };
          // based on method, add properties to resourceCRUDS
          switch(resource.method) {
            case 'GET':
              // check if RETRIEVE or SELECT
              if (resourceProperties.path.indexOf('{') > 0){
                resourceCRUDS.methods.SELECT = resourceProperties;
              } else {
                resourceCRUDS.methods.RETRIEVE = resourceProperties;
              }
              break;
            case 'POST':
              resourceCRUDS.methods.CREATE = resourceProperties;
              break;
            case 'PUT':
            case 'PATCH':
              resourceCRUDS.methods.UPDATE = resourceProperties;
              break;
            case 'DELETE':
              resourceCRUDS.methods.DESTROY = resourceProperties;
              break;
          }
          count++;
        }
      }); // end of forEach loop of resources
      return resourceCRUDS;
    } else {
      throw "invalid resource name or none was specified";
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getResources: getResources,
  getHub: getHub,
  getCRUDS: getCRUDS
};
