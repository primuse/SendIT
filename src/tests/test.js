import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

// Test for creating new parcels with DB
describe('POST /parcels', () => {
  it('should create a new parcel in the DB', (done) => {
    const parcel = {
      parcel_name: 'Shoe',
      placed_by: 2,
      price: 10000,
      weight: 3,
      pickup_location: 'Owerri',
      destination: 'Abuja',
      status: 'Created',
      receiver: 'Tiku Okoye',
      email: 'okoyetiku@gmail.com',
      phone_number: '08129814330',
      current_location: 'Lagos',
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

// Test for creating new parcels with dummy Json file
describe('POST /parcels', () => {
  it('should return an error if inputed ID already exists', (done) => {
    const parcel = {
      parcelId: '1',
      placedBy: '1',
      weight: '3',
      weightMetric: 'kg',
      sentOn: '12-11-2018',
      deliveredOn: 'null',
      status: 'Canceled',
      from: '14 Asobruewu Street',
      to: 'Jibowu, Lagos',
      currentLocation: 'Ajah, Lagos',
      location: 'Uyo',
    };
    chai.request(server).post('/api/v1/parcels')
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data[0].message).to.equal('Parcel with this ID already exists');
        expect(res.body.data[0].id).to.equal(parcel.parcelId);
        done(err);
      });
  });
  it('should create a new parcel', (done) => {
    const parcel = {
      parcelId: '3',
      placedBy: '1',
      weight: '3',
      weightMetric: 'kg',
      sentOn: '12-11-2018',
      deliveredOn: 'null',
      status: 'Canceled',
      from: '14 Asobruewu Street',
      to: 'Jibowu, Lagos',
      currentLocation: 'Ajah, Lagos',
      location: 'Uyo',
    };
    chai.request(server).post('/api/v1/parcels')
      .send(parcel)
      .end((err, res) => {
        expect(res.status).to.be.oneOf([400, 201]);
        expect(res.body.data[0].message).to.be.oneOf(['Parcel with this ID already exists', 'Order created']);
        expect(res.body.data[0].id).to.equal(parcel.parcelId);
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
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return all parcels with destination oyo', (done) => {
    chai.request(server).get('/api/v1/parcels?weight=3')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
  it('should return an error if the given query cannot be matched', (done) => {
    chai.request(server).get('/api/v1/parcels?weight=10')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.data[0].message).to.equal('No parcel found');
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
        expect(res.body.data[0].message).to.equal('No parcel with given ID');
        done(err);
      });
  });
  it('should return parcel if Id is valid', (done) => {
    chai.request(server).get('/api/v1/parcels/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});

// Test for updating a parcel with ID
describe('PUT /parcels/:parcelId/update', () => {
  it('should update the parcel with the given data', (done) => {
    const update = {
      weight: '5',
    };
    chai.request(server).put('/api/v1/parcels/1/update')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data[0].message).to.equal('Sucessfully updated Parcel');
        done(err);
      });
  });
  it('should return an error if parcel not found', (done) => {
    const update = {
      weight: '9',
    };
    chai.request(server).put('/api/v1/parcels/31/update')
      .send(update)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body.data[0].message).to.equal('No parcel with given ID');
        done(err);
      });
  });
});

// Test for canceling a Parcel with ID
describe('PUT /parcels/:parcelID/cancel', () => {
  it('should change parcel status to canceled', (done) => {
    chai.request(server).put('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 400]);
        expect(res.body.data[0].message).to.be.oneOf(['Successfully canceled Parcel', 'Already canceled parcel']);
        done(err);
      });
  });
  it('should return an error if parcel status already canceled', (done) => {
    chai.request(server).put('/api/v1/parcels/3/cancel')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data[0].message).to.equal('Already canceled parcel');
        done(err);
      });
  });
});

// Test for getting all parcels from User with ID
describe('GET /users/:userId/parcels', () => {
  it('should return all parcels orders by a user', (done) => {
    chai.request(server).get('/api/v1/users/1/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.lengthOf.at.least(1);
        expect(res.body.status).to.equal(200);
        done(err);
      });
  });
  it('should return an error if User not found', (done) => {
    chai.request(server).get('/api/v1/users/101/parcels')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.data[0].message).to.equal('No User with this ID');
        done(err);
      });
  });
});
