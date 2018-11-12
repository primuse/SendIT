import UserModel from '../models/UserModel';

const model = UserModel;

class User {
  // Create new User
  static createUser(req, res) {
    const myData = req.body;
    model.createUser(myData).then(() => {
      res.status(201).send({ message: 'Successfully created User.' });
    }).catch((err) => {
      res.status(409).send({ err });
    });
  }

  // Get all Users
  static getAllUsers(req, res) {
    model.getAllUsers().then((users) => {
      const { location } = req.query;
      console.log(req.query);
      if (location === undefined) {
        res.send(users);
      }
    }).catch((err) => {
      res.status(404).send({
        message: err.message,
      });
    });
  }

  // To get a user with ID
  static getUser(req, res) {
    const id = req.params.userId;

    model.findUser(id).then((user) => {
      res.send(user);
    }).catch((error) => {
      res.status(404).send({
        message: error.message,
      });
    });
  }

  // To get all parcels from user with ID
  static getUserParcel(req, res) {
    const id = req.params.userId;

    model.findUserParcel(id).then((parcels) => {
      res.send(parcels);
    }).catch((error) => {
      console.log(error);
      res.status(404).send({
        Error: error.message,
      });
    });
  }

  // To update a parcel with ID
  static updateParcel(req, res) {
    const { parcelId } = req.params;
    const value = req.body;
    model.updateParcel(parcelId, value).then(() => {
      res.send({ message: 'Sucessfully updated Parcel' });
    }).catch((error) => {
      res.status(404).send({
        Error: error.message,
      });
    });
  }

  // To cancel a parcel with ID
  static cancelParcel(req, res) {
    const id = req.params.parcelId;
    model.cancelParcel(id).then(() => {
      res.send({ message: 'Successfully canceled Parcel' });
    }).catch((error) => {
      res.status(404).send({
        message: error,
      });
    });
  }
}

export default User;
