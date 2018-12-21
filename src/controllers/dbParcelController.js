/**
* @fileOverview Controller reusable module with parcel route handler methods.
*
* @exports Parcel
* @requires dbModel
*/

import dbModel from '../models/dbmodel';

const model = dbModel;

/**
* @class
* @classdesc Parcel class with handler methods
*/
class Parcel {
  /**
  * Handler Method to create new Parcels
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static createParcels(req, res) {
    const {
      parcelName, weight, pickupLocation, destination,
      receiver, email, phoneNumber
    } = req.body;
    const userId = req.decoded;
    model.createParcel(parcelName, weight, pickupLocation, destination,
      receiver, email, phoneNumber, userId).then((rows) => {
      res.status(201).send({
        rows,
      });
    }).catch((error) => {
      res.status(400).send({
        message: error,
      });
    });
  }

  /**
  * Handler Method to get all Parcel orders
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static getAllParcels(req, res) {
    const { offset } = req.query;
    model.getAllParcels(offset).then((rows) => {
      res.send({
        message: 'All Parcels',
        data: rows,
        pages: rows.pages,
      });
    }).catch((error) => {
      res.status(404)
        .send(error);
    });
  }

  /**
  * Hanlder Method to get a parcel order by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static getParcel(req, res) {
    const id = req.params.parcelId;
    const userId = req.decoded;
    const { role } = req;
    model.findParcel(id, userId, role).then((parcel) => {
      res.send({
        data: parcel,
      });
    }).catch((error) => {
      res.status(404)
        .send(error);
    });
  }

  /**
  * Handler Method to cancel a parcel order
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static cancelParcel(req, res) {
    const id = req.params.parcelId;
    const userId = req.decoded;
    model.cancelParcel(id, userId).then(() => {
      res.send({
        data: {
          id,
          message: 'Order Canceled',
        },
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }

  /**
  * Handler Method to update a parcel order destination
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static updateParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.destination;
    const userId = req.decoded;
    model.changeDestination(id, value, userId).then((data) => {
      res.send({
        message: 'Order updated',
        data
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }

  /**
  * Hanlder Method to change a user's password
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static updatePassword(req, res) {
    const { userId } = req.params;
    const { password } = req.body;
    model.updatePassword(userId, password).then((data) => {
      res.status(200).send({
        message: 'Password Updated',
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }

  /**
  * Handler Method to change currentLocation of a parcel order
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static locationParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.currentLocation;
    model.changeLocation(id, value).then((data) => {
      res.send({
        message: 'Location updated',
        data
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }

  /**
  * Handler Method to change status of a parcel order
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static statusParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.status;
    model.changeStatus(id, value).then((data) => {
      res.send({
        message: `Status has been updated to ${value}`,
        data
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }

  /**
  * Handler Method to request password reset email
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static sendResetEmail(req, res) {
    const { email } = req.body;
    model.sendResetEmail(email).then((data) => {
      res.send({
        message: 'Email has been sent',
        data
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }
}

export default Parcel;
