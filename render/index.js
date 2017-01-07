"use strict";

const ctx = require("axel");
const bg = require("./colors").bg;
const fg = require("./colors").fg;

const checkCruds = require("./crudCheck");

function compareGraph (resultsArray){
  ctx.clear();
  // set up outlines
  // light box
  bg('lightest');
  ctx.box(2, 2, 80, 1);
  bg('light-2');
  ctx.box(2, 3, 80, resultsArray.length + 1);
  // inner dark box
  bg('dark');
  ctx.box(20, 3, 63, resultsArray.length + 1);
  // set up headers
  bg('lightest');
  fg('dark');
  ctx.text(3, 2, "Resource");
  ctx.text(25, 2, "Old");
  ctx.text(40, 2, "New");
  ctx.text(55, 2, "Additions");
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



      lineNum++;
  });

  ctx.cursor.restore();



}

module.exports = {
  compareGraph: compareGraph
};
