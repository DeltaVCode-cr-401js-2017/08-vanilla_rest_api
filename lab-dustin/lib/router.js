'use strict';

const parseUrl = require('./parse-url');
const parseJSON = require('./parse-json');

const Router = module.exports = function(){

};

Router.prototype.route = function(){
  return function(req,res){
    Promise.all([
      parseUrl(req),
      parseJSON(req)
    ])
    .then(() => {
      console.log(req.method,req.url);

      res.write('Routed');
      res.end();
    })
    .catch(err => {
      res.writeHead(
        500,
        {'content-type': 'text/plain'}
      );
      res.write(err.message);
      res.end();
    });
  };
};
