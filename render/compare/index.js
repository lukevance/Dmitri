"use strict";

const ctx = require("axel");
const bg = require("../colors").bg;
const fg = require("../colors").fg;

const checkCruds = require("../crudCheck");

const compareGraph = (resultsArray, compareFromLabel, compareToLabel, next) => {
  let compareFrom = 'Old';
  let compareTo = 'New';

  if (compareFromLabel !== null && compareToLabel !== null) {
    compareFrom = compareFromLabel;
    compareTo = compareToLabel;
  }

  ctx.clear();
  // set up outlines
  // light box
  bg('lightest');
  ctx.box(2, 2, 80, 1);
  bg('light-2');
  ctx.box(2, 3, 80, resultsArray.length + 1);
  // inner dark box
  bg('dark');
  ctx.box(20, 3, 62, resultsArray.length + 1);
  // set up headers
  bg('lightest');
  fg('dark');
  ctx.text(3, 2, "Resource");
  ctx.text(25, 2, compareFrom);
  ctx.text(40, 2, compareTo);
  ctx.text(50, 2, "Adds");
  ctx.text(60, 2, "Edits");
  ctx.text(70, 2, "Deletes");
  // print content
  let lineNum = 3;
  resultsArray.forEach((resourceName) => {
    // add headers for resources
    bg('light-2');
    fg('dark');
    ctx.text(3, lineNum, resourceName.resource);
    bg('dark');
    fg('lightest');

    checkCruds(resourceName, lineNum);

    if (resourceName.changes){
      fg('green');
      ctx.text(52, lineNum, resourceName.changes.filter(change => change.kind === 'N').length.toString());
      fg('yellow');
      ctx.text(62, lineNum, resourceName.changes.filter(change => change.kind === 'E').length.toString());
      fg('red');
      ctx.text(72, lineNum, resourceName.changes.filter(change => change.kind === 'D').length.toString());
      fg('lightest');
    }

    lineNum++;
  });

  ctx.cursor.restore();

  if (next){
    next(lineNum);
  }

};

const changes = (lineNum, resultsArray, resourceName) => {
  let currResources = resultsArray;
  let currLine = lineNum;
  if (resourceName){
    currResources = resultsArray.filter(resource => resourceName === resource.resource);
  }
  ctx.clear();
  currResources.forEach((resource) => {
    if (resource.changes) {
      fg('lightest');
      ctx.text(2, currLine, resource.resource);
      currLine += 2;
      fg('lightest');
      // currLine++;
      let currMethod;
      resource.changes.forEach((change) => {
        if (currMethod !== change.path[0]) {
          currMethod = change.path[0];
          fg('light-blue');
          ctx.text(8, currLine, currMethod);
          currLine++;
        }
        switch (change.kind) {
          case 'N':
            fg('green');
            break;
          case 'E':
            fg('yellow');
            break;
          case 'D':
            fg('red');
            break;
          default:
            fg('lightest');
        }
        ctx.text(10, currLine, change.path.slice(2).join('.'));
        currLine++;
        // if (change.kind && change.kind === 'E') {
        //   ctx.text(12, currLine, 'Prod: ');
        //   ctx.text(17, currLine, change.lhs);
        //   ctx.text(12, currLine, 'Local: ');
        //   ctx.text(17, currLine, change.rhs);
        //   currLine++;
        // } else if (change.kind && change.kind === 'N') {
        //   ctx.text(12, currLine, 'Prod: ');
        //   ctx.text(17, currLine, change.lhs);
        //   currLine++;
        // } else if (change.kind && change.kind === 'D') {
        //   ctx.text(12, currLine, 'Local: ');
        //   ctx.text(17, currLine, change.rhs);
        //   currLine++;
        // }
        fg('lightest');
      });
    }
  });
  ctx.cursor.restore();
};

module.exports = {
  compareGraph: compareGraph,
  resource: changes
};
