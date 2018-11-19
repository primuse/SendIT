import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';


chai.use(chaiHttp);
const { expect } = chai;

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
      placedBy: 3,
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
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data[0].message).to.equal('Order Created');
        done(err);
      });
  });
});

// Test for creating new users with DB
describe('POST /users', () => {
  it('should create a new user in the DB', (done) => {
    const user = {
      firstName: 'Joseph',
      lastName: 'Julius',
      otherNames: 'John',
      username: 'jude',
      email: 'okoyetiku@yahoo.com',
      password: 'tiku',
    };
    chai.request(server).post('/api/v1/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data[0].message).to.equal('User Created');
        done(err);
      });
  });
});


// Test for getting all parcel delivery orders
describe('GET /parcels', () => {
  it('should return all parcels', (done) => {
    chai.request(server).get('/api/v1/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });
});

// Test for getting a parcel delivery order with ID
describe('GET /parcels/:parcelId', () => {
  it('should return parcel with ID given', (done) => {
    chai.request(server).get('/api/v1/parcels/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if ID is invalid', (done) => {
    chai.request(server).get('/api/v1/parcels/21')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('No parcel with given id');
        done(err);
      });
  });
});

// Test for canceling a Parcel with ID
describe('PUT /parcels/:parcelID/cancel', () => {
  it('should change parcel status to canceled', (done) => {
    chai.request(server).patch('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data[0].message).to.equal('Order Canceled');
        done(err);
      });
  });
  it('should return an error if parcel status = delivered or parcel not found', (done) => {
    chai.request(server).patch('/api/v1/parcels/20/cancel')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No parcel found or already delivered');
        done(err);
      });
  });
});
