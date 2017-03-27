"use strict";

const fs = require('fs');


const getFile = function (filepath, next) {
 let contents = 'No contents yet';
 fs.readFile(filepath, 'utf8', (err, data) => {
   if (err) {
     console.log(err);
   } else {
     next(JSON.parse(data));
   }
 });
};


module.exports = getFile;
