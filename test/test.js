var config    = require('config'),
    request   = require('supertest'),
    chai      = require('chai'),
    rs        = require('randomstring'),
    app       = require('../lib/app');

describe('App', function() {

  describe('GET /', function() {
    it('responds with HTML', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .expect('<h1>THIS IS WORKING</h1>', done)
    });
  });

  describe('GET /tags/yolo', function() {
    it('responds with the challenge key', function(done) {
      var challengeKey = rs.generate();
      request(app)
        .get('/tags/yolo')
        .query('hub.challenge=' + challengeKey)
        .expect('Content-Type', /html/)
        .expect(200)
        .expect(challengeKey, done);
    });
  });

});
