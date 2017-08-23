'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const uuid = require('uuid');

const Router = require('./lib/router');
const router = new Router();

router.get('/', function(req,res){
  console.log(req.method,req.url);
  res.writeHead(200,{'content-type': 'text/plain'});
  res.write('Routed');
  res.end();
});

router.post('/note',(req,res) => {
  const note = Object.assign({
    id: uuid.v1(),
  },req.body);

  console.log('note ',note);
  res.writeHead(200,{'content-type': 'text/plain'});
  res.write(JSON.stringify(note));
  res.end();
});

router.get('/note',(req,res) => {
  if (req.url.query.id){
    res.writeHead(400,
      {'content-type': 'text/plain'});
  }
  res.write('Bad Request');
  return res.end();
});

const server = http.createServer(router.route());

if (!module.parent){
  server.listen(PORT, function(){
    console.log(`Listening to port ${PORT}`);
  });
}

module.exports = server;
