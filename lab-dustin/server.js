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

const storage = {};

router.post('/note',(req,res) => {
  let note = Object.assign({
    id: uuid.v1(),
  },req.body);
  storage[note.id] = note;
  console.log('note ',note);
  res.writeHead(200,{'content-type': 'application/json'});
  res.write(JSON.stringify(note));
  //storage.createItem()
  res.end();
});

router.get('/note',(req,res) => {
  //storage.fetchItem();
  console.log(storage[req.url.query.id]);
  if (!req.url.query.id){
    res.writeHead(400,
      {'content-type': 'text/plain'});
    res.write('Bad Request');
    return res.end();
  }
  if (!storage[req.url.query.id]){
    console.log(`Note ${req.url.query.id} does not exist.`);
    res.writeHead(404,
      {'content-type': 'text/plain'}
    );
    res.write('Not Found');
    res.end();
  }
});

const server = http.createServer(router.route());

if (!module.parent){
  server.listen(PORT, function(){
    console.log(`Listening to port ${PORT}`);
  });
}

module.exports = server;
