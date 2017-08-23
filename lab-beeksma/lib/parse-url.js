'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = function(req){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  
};
