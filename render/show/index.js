"use strict";

const chalk = require('chalk');
const col = require('columnify');
const elementReader = require('../../elementReader');

// colors
const h1 = chalk.blue.underline.bold;

const showParams = (resource) => {
  if (resource.parameters && resource.parameters.length > 0) {
    let params = elementReader.getSimpleParams(resource);
    console.log(col(params, {preserveNewLines: true}));
  }
  // let paramNames = elementReader.getParamNames(resource);
  // console.log(paramNames);
};

const subResources = (element, subPath) => {
  let pathArray = subPath.split('.');
  // check for all resources or specific
  if (pathArray[0] === "*") {
    // Check for all methods or specific
    if (pathArray[1] === "*") {
      // check for summary or specific prop
      if (pathArray[2]) {
        switch (pathArray[2]) {
          case 'parameters':
            console.log("Element: " + chalk.red(element.name));
            element.resources.forEach((resource) => {
              console.log('  ' + h1(resource.method + ': ' + resource.path));
              showParams(resource);
            });
            break;
          default:

        }
      } else {
        // show resource.prop summary
      }
    } else {
      // show resource summary
    }
  } else {
    // look for specific resource
    // getResourceNames
    // if resource exists
      // filter resources for given resource
  }
};

const resourcesOverview = (element) => {
  // get base resource names
  let baseResourceNames = elementReader.resources.getBaseNames(element);
  baseResourceNames.forEach((objectName) => {
    console.log(chalk.magento(objectName));
    let objectResources = element.resources.filter(resource => {
      // getPa
      if (objectName === elementReader.resource.getPathsNoHubs(resource))  {

      }
    })
    .forEach((resource) => {
      console.log("    " + resource.method + ": " + resource.path);
    });
  });

  // loop over resource names, reduce element Resources
  // element.resources.forEach((resource) => {
  //   // filter resources
  //   console.log(chalk.magenta(resource.method) + ': ' + resource.path);
  // });
  // result:
  //    contacts       GET POST
  //    contacts/{id}
  //    tasks     GET
  //
};

const allConfigs = (element) => {
  let configs = element.configuration;
  configs.forEach((config) => {
    console.log(config.name + ': ' + chalk.blue(config.key));
  });
};

module.exports = {
  params: showParams,
  subResources: subResources,
  resources: resourcesOverview,
  configs: allConfigs
};
