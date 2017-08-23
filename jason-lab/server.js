'use-strict';

const http = require('http');
const PORT = process.env.port || 3000;

const Router = require('./lib/router.js');
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
router.post('/note', (req, res) =>{
  res.writeHead(200, {
    'Content-Type':'application/json'
  });
  res.write(JSON.stringify(req.body));
  res.end();
});


const server = http.createServer(router.route());
module.exports = server;
