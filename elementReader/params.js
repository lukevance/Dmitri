"use strict";
const chalk = require('chalk');

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

const getSimple = (resource) => {
  if (resource.parameters && resource.parameters.length > 0) {
    let name = chalk.dim('____') + 'name';
    let params = resource.parameters.map((param) => {
      return {
        name: chalk.magenta(param.name),
        type: param.type,
        datatype: param.dataType,
        vendorName: param.vendorName,
        required: param.required
      };
    });
    return params;
  }
};

module.exports = {
  getNames: getNames,
  getSimple: getSimple
};
