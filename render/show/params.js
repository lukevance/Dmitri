'use strict';

const util = require('../../elementReader');
const col = require('columnify');

const showParams = (resource) => {
  if (resource.parameters && resource.parameters.length > 0) {
    let params = util.getSimpleParams(resource);
    console.log(col(params, {
      preserveNewLines: true
    }));
  }
  // let paramNames = elementReader.getParamNames(resource);
  // console.log(paramNames);
};

module.exports = {
    overview: showParams
};