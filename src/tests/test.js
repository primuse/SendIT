import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


chai.use(chaiHttp);
const { expect } = chai;

let myToken = null;

before((done) => {
  const userCredentials = {
    email: 'tikuokoye@yahoo.com',
    password: 'cim',
  };
  chai.request(server).post('/api/v1/auth/login')
    .send(userCredentials)
    .end((err, res) => {
      if (err) throw err;
      myToken = res.body.data[0].token;
      done(err);
    });
});
// Test index API route
describe('GET /', () => {
  it('should display welcome to SENDIT!', (done) => {
    chai.request(server).get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to SendIT!');
        done(err);
      });
  });
});

// Test for creating new parcels with DB
describe('POST /parcels', () => {
  it('should create a new parcel in the DB', (done) => {
    const parcel = {
      parcelName: 'Kiki',
      price: 100,
      weight: 30,
      pickupLocation: 'Lagos',
      destination: 'Owerri',
      status: 'Created',
      receiver: 'Tiku Okoye',
      email: 'okoyetiku@gmail.com',
      phoneNumber: '08129814330',
      currentLocation: 'Lagos',
    };
    chai.request(server).post('/api/v1/parcels')
      .set('x-access-token', myToken)
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.rows).to.be.an('object');
        done(err);
      });
  });
  it('should return a DB error', (done) => {
    const parcel = {
      parcelName: 'Kiki',
      prices: 100,
      weight: 30,
      pickupLocation: 'Lagos',
      destination: 'Owerri',
      status: 'Created',
      receiver: 'Tiku Okoye',
      email: 'okoyetiku@gmail.com',
      phoneNumber: '08129814330',
      currentLocation: 'Lagos',
    };
    chai.request(server).post('/api/v1/parcels')
      .set('x-access-token', myToken)
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
});

// Test for creating new users with DB
describe('POST /auth/signup', () => {
  it('should create a new user in the DB', (done) => {
    const user = {
      firstName: 'Joseph',
      lastName: 'Julius',
      email: 'okoyetiku@yahoo.com',
      password: 'tiku',
    };
    chai.request(server).post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([201, 400]);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});

// Test for login users into the app
describe('POST /auth/login', () => {
  it('should login users to the app', (done) => {
    const user = {
      email: 'okoyetiku@yahoo.com',
      password: 'tiku',
    };
    chai.request(server).post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an('array');
        done(err);
      });
  });
  it('should display error if invalid password passed', (done) => {
    const user = {
      email: 'okoyetiku@yahoo.com',
      password: 'okoye',
    };
    chai.request(server).post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Invalid email or password');
        done(err);
      });
  });
  it('should display error if invalid email passed', (done) => {
    const user = {
      email: 'favourokoye@yahoo.com',
      password: 'okoye',
    };
    chai.request(server).post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Authentication failed. User not found');
        done(err);
      });
  });
});


// Test for getting all parcel delivery orders
describe('GET /parcels', () => {
  it('should return all parcels', (done) => {
    chai.request(server).get('/api/v1/parcels')
      .set('x-access-token', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).get('/api/v1/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
  it('should return an error if wrong token provided', (done) => {
    chai.request(server).get('/api/v1/parcels')
      .set('x-access-token', 'tiku')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Failed to authenticate token.');
        done(err);
      });
  });
});

// Test for getting a parcel delivery order with ID
describe('GET /parcels/:parcelId', () => {
  it('should return parcel with ID given', (done) => {
    chai.request(server).get('/api/v1/parcels/1')
      .set('x-access-token', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if ID is invalid', (done) => {
    chai.request(server).get('/api/v1/parcels/100')
      .set('x-access-token', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No Permission to view this parcel');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).get('/api/v1/parcels/100')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
});

// Test for updating a Parcel destination with ID
describe('PATCH /parcels/:parcelId/destination', () => {
  const value = { destination: 'Lagos' };
  const errorValue = { destination: 123 };
  const noValue = {};
  it('should change parcel destination to provided value', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/destination')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 400]);
        expect(res.body.message).to.equal('Order updated');
        done(err);
      });
  });
  it('should return an error if parcel status = delivered or parcel not found', (done) => {
    chai.request(server).patch('/api/v1/parcels/100/destination')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No Permission to view this parcel');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/destination')
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
  it('should return an error if invalid destination passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/destination')
      .set('x-access-token', myToken)
      .send(errorValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if no destination passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/destination')
      .set('x-access-token', myToken)
      .send(noValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});

// Test for changing location of a parcel
describe('PATCH /parcels/:parcelId/currentLocation', () => {
  const value = { currentLocation: 'Uyo' };
  const errorValue = { currentLocation: 123 };
  const noValue = {};
  it('should change parcel currentLocation to provided value', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/currentLocation')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 400]);
        expect(res.body.message).to.equal('Location updated');
        done(err);
      });
  });
  it('should return an error if parcel status = delivered or parcel not found', (done) => {
    chai.request(server).patch('/api/v1/parcels/100/currentLocation')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No parcel found or already delivered');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/currentLocation')
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
  it('should return an error if invalid location passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/currentLocation')
      .set('x-access-token', myToken)
      .send(errorValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if no location passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/currentLocation')
      .set('x-access-token', myToken)
      .send(noValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});

// Test for canceling a Parcel with ID
describe('PATCH /parcels/:parcelID/cancel', () => {
  it('should change parcel status to canceled', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/cancel')
      .set('x-access-token', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.message).to.equal('Order Canceled');
        done(err);
      });
  });
  it('should return an error if parcel status = delivered or parcel not found', (done) => {
    chai.request(server).patch('/api/v1/parcels/100/cancel')
      .set('x-access-token', myToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No Permission to view this parcel');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
});

// Test for changing status of a parcel
describe('PATCH /parcels/:parcelId/status', () => {
  const value = { status: 'In-transit' };
  const errorValue = { status: 123 };
  const noValue = {};
  it('should change parcel status to provided value', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/status')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Status has been updated to In-transit');
        done(err);
      });
  });
  it('should return an error if parcel status = delivered or parcel not found', (done) => {
    chai.request(server).patch('/api/v1/parcels/100/status')
      .set('x-access-token', myToken)
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No parcel found or already delivered');
        done(err);
      });
  });
  it('should return an error if no token provided', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/status')
      .send(value)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No token provided.');
        done(err);
      });
  });
  it('should return an error if invalid status passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/status')
      .set('x-access-token', myToken)
      .send(errorValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if no status passed', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/status')
      .set('x-access-token', myToken)
      .send(noValue)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});
