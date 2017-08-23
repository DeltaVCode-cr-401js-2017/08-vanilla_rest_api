'use-strict';

const http = require('http');
const PORT = process.env.port || 3000;

const Router = require('./lib/router.js');
const router = new Router();

const server = http.createServer(router.route());

server.listen(PORT, () =>{
  console.log(`HTTP listening on ${PORT}`);
});
