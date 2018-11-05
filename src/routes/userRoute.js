import express from 'express';
import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

const router = express.Router();

// To create new parcels
router.post('/parcels', (req, res) => {
  const myData = req.body;
  model.createParcel(myData).then(() => {
    res.status(201);
    res.send('Successfully Written to File.');
  }).catch((match) => {
    res.status(409);
    res.send({
      Error: `Parcel with ID ${match.parcelId} already exists`,
    });
  });
});


// To get all parcel delivery orders
router.get('/parcels', (req, res) => {
  model.read((err, buf) => {
    if (!err) {
      const parcels = JSON.parse(buf.toString());
      const { location } = req.query;
      console.log(req.query);
      if (location === undefined) {
        res.send(parcels);
      } else {
        const filteredParcel = parcels.filter((e) => {
          return e.location !== undefined && e.location.toLowerCase() === location.toLowerCase();
        });
        if (filteredParcel.length > 0) {
          res.send(filteredParcel);
        } else {
          res.status(404);
          res.send({ Error: 'No parcel found' });
        }
      }
    }
  });
});

// To get a parcel delivery order with ID
router.get('/parcels/:parcelId', (req, res) => {
  const id = req.params.parcelId;

  model.findParcel(id).then((parcel) => {
    res.send(parcel);
  }).catch((error) => {
    console.log(error);
    res.status(404);
    res.send({
      Error: error,
    });
  });
});

// To update a parcel with ID
router.put('/parcels/:parcelId/update', (req, res) => {
  const id = req.params.parcelId;
  const value = req.body;
  model.updateParcel(id, value).then(() => {
    console.log('done');
    res.send(`Sucessfully updated ${Object.keys(value)}`);
  }).catch((error) => {
    res.status(409);
    res.send({
      Error: error,
    });
  });
});

// To cancel a Parcel with ID
router.put('/parcels/:parcelId/cancel', (req, res) => {
  const id = req.params.parcelId;
  model.cancelParcel(id).then(() => {
    res.send('successful');
  }).catch((error) => {
    res.status(409);
    res.send({
      Error: error,
    });
  });
});

// To get all parcels from User with ID
router.get('/users/:userId/parcels', (req, res) => {
  const id = req.params.userId;

  model.findUserParcel(id).then((parcel) => {
    res.send({ parcels: parcel });
  }).catch((error) => {
    console.log(error);
    res.status(404);
    res.send({
      Error: error.message,
    });
  });
});
export default router;
