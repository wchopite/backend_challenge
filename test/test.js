var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('CustomJsonBerlinClock', () => {

  describe('/GET', () => {
    it('it should GET the current time json', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('sec');
            res.body.should.have.property('five_hour');
            res.body.should.have.property('one_hour');
            res.body.should.have.property('five_min');
            res.body.should.have.property('one_min');
          done();
        });
    });
  });

  describe('/POST', () => {
    it('it should GET the png image berlin clock representation', (done) => {

      var date = {
        "date": "2017-06-13T19:11:05"
      }

      chai.request(server)
        .post('/graph')
        .send(date)
        .end((err, res) => {
            res.should.have.status(200);            
          done();
        });
    });
  });
});
