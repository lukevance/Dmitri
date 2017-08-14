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

const configuration = (elementkey) => {
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

const setStage = (options) => {
  console.log(options);
  switch (options.env) {
    case "staging":


      break;
    default:

  }
  // return promise to resolve with element.json
};

const compare = (property, options) => {
  setStage(options)
  .then((element) => {

  });
  if (property) {
    console.log(property);
    switch (property) {
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
    if (!property) {
        terminate('No property provided');
    } else if (!options) {
        terminate('No options provided');
    }
  }
};

program
  .command('property', '[configs || resources || path.to.property]')
  .action((property, options) => compare(property, options))
  .option('-e, --env <environment>', 'overrides the default environment for comparison to other env')
  .option('-k, --key <elementkey>', 'overrides the elementkey with a specific other element')
  .option('-f, --file <filePath>', 'compares to specific element.json file')
  .on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ dmitri compare configs');
    console.log('    $ dmitri compare resources /path/to/file/element.json');
    console.log('    $ dmitri compare resources.users.create.body --env staging --key shopify');
    console.log('');
  })
  .parse(process.argv);

// authenticate user
// requester.authenticate();
// let oldJson
  // cruds(oldJson, newJson);
// requester.getProdElement(elementkey);
// console.log(program);
