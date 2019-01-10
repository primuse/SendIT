"use strict";

var _mocha = require("mocha");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

var expect = _chai.default.expect;
var myToken = null;
(0, _mocha.before)(function (done) {
  var userCredentials = {
    email: 'tikuokoye@yahoo.com',
    password: 'cim'
  };

  _chai.default.request(_index.default).post('/api/v1/auth/login').send(userCredentials).end(function (err, res) {
    if (err) throw err;
    myToken = res.body.data[0].token;
    done(err);
  });
}); // Test index API route

(0, _mocha.describe)('GET /', function () {
  (0, _mocha.it)('should display welcome to SENDIT!', function (done) {
    _chai.default.request(_index.default).get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Welcome to SendIT!');
      done(err);
    });
  });
}); // Test for creating new parcels with DB

(0, _mocha.describe)('POST /parcels', function () {
  (0, _mocha.it)('should create a new parcel in the DB', function (done) {
    var parcel = {
      parcelName: 'Kiki',
      price: 100,
      weight: 30,
      pickupLocation: 'Lagos',
      destination: 'Owerri',
      status: 'Created',
      receiver: 'Tiku Okoye',
      email: 'okoyetiku@gmail.com',
      phoneNumber: '08129814330',
      currentLocation: 'Lagos'
    };

    _chai.default.request(_index.default).post('/api/v1/parcels').set('x-access-token', myToken).send(parcel).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body.rows).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return a DB error', function (done) {
    var parcel = {
      parcelName: 'Kiki',
      prices: 100,
      weight: 30,
      pickupLocation: 'Lagos',
      destination: 'Owerri',
      status: 'Created',
      receiver: 'Tiku Okoye',
      email: 'okoyetiku@gmail.com',
      phoneNumber: '08129814330',
      currentLocation: 'Lagos'
    };

    _chai.default.request(_index.default).post('/api/v1/parcels').set('x-access-token', myToken).send(parcel).end(function (err, res) {
      expect(res.status).to.equal(400);
      done(err);
    });
  });
}); // Test for creating new users with DB

(0, _mocha.describe)('POST /auth/signup', function () {
  (0, _mocha.it)('should create a new user in the DB', function (done) {
    var user = {
      firstName: 'Joseph',
      lastName: 'Julius',
      email: 'okoyetiku@yahoo.com',
      password: 'tiku'
    };

    _chai.default.request(_index.default).post('/api/v1/auth/signup').send(user).end(function (err, res) {
      expect(res.status).to.be.oneOf([201, 400]);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
}); // Test for login users into the app

(0, _mocha.describe)('POST /auth/login', function () {
  (0, _mocha.it)('should login users to the app', function (done) {
    var user = {
      email: 'okoyetiku@yahoo.com',
      password: 'tiku'
    };

    _chai.default.request(_index.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
      done(err);
    });
  });
  (0, _mocha.it)('should display error if invalid password passed', function (done) {
    var user = {
      email: 'okoyetiku@yahoo.com',
      password: 'okoye'
    };

    _chai.default.request(_index.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Invalid email or password');
      done(err);
    });
  });
  (0, _mocha.it)('should display error if invalid email passed', function (done) {
    var user = {
      email: 'favourokoye@yahoo.com',
      password: 'okoye'
    };

    _chai.default.request(_index.default).post('/api/v1/auth/login').send(user).end(function (err, res) {
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Authentication failed. User not found');
      done(err);
    });
  });
}); // Test for getting all parcel delivery orders

(0, _mocha.describe)('GET /parcels', function () {
  (0, _mocha.it)('should return all parcels', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels').set('x-access-token', myToken).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data[0]).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels').end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if wrong token provided', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels').set('x-access-token', 'tiku').end(function (err, res) {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('Failed to authenticate token.');
      done(err);
    });
  });
}); // Test for getting a parcel delivery order with ID

(0, _mocha.describe)('GET /parcels/:parcelId', function () {
  (0, _mocha.it)('should return parcel with ID given', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/1').set('x-access-token', myToken).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if ID is invalid', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/100').set('x-access-token', myToken).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No Permission to view this parcel');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).get('/api/v1/parcels/100').end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
}); // Test for updating a Parcel destination with ID

(0, _mocha.describe)('PATCH /parcels/:parcelId/destination', function () {
  var value = {
    destination: 'Lagos'
  };
  var errorValue = {
    destination: 123
  };
  var noValue = {};
  (0, _mocha.it)('should change parcel destination to provided value', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/destination').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.be.oneOf([200, 400]);
      expect(res.body.message).to.equal('Order updated');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if parcel status = delivered or parcel not found', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/100/destination').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('No Permission to view this parcel');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/destination').send(value).end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if invalid destination passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/destination').set('x-access-token', myToken).send(errorValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no destination passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/destination').set('x-access-token', myToken).send(noValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
}); // Test for changing location of a parcel

(0, _mocha.describe)('PATCH /parcels/:parcelId/currentLocation', function () {
  var value = {
    currentLocation: 'Uyo'
  };
  var errorValue = {
    currentLocation: 123
  };
  var noValue = {};
  (0, _mocha.it)('should change parcel currentLocation to provided value', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/currentLocation').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.be.oneOf([200, 400]);
      expect(res.body.message).to.equal('Location updated');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if parcel status = delivered or parcel not found', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/100/currentLocation').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('No parcel found or already delivered');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/currentLocation').send(value).end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if invalid location passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/currentLocation').set('x-access-token', myToken).send(errorValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no location passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/currentLocation').set('x-access-token', myToken).send(noValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
}); // Test for canceling a Parcel with ID

(0, _mocha.describe)('PATCH /parcels/:parcelID/cancel', function () {
  (0, _mocha.it)('should change parcel status to canceled', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/cancel').set('x-access-token', myToken).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.data.message).to.equal('Order Canceled');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if parcel status = delivered or parcel not found', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/100/cancel').set('x-access-token', myToken).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('No Permission to view this parcel');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/cancel').end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
}); // Test for changing status of a parcel

(0, _mocha.describe)('PATCH /parcels/:parcelId/status', function () {
  var value = {
    status: 'In-transit'
  };
  var errorValue = {
    status: 123
  };
  var noValue = {};
  (0, _mocha.it)('should change parcel status to provided value', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/status').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Status has been updated to In-transit');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if parcel status = delivered or parcel not found', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/100/status').set('x-access-token', myToken).send(value).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal('No parcel found or already delivered');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no token provided', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/status').send(value).end(function (err, res) {
      expect(res.status).to.equal(403);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.equal('No token provided.');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if invalid status passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/status').set('x-access-token', myToken).send(errorValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
  (0, _mocha.it)('should return an error if no status passed', function (done) {
    _chai.default.request(_index.default).patch('/api/v1/parcels/1/status').set('x-access-token', myToken).send(noValue).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      done(err);
    });
  });
});