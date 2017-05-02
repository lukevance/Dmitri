"use strict";

const stripHubs = (element) => {
  let noHubElement = element;
  let noHubs = noHubElement.resources.map((resource) => {
    if (resource.path.indexOf('hubs') >= 0) {
      resource.path = resource.path.split('/hubs/' + element.hub).join('');
    }
    return resource;
  });
  noHubElement.resources = noHubs;
  return noHubElement;
};

const getNames = (elementJSON) => {
  let resources = {};
  if (elementJSON.resources) {
    elementJSON.resources.forEach((resource) => {
      let objectName = resource.path.split("/")[1];
      if (!resources[objectName]) {
        resources[objectName] = true;
      }
    });
    return resources;
  } else {
    console.log('no resources found on this element');
    // console.log(Object.keys(elementJSON));
  }
};

const getBaseNames = (element) => {
  try {
    // filter out non base resources
    let baseResources = stripHubs(element).resources
      .map((resource) => {
        return resource.path.split("/")[1];
      })
      .filter((resourceName, i, array) => {
        return resourceName !== array[i-1];
      });
    return baseResources;
  } catch (e) {
    throw e;
  }
};

const getPathsNoHubs = (element) => {
  return stripHubs(element);
};

const getResourcesByName = (object) => {
  // whatttt
}

module.exports = {
  getNames: getNames,
  getBaseNames: getBaseNames,
  getPathsNoHubs: getPathsNoHubs
}
