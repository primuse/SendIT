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
    model.createParcel(req).then(() => {
      res.status(201).send({
        status: 201,
        data: [{
          message: 'Order Created',
        }],
      });
    }).catch((error) => {
      res.status(400).send({
        status: 400,
        data: [{
          message: error,
        }],
      });
    });
  }
}

export default Parcel;
