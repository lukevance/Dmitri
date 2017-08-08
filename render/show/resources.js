'use strict';

const resourcesOverview = (element) => {

  if (element.resources && (element.resources.length > 0)) {
    element.resources.forEach((resource) => {
      if (resource.path) {
        console.log(resource.method + ': ' + resource.path);
      }
    });
  }

  // get base resource names
  // let baseResourceNames = elementReader.resources.getBaseNames(element);
  // baseResourceNames.forEach((objectName) => {
  //   console.log(chalk.magenta(objectName));
  //   let objectResources = element.resources.filter(resource => {
  //     // getPa
  //     if (objectName === elementReader.resources.getPathsNoHubs(resource))  {

  //     }
  //   })
  //   .forEach((resource) => {
  //     console.log("    " + resource.method + ": " + resource.path);
  //   });
  // });

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

const subResources = (element, subPath) => {
  let pathArray = subPath.split('.');
  // check for all resources or specific
  if (pathArray[0] === '*') {
    // Check for all methods or specific
    if (pathArray[1] === '*') {
      // check for summary or specific prop
      if (pathArray[2]) {
        switch (pathArray[2]) {
          case 'parameters':
            console.log('Element: ' + chalk.red(element.name));
            element.resources.forEach((resource) => {
              console.log('  ' + h1(resource.method + ': ' + resource.path));
              params.overview(resource);
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