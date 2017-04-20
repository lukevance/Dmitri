"use strict";

const compare = require('./compare');
const showTools = require('./show');

const whatToShow = (element, propertiesPath) => {
  console.log(propertiesPath);
  // propertiesPath has been validated, read path and process correctly
  let pathArray =  propertiesPath.split('.');
  // separate main summaries from nested properties
  if (pathArray.length > 1) {
    // store
    let subPath = pathArray.splice(1).join('.');
    switch (pathArray[0]) {
      case 'resources':
        showTools.subResources(element, subPath);
        break;
      default:
    }
  } else if (pathArray.length === 1) {
    switch (pathArray[0]) {
      case 'configs':
      case 'configuration':
        showTools.configs(element);
        break;
      case 'resources':
        showTools.resources(element);
        break;
      default:
        console.log(pathArray[0] + ' is not currently supported');
    }
  } else {
    console.log(chalk.red('Please provide a valid property path'));
  }
};


module.exports = {
  compareGraph: compare.compareGraph,
  compareResource: compare.resource,
  show: whatToShow
};
