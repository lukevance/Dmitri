'use strict';

const program = require('commander');
const Preferences = require('preferences');


let prefs = new Preferences('dmitri');

program.parse(process.argv);

console.log(prefs);
