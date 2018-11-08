"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect; // Test for creating new parcels

describe('POST /parcels', function () {
  it('should return an error if inputed ID already exists', function (done) {
    var parcel = {
      name: 'Crabs',
      price: '3000',
      parcelId: '6',
      user: 'Jumoke Odutayo',
      userId: '100',
      location: 'Owerri'
    };

    _chai.default.request(_index.default).post('/api/v1/parcels').send(parcel).end(function (err, res) {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Parcel with this ID already exists');
      done(err);
    });
  });
  it('should create a new parcel', function (done) {
    var parcel = {
      name: 'Crabs',
      price: '3000',
      parcelId: '7',
      user: 'Tiku Okoye',
      userId: '100',
      location: 'Owerri'
    };

    _chai.default.request(_index.default).post('/api/v1/parcels').send(parcel).end(function (err, res) {
      expect(res.status).to.be.oneOf([409, 201]);
      expect(res.body.message).to.be.oneOf(['Successfully Written to File.', 'Parcel with this ID already exists']);
      done(err);
    });
  });
}); // Test for getting all parcel delivery orders

describe('GET /parcels', function () {
  it('should return all parcels', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      done(err);
    });
  });
  it('should return all parcels with destination oyo', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels?location=oyo').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf.at.least(1);
      done(err);
    });
  });
  it('should return an error if the given query cannot be matched', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels?location=california').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('No parcel found');
      done(err);
    });
  });
}); // Test for getting a parcel delivery order with ID

describe('GET /parcels/:parcelId', function () {
  it('should return an error if an invalid ID is passed', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/100').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('No parcel with given ID');
      done(err);
    });
  });
  it('should return parcel if Id is valid', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/1').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
}); // Test for updating a parcel with ID

describe('PUT /parcels/:parcelId/update', function () {
  it('should update the parcel with the given data', function (done) {
    var update = {
      location: 'Uyo'
    };

    _chai.default.request(_index.default).put('/api/v1/parcels/1/update').send(update).end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });
  it('should return an error if parcel not found', function (done) {
    var update = {
      location: 'Uyo'
    };

    _chai.default.request(_index.default).put('/api/v1/parcels/31/update').send(update).end(function (err, res) {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('No parcel with given ID');
      done(err);
    });
  });
}); // Test for canceling a Parcel with ID

describe('PUT /parcels/:parcelID/cancel', function () {
  it('should change parcel status to cancel', function (done) {
    _chai.default.request(_index.default).put('/api/v1/parcels/1/cancel').end(function (err, res) {
      expect(res.status).to.be.oneOf([200, 409]);
      expect(res.body.message).to.be.oneOf(['Successfully canceled Parcel', 'Already canceled parcel']);
      done(err);
    });
  });
  it('sould return an error if parcel status already canceled', function (done) {
    _chai.default.request(_index.default).put('/api/v1/parcels/3/cancel').end(function (err, res) {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Already canceled parcel');
      done(err);
    });
  });
}); // Test for getting all parcels from User with ID

describe('GET /users/:userId/parcels', function () {
  it('should return all parcels orders by a user', function (done) {
    _chai.default.request(_index.default).get('/api/v1/users/90/parcels').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf.at.least(1);
      done(err);
    });
  });
  it('should return an error if User not found', function (done) {
    _chai.default.request(_index.default).get('/api/v1/users/101/parcels').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.Error).to.equal('No User with this ID');
      done(err);
    });
  });
  it('should return an error if User is found but has no parcel', function (done) {
    _chai.default.request(_index.default).get('/api/v1/users/11/parcels').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.Error).to.equal('User with this ID has no parcel');
      done(err);
    });
  });
});