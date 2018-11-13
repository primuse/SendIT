import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

class Parcel {
  // Create new Parcels
  static createParcels(req, res) {
    const myData = req.body;
    const id = req.body.parcelId;
    model.createParcel(myData).then(() => {
      res.status(201).send({
        status: 201,
        data: [{
          id: id,
          message: 'Order Created',
        }],
      });
    }).catch(() => {
      res.status(409).send({
        status: 409,
        data: [{
          id: id,
          message: 'Parcel with this ID already exists',
        }],
      });
    });
  }

  // Get all Parcels
  static getAllParcels(req, res) {
    model.read((err, buf) => {
      if (!err) {
        const parcels = JSON.parse(buf.toString());
        const { location } = req.query;
        console.log(req.query);
        if (location === undefined) {
          res.send({
            status: 200,
            data: parcels,
          });
        } else {
          const filteredParcel = parcels.filter((e) => {
            return e.location !== undefined && e.location.toLowerCase() === location.toLowerCase();
          });
          if (filteredParcel.length > 0) {
            res.send(filteredParcel);
          } else {
            res.status(404).send({
              status: 404,
              data: [{
                message: 'No parcel found',
              }],
            });
          }
        }
      }
    });
  }

  // To get a parcel delivery order with ID
  static getParcel(req, res) {
    const id = req.params.parcelId;

    model.findParcel(id).then((parcel) => {
      res.send({
        status: 200,
        data: [parcel],
      });
    }).catch((error) => {
      console.log(error);
      res.status(404).send({
        status: 404,
        data: [{
          message: error,
        }],
      });
    });
  }

  // To update a parcel with ID
  static updateParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body;
    model.updateParcel(id, value).then(() => {
      res.send({ message: 'Sucessfully updated Parcel' });
    }).catch((error) => {
      res.status(409).send({
        message: error,
      });
    });
  }

  // To cancel a parcel with ID
  static cancelParcel(req, res) {
    const id = req.params.parcelId;
    model.cancelParcel(id).then(() => {
      res.send({
        status: 200,
        data: [{
          id: id,
          message: 'Order Canceled',
        }],
      });
    }).catch((error) => {
      res.status(409).send({
        status: 409,
        data: [{
          message: error,
        }],
      });
    });
  }
}

export default Parcel;
