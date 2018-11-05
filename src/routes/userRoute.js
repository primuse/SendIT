import express from 'express';
import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

const router = express.Router();

// To create new parcels
router.post('/parcels', (req, res) => {
  const myData = req.body;
  model.createParcel(myData).then(() => {
    res.send('Successfully Written to File.');
  }).catch((match) => {
    res.send({
      messgae: `Parcel with ID ${match.parcelId} already exists`,
    });
  });
});


// To get all parcel delivery orders
router.get('/parcels', (req, res) => {
  model.read((err, buf) => {
    if (!err) {
      res.send(JSON.parse(buf.toString()));
    }
  });
});

// To get a parcel delivery order with ID
router.get('/parcels/:parcelId', (req, res) => {
  const id = req.params.parcelId;

  model.findParcel(id).then((parcel) => {
    res.send(parcel);
  }).catch((err) => {
    console.log(err);
    res.status(404);
    res.send({
      message: `Parcel with ID ${id} was not found`,
    });
  });
});

// To cancel a Parcel with ID
router.put('/parcels/:parcelId/cancel', (req, res) => {
  const id = req.params.parcelId;
  model.cancelParcel(id).then(() => {
    res.send('successful');
  }).catch((error) => {
    console.log(error.message);
    res.send({
      message: error.message,
    });
  });
});

// To get all parcels from User with ID
router.get('/users/:userId/parcels', (req, res) => {
  res.send('tiku');
});
export default router;
