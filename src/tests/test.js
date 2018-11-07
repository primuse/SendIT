import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

// Test for creating new parcels
describe('POST /parcels', () => {
  it('should return an error if inputed ID already exists', (done) => {
    const parcel = {
      name: 'Crabs',
      price: '3000',
      parcelId: '6',
      user: 'Jumoke Odutayo',
      userId: '100',
      location: 'Owerri',
    };
    chai.request(server).post('/api/v1/parcels')
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Parcel with this ID already exists');
        done(err);
      });
  });
  it('should create a new parcel', (done) => {
    const parcel = {
      name: 'Crabs',
      price: '3000',
      parcelId: '7',
      user: 'Tiku Okoye',
      userId: '100',
      location: 'Owerri',
    };
    chai.request(server).post('/api/v1/parcels')
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([409, 201]);
        expect(res.body.message).to.be.oneOf(['Successfully Written to File.', 'Parcel with this ID already exists']);
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
        expect(res.body).to.be.an('array');
        done(err);
      });
  });
  it('should return all parcels with destination oyo', (done) => {
    chai.request(server).get('/api/v1/parcels?location=oyo')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf.at.least(1);
        done(err);
      });
  });
  it('should return an error if the given query cannot be matched', (done) => {
    chai.request(server).get('/api/v1/parcels?location=california')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('No parcel found');
        done(err);
      });
  });
});

// Test for getting a parcel delivery order with ID
describe('GET /parcels/:parcelId', () => {
  it('should return an error if an invalid ID is passed', (done) => {
    chai.request(server).get('/api/v1/parcels/100')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('No parcel with given ID');
        done(err);
      });
  });
  it('should return parcel if Id is valid', (done) => {
    chai.request(server).get('/api/v1/parcels/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});

// Test for updating a parcel with ID
describe('PUT /parcels/:parcelId/update', () => {
  it('should update the parcel with the given data', (done) => {
    const update = {
      location: 'Uyo',
    };
    chai.request(server).put('/api/v1/parcels/1/update')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should return an error if parcel not found', (done) => {
    const update = {
      location: 'Uyo',
    };
    chai.request(server).put('/api/v1/parcels/31/update')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('No parcel with given ID');
        done(err);
      });
  });
});

// Test for canceling a Parcel with ID
describe('PUT /parcels/:parcelID/cancel', () => {
  it('should change parcel status to cancel', (done) => {
    chai.request(server).put('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 409]);
        expect(res.body.message).to.be.oneOf(['Successfully canceled Parcel', 'Already canceled parcel']);
        done(err);
      });
  });
  it('sould return an error if parcel status already canceled', (done) => {
    chai.request(server).put('/api/v1/parcels/3/cancel')
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('Already canceled parcel');
        done(err);
      });
  });
});

// Test for getting all parcels from User with ID
describe('GET /users/:userId/parcels', () => {
  it('should return all parcels orders by a user', (done) => {
    chai.request(server).get('/api/v1/users/90/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf.at.least(1);
        done(err);
      });
  });
  it('should return an error if User not found', (done) => {
    chai.request(server).get('/api/v1/users/101/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.Error).to.equal('No User with this ID');
        done(err);
      });
  });
  it('should return an error if User is found but has no parcel', (done) => {
    chai.request(server).get('/api/v1/users/11/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.Error).to.equal('User with this ID has no parcel');
        done(err);
      });
  });
});
