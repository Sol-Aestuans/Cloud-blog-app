const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');
const config = require('../config/config');

//set up the data we need to pass to the login method
const userCredentials = {
    email: config.get('test_username'), 
    password: config.get('test_password')
  }
  //login the user before we run any tests
  var authenticatedUser = request.agent(app);
  before(function(done){
    authenticatedUser
      .post('/user/login')
      .send(userCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(302);
        expect('Location', '/post');
        done();
      });
  });

  //after the login has completed, make sure the status code is 200 when requesting /post 
  //also make sure that the user has been directed to the proper page
  

  describe('GET /post', function(done){
    //addresses 1st bullet point: if the user is logged in we should get a 200 status code
      it('Authenticated requesting /post/: should return a 200', function(done){
        authenticatedUser.get('/post/')
        .expect(200, done);
      });

      it('Authenticated requessting /post/compose: should return a 200', function(done){
        authenticatedUser.get('/post/compose')
        .expect(200, done);
      });
    //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
      it('Non-user requesting /post/: should return a 302 response and redirect to /login', function(done){
        request(app).get('/post/')
        .expect('Location', '/user/login')
        .expect(302, done);
      });

      it('Non-user requesting /post/compose: should return a 302 response and redirect to /login', function(done){
        request(app).get('/post/compose')
        .expect('Location', '/user/login')
        .expect(302, done);
      });
    });