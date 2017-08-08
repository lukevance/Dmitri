'use strict';

const compare = require('./compare');
const show = require('./show');

module.exports = {
  compareGraph: compare.compareGraph,
  compareResource: compare.resource,
  show: show.show
};
