"use strict";

const getNames = (resource) => {
  try {
    if((resource.parameters && resource.parameters.length > 0)) {
      let params = resource.parameters.map((param) => {
        // reduce param to just name
        return param.name;
      });
      return params;
    } else {
      throw 'No parameters found for ' + resource.method + ': ' + resource.path;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getNames: getNames
};
