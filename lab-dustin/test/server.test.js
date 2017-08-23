'use strict';

const app = require('../server');
const request = require('supertest')(app);
//const { expect } = require('chai');

describe('GET /', function(){
  it('should return routed', function(done){
    request
      .get('/')
        .expect(200)
        .expect('Routed')
        .expect('content-type', 'text/plain')
        .end(done);
  });

  it('should return not found for missing path', function(done){
    request
      .get('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });

  it('should return not found for POST missing path', function(done){
    request
      .post('/404')
      .expect(404)
      .expect('Not Found')
      .expect('content-type', 'text/plain')
      .end(done);
  });
});

describe('Simple Resource',function(){
  describe('POST /note',function(){
    it('should save the body',function(done){
      request
        .post('/note')
        .expect(200)
        .expect(res => {
          expect(res.note.body).to.be.equal('this is a note');
          expect(res.note.id).to.not.be.empty;
        });
      done();
    });
  });
});
