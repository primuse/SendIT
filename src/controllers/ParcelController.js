import ParcelModel from '../models/ParcelModel';

const model = ParcelModel;

class Parcel {
  // Create new Parcels
  static createParcels(req, res) {
    const myData = req.body;
    model.createParcel(myData).then(() => {
      res.status(201).send({ message: 'Successfully created Parcel.' });
    }).catch((err) => {
      res.status(409).send({ err });
      // {
      //   message: 'Parcel with this ID already exists',
      // });
    });
  }

  // Get all Parcels
  static getAllParcels(req, res) {
    model.getAllParcels().then((parcels) => {
      const { location } = req.query;
      console.log(req.query);
      if (location === undefined) {
        res.send(parcels);
      }
    }).catch((err) => {
      res.status(404).send({
        message: err.message,
      });
    });
  }

  // To get a parcel delivery order with ID
  static getParcel(req, res) {
    const id = req.params.parcelId;

    model.findParcel(id).then((parcel) => {
      res.send(parcel);
    }).catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
  }
}

export default Parcel;
