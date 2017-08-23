'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function(){

};

Router.prototype.route = function(){
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req),
    ]).then(() =>{
      console.log(req.method, req.url);
      res.write('routed');
      res.end();
    }).catch(err =>{
      res.writeHead(500);
      res.write(err.message);
      res.end();
    });

  };
};
