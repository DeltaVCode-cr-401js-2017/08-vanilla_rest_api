'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

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
  var note = null;

  describe('POST /note',function(){
    it('should save the body',function(done){
      request.post('/note')
        .send({note: 'this is a note'})
        .expect(200)
        .expect(res => {
          expect(res.body.note).to.equal('this is a note');
          expect(res.body.id).to.not.be.empty;
          note = res.body;
        })
        .end(done);
    });
    it('should return bad request if there was no body or if the request was invalid',function(done){
      request.post('/note')
        .send()
        .expect(400)
        .expect('Bad Request')
        .end(done);
    });
    it('should return bad request if given invalid body',function(done){
      request.post('/note')
        .send('{json: "this is not json"}')
        .expect(400)
        .expect('Bad Request')
        .end(done);
    });
  });

  describe('GET /note', function(){
    it('should return a bad request when not given an id in url query',function(done){
      request
        .get('/note')
        .expect(400)
        .expect('content-type', 'text/plain')
        .expect('Bad Request')
        .end(done);
    });
    it('should return not found if the note does not exist',function(done){
      request
        .get('/note?id=1')
        .expect(404)
        .expect('content-type', 'text/plain')
        .expect('Not Found')
        .end(done);
    });
    it('should return the note if the id is valid',function(done){
      console.log(note);
      request
        .get(`/note?id=${note.id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.note).to.equal(note.note);
          expect(res.body.id).to.equal(note.id);
        })
        .end(done);
    });
  });

  describe('DELETE /note',function(){
    it('should return 204 OK if it deleted the note',function(done){
      request.delete(`/note?id=${note.id}`)
      .expect(204)
      .end(done);
    });
  });
});
