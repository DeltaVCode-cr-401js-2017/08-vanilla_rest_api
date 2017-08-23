//const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);

describe('GET /', function (){
  it('should return routed', function (done){
    request.get('/')
      .expect(200)
      .expect('routed')
      .end(done);
  });
});
