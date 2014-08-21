var config    = require('config'),
    request   = require('supertest'),
    chai      = require('chai'),
    app       = require('../app');

describe('App', function() {

  describe('GET /', function() {
    it('responds with HTML', function(done) {
      request(app)
      .get('/')
      .expect(200, done);
    });
  });

});
