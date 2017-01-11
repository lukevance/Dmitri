"use strict";

const ctx = require('axel');

function bg (color) {
  switch (color) {
    case 'dark':
      ctx.bg(15, 15, 15, 0.5);
      break;
    case 'lightest':
      ctx.bg(195, 195, 195, 0.75);
      break;
    case 'light-2':
      ctx.bg(105, 105, 105, 0.5);
  }
}

function fg (color) {
  switch (color) {
    case 'dark':
      ctx.fg(15, 15, 15, 0.5);
      break;
    case 'dark-blue':
      ctx.fg(15, 75, 75, 0.8);
      break;
    case 'lightest':
      ctx.fg(95, 95, 95, 0.5);
      break;
    case 'light-blue':
      ctx.fg(11, 91, 125);
      break;
    case 'green':
      ctx.fg(35, 155, 35);
      break;
    case 'yellow':
      ctx.fg(215, 207, 96);
      break;
    case 'red':
      ctx.fg(213, 79, 35);
      break;
  }
}

module.exports = {
  bg: bg,
  fg: fg
};
