import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

class User {
  // To get all parcels from user with ID
  static getUserParcel(req, res) {
    const id = req.params.userId;

    model.findUserParcel(id).then((parcel) => {
      res.send(parcel);
    }).catch((error) => {
      console.log(error);
      res.status(404).send({
        Error: error,
      });
    });
  }
}

export default User;
