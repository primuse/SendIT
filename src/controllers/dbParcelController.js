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
  * @returns {obj}
  */
  static createParcels(req, res) {
    const {
      parcelName, price, weight, pickupLocation, destination,
      status, receiver, email, phoneNumber, currentLocation,
    } = req.body;
    const userId = req.decoded;
    model.createParcel(parcelName, price, weight, pickupLocation, destination,
      status, receiver, email, phoneNumber, currentLocation, userId).then((rows) => {
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
  * @returns {obj}
  */
  static getAllParcels(req, res) {
    model.getAllParcels().then((rows) => {
      res.send({
        data: rows,
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
  * @returns {obj}
  */
  static getParcel(req, res) {
    const id = req.params.parcelId;
    const userId = req.decoded;
    model.findParcel(id, userId).then((parcel) => {
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
  * @returns {obj}
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
  * @returns {obj}
  */
  static updateParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.destination;
    const userId = req.decoded;
    model.changeDestination(id, value, userId).then(() => {
      res.send({
        data: {
          id,
          message: 'Order updated',
        },
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }

  /**
  * Handler Method to change currentLocation of a parcel order
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  * @returns {obj}
  */
  static locationParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.currentLocation;
    model.changeLocation(id, value).then(() => {
      res.send({
        data: {
          id,
          message: 'Location updated',
        },
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
  * @returns {obj}
  */
  static statusParcel(req, res) {
    const id = req.params.parcelId;
    const value = req.body.status;
    model.changeStatus(id, value).then(() => {
      res.send({
        data: {
          id,
          message: 'Status updated',
        },
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }
}

export default Parcel;
