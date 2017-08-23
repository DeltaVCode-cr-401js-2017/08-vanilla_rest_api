'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');



describe('GET /', function (){
  it('should return routed', function (done){
    request.get('/')
      .end((err,res) => {
        if(err) return done(err);

        expect(res.status).to.equal(200);
        expect(res.text).to.equal('routed');
        console.log(res);
        done();
      });
  });
});
