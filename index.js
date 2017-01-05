"use strict";

const compareJSON = require('deep-diff').diff;
const getResources = require('./getInfo').getResources;
const combineResources = require('./combineResults').combine;

const ctx = require('axel');

// get path names for files from arguments
let oldJson = require(process.argv[2]);
let newJson = require(process.argv[3]);

// strip resources from element JSON
let oldResources = getResources(oldJson);
let newResources = getResources(newJson);

// combine resources into one object for comparing
let results = combineResources(oldResources, newResources);


// render in console
ctx.clear();
// set up headers
ctx.text(1, 1, "Resource");
ctx.text(25, 1, "Old");
ctx.text(50, 1, "New");
// print content
let lineNum = 2;
results.forEach((resourceName) => {
  ctx.text(1, lineNum, resourceName.resource);
  if (resourceName.old){
    ctx.fg(35, 155, 35);
    ctx.text(25, lineNum, resourceName.old.toString());
  } else {

  }
  ctx.text(50, lineNum, resourceName.new.toString());
  lineNum++;
});
ctx.cursor.restore();

//
// let differences = compareJSON(oldResources, newResources);
// //
// console.log(differences);

// let result = [
//   {
//     resource: 'name',
//     old: {
//        Create: {
//          path: '',
//          method: '',
//          description: ''
//        },
//        Retrieve: {},
//        Destroy: {}
//      },
//     new: {
//       Create: {
//         changed: ['list of changed properties']
//       }
//     }
//   }
// ];
