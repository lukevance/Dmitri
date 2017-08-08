'use strict';

const chalk = require('chalk');
const params = require('./params');
const configs = require('./configs');

// colors
const h1 = chalk.blue.underline.bold;

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
        subResources(element, subPath);
        break;
      default:
    }
  } else if (pathArray.length === 1) {
    switch (pathArray[0]) {
      case 'configs':
      case 'configuration':
        configs.overview(element);
        break;
      case 'resources':
        resourcesOverview(element);
        break;
      default:
        console.log(pathArray[0] + ' is not currently supported');
    }
  } else {
    console.log(chalk.red('Please provide a valid property path'));
  }
};



module.exports = {
  params: showParams,
  subResources: subResources,
  resources: resourcesOverview,
  show: whatToShow
};