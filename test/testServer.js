var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var chaiHttp = require('chai-http');
chai.use(chaiAsPromised);
var app = require('../server');
var expect =chai.expect;
var should=chai.should();

chai.use(chaiHttp);

describe('App', function() {
  this.timeout(50000);
  describe('sample tests:', function() {
  it('responds with status 200', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      //expect(res).to.be.json;
      //assert.equal(200, res.statusCode);
      //console.log(res);
      expect(res).to.have.status(200);
      //expect(res).to.be.json;
    });
});
  it('responds with status 404', function() {
    return chai.request(app).post('/gas').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      expect(res).to.have.status(404);
    });
});
  it('responds with JSON', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      expect(res).to.be.json;
    });
});
  it('has property address', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      res.body.should.have.property('address');
    });
});
  it('has property geoLocation', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      res.body.should.have.property('geoLocation');
    });
});
  it('has property price', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      res.body.should.have.property('price');
    });
});
  it('check the returned address', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'10'}).then(function(res, body){
      res.body.address.should.equal('390 Langner Rd, 14224');
    });
});
    it('check the returned address when input radius is 0', function() {
    return chai.request(app).post('/gas-station').send({'origin':{lat:'42.8864',lng:'-78.8784'},'fuel':'reg','radius':'0'}).then(function(res, body){
      should.not.exist(res.body.address);
    });
});
});
});
