"use strict";

const ctx = require("axel");
const bg = require("./colors").bg;
const fg = require("./colors").fg;

function checkCreate (resourceName, lineNum) {
  // check old for CREATE
  fg('lightest');
  if (resourceName.old && resourceName.old.CREATE){
    fg('green');
  }
  ctx.text(22, lineNum, 'C');

  fg('lightest');
  // check new for CREATE
  if (resourceName.new && resourceName.new.CREATE){
    fg('green');
  }
  ctx.text(37, lineNum, 'C');
}

function checkRetrieve (resourceName, lineNum) {
  // check old for CREATE
  fg('lightest');
  if (resourceName.old && resourceName.old.RETRIEVE){
    fg('green');
  }

  ctx.text(24, lineNum, 'R');
  fg('lightest');
  // check new for CREATE
  if (resourceName.new && resourceName.new.RETRIEVE){
    fg('green');
  }
  ctx.text(39, lineNum, 'R');
}

function checkUpdate (resourceName, lineNum) {
  // check old for CREATE
  fg('lightest');
  if (resourceName.old && resourceName.old.UPDATE){
    fg('green');
  }
  ctx.text(26, lineNum, 'U');

  fg('lightest');
  // check new for CREATE
  if (resourceName.new && resourceName.new.UPDATE){
    fg('green');
  }
  ctx.text(41, lineNum, 'U');
}

function checkDestroy (resourceName, lineNum) {
  // check old for CREATE
  fg('lightest');
  if (resourceName.old && resourceName.old.DESTROY){
    fg('green');
  }
  ctx.text(28, lineNum, 'D');

  // check new for CREATE
  fg('lightest');
  if (resourceName.new && resourceName.new.DESTROY){
    fg('green');
  }
  ctx.text(43, lineNum, 'D');
}

function checkSelect (resourceName, lineNum) {
  // check old for CREATE
  fg('lightest');
  if (resourceName.old && resourceName.old.SELECT){
    fg('green');
  }
  ctx.text(30, lineNum, 'S');

  // check new for CREATE
  fg('lightest');
  if (resourceName.new && resourceName.new.SELECT){
    fg('green');
  }
  ctx.text(45, lineNum, 'S');
}

function checkCruds (resourceName, lineNum) {
  checkCreate(resourceName, lineNum);
  checkRetrieve(resourceName, lineNum);
  checkUpdate(resourceName, lineNum);
  checkDestroy(resourceName, lineNum);
  checkSelect(resourceName, lineNum);
}

module.exports = checkCruds;
