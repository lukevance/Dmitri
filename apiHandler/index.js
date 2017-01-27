"use strict";

// const request = require('request');
const rp = require('request-promise');

function getElementJson (url, auth, elementkey, next) {
  var options = {
      uri: url + '/elements/api-v2/elements/' + elementkey + '/export',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
      },
      json: true // Automatically parses the JSON string in the response
  };

  return rp(options)
    .then(r => next(r))
    .catch(err => console.log(err));
}

function getProdElement (elementkey, next){
  console.log('prod get json');
  let prodAuth = 'User DjaL6IZPL2Np7mF90Uce0uIGFGS24ZwHP6wwuJ+oRQQ=, Organization 54d6af8ca484b6468e8abf82f52cb628';
  getElementJson('https://console.cloud-elements.com', prodAuth, elementkey, next);
}

function getLocalElement (elementkey, next){
  console.log(elementkey);
  let localAuth = 'User FB3HWnO27jUB8pOuWqpioc4kquY4NYphQ4EemSKfw2U=, Organization 672aa88bb4e3235091de77900e3e299b';
  getElementJson('http://localhost:8080', localAuth, elementkey, next);
}


module.exports = {
  // getHubDocs: getHubDocs,
  getProdElement: getProdElement,
  getLocalElement: getLocalElement,
  authenticate: require('./auth').authenticate
};
