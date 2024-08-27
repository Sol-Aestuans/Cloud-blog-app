const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');

  //testing logout

  describe('GET /user/logout', function(done){
    //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
      it('should return a 302 response and redirect to /user/login', function(done){
        request(app).get('/post/')
        .expect('Location', '/user/login')
        .expect(302, done);
      });
    });