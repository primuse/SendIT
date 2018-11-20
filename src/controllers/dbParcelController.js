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
    model.createParcel(req).then((rows) => {
      res.status(201).send({
        status: 201,
        data: [{
          id: rows.id,
          message: 'Order Created',
        }],
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
        status: 200,
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
    model.findParcel(id).then((parcel) => {
      res.send({
        status: 200,
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
    model.cancelParcel(id).then(() => {
      res.send({
        status: 200,
        data: [{
          id,
          message: 'Order Canceled',
        }],
      });
    }).catch((error) => {
      res.status(400)
        .send(error);
    });
  }
}

export default Parcel;
