"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect();

_chai.default.use(_chaiHttp.default); // To get parcel delivery order with ID


describe('GET /parcels/:parcelId', function () {
  it('should return error if invalid ID is passed', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/100').end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('No parcel with given ID');
      done(err);
    });
  });
  it('should return parcel if Id is valid', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/100').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
});