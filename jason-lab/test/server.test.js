//const { expect } = require('chai');
const app = require('../server');
const request = require('supertest')(app);


describe('ROUTES', function (){
  it('should return routed', function (done){
    request.get('/')
      .expect(200)
      .expect('routed')
      .expect('content-type', 'text/plain')
      .end(done);
  });
  it('should return Not Found', function (done){
    request.get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});
describe('ROUTES', function (){
  describe('POST /note', function (){
    it('should save body', function (done){
      request.post('/note')
      .send({ note: 'this is a note'})
      .expect(200)
      .expect({ note: 'this is a note'})
      .end(done);
    });
  });
});
