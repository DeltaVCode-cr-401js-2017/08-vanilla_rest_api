'use-strict';

const http = require('http');
const PORT = process.env.port || 3000;
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const DeadCharacter = require('./model/simple-resource.js');
const router = new Router();


if (!module.parent){
  server.listen(PORT, () =>{
    console.log(`HTTP listening on ${PORT}`);
  });
}

router.get('/', (req, res) =>{
  res.writeHead(200, {
    'Content-Type':'text/plain'
  });
  res.write('routed');
  res.end();
});

router.get('/api/dead', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('dead', req.url.query.id)
    .then(dead => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(dead));
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('person not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});

router.post('/api/dead', (req, res) =>{
  res.writeHead(200, {
    'Content-Type':'application/json'
  });
  res.write(JSON.stringify(req.body));
  res.end();
});


const server = http.createServer(router.route());
module.exports = server;
