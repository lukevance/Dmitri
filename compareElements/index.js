"use strict";
const compareJSON = require('deep-diff').diff;
const combine = require('./combiners');



module.exports = {
  combine: combine.resourceNames,
  combineCRUDS: combine.cruds
};
