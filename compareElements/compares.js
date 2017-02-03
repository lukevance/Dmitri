"use strict";

const compareJSON = require('deep-diff');


function compareConfigs (oldJSON, newJSON) {
  let changes = {};
  Object.key(oldJSON).forEach((config) => {
    if (config !== 'resources'){
      changes[config] = compareJSON(oldJSON[config], newJSON[config]);
    }
  });
  Object.keys(changes).forEach((config) => {
    console.log(changes[config].length);
  });
}

module.exports = compareConfigs;
