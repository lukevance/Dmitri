"use strict";

const rp = require('request-promise');

function getAuth () {
  const secUrl = url + '/elements/j_spring_security_check';
  const authOptions = { jar: true, form: { j_username: props.get('user'), j_password: props.get('password') } };


  var options = {
    method: "GET",
    uri: 'http://localhost:8080/elements/api-v1/ui/getSecrets',
    qs: {
      access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    body: {jar: true},
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true, // Automatically parses the JSON string in the response
    resolveWithFullResponse: true
  };

  return rp(options)
    .then(function (response) {
      console.log('response');
      console.log(response);
    })
    .catch(function (err) {
      // API call failed...
      console.log(err);
    });
}

module.exports = {
  authenticate: getAuth
};
