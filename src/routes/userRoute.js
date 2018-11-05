import express from 'express';
import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

const router = express.Router();

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

  model.getParcel((id), (err, parcel) => {
    if (!err) {
      console.log(parcel);
    }
  });

  // res.status(404);
  // res.send({
  //   message: 'Nothing Found',
  // });
});

router.get('/users/:userId/parcels', (req, res) => {
  res.send('tiku');
});

router.post('/parcels', (req, res) => {
  const myData = req.body;
  // console.log(myData);
  model.write(myData, (err) => {
    if (!err) {
      res.send('Successfully Written to File.');
    }
  });
});

router.put('/parcels/:parcelId/cancel', (req, res) => {
  res.send('tiku');
});

export default router;
