"use strict";

const program = require('commander');
const dmitri = require('../index');
const requester = require('../apiHandler');

const terminate = (msg, args) => {
  args ? console.error(msg, args) : console.error(msg);
  process.exit(1);
};

const localToProd = (elementkey, next, options) => {
  requester.getLocalElement(elementkey, (localElement) => {
    requester.getProdElement(elementkey, (prodElement) => {
      if (options.resource) {
        next(prodElement, localElement, options.resource);
      } else if (options.labels) {
        next(prodElement, localElement, options.labels[0], options.labels[1]);
      } else {
        next(prodElement, localElement, 'Prod', 'Local');
      }
    });
  });
};

const fileToProd = (elementkey, pathToFile) => {
  if (typeof pathToFile === 'string' && (pathToFile.indexOf('.json') > 0)) {
    requester.getFile(pathToFile, (elementJSON) => {
      console.log(Object.keys(elementJSON));
    });
  } else {
    console.log('Not valid filePath or json filetype');
  }
};

const configuration = function (elementkey){
  console.log(elementkey);
  requester.getLocalElement(elementkey, (localElement) => {
    // console.log(Object.keys(localElement));
    // console.log(localElement.configuration);
    dmitri.configs(localElement);
  });
};

const prodLocal = (options) => {
  // if (elementkey && !options.resource && !options.file && !options.labels){
  //   // by default compare prod and local elements via elementkey
  //   localToProd(elementkey, dmitri.cruds, {labels: ['Prod', 'Local']});
  // }
  console.log('prod local');
  console.log(options);
};

const compare = (compareStage, options) => {
  console.log("options");
  if (compareStage) {
    // console.log(Object.keys(options));
    // console.log(options.resource);
    // if (options.configs) {
    //   configuration(elementkey);
    // } else if (options.file) {
    //   console.log('the file options');
    //   fileToProd(elementkey, options.file);
    //
    // } else if (options.resource){
    //   console.log(options.resource);
    //   localToProd(elementkey, dmitri.resource, {resource: options.resource});
    //   // show
    // } else if (elementkey && !options.resource && !options.file && !options.labels){
    //   // by default compare prod and local elements via elementkey
    //   localToProd(elementkey, dmitri.cruds, {labels: ['Prod', 'Local']});
    // } else {
    //   console.log('you messed up the command');
    // }
    console.log(compareStage);
    switch (compareStage) {
      case "local":
        console.log('here');
        prodLocal(options);
        break;
      case "staging":
        console.log('staging');
        break;
      case "prod":
        console.log('prod');
        break;
      case "file":
        console.log('file');
        break;
      default:
        terminate('Not a valid stage input');
        break;
    }
  } else {
    if (!compareStage) {
        terminate('No enviroment provided');
    } else if (!options) {
        terminate('No options provided');
    }
  }
};

program
  .command('env', '[local || staging || prod || file]')
  .action((compareStage, options) => compare(compareStage, options))
  .option('-k, --elementkey', 'overrides the elementkey of the currently checked out element')
  .option('-c, --configs', 'compares config values')
  .option('-r, --resource <resourceName', 'shows change details for specific resource')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri compare local {elementKey}');
    console.log('    $ dmitri compare file /path/to/file/element.json');
    console.log('');
  })
  .parse(process.argv);

// authenticate user
// requester.authenticate();
// let oldJson
  // cruds(oldJson, newJson);
// requester.getProdElement(elementkey);
// console.log(program);
