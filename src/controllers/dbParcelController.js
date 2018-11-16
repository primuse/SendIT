/**
* @fileOverview Controller reusable module with parcel route handler functions.
*
* @exports Parcel
* @requires ParcelModel
* @requires path
*/

import dbModel from '../models/dbmodel';

const model = dbModel;

/**
* @class
  @classdesc Parcel class with handler methods
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

  // /**
  // * Handler Method to get all Parcel orders
  // * @method
  // * @param  {obj} req The HTTP request
  // * @param  {obj} res The HTTP response
  // * @returns {obj}
  // */
  // static getAllParcels(req, res) {
  //   model.read((err, buf) => {
  //     if (!err) {
  //       const parcels = JSON.parse(buf.toString());
  //       const { weight } = req.query;
  //       if (weight === undefined) {
  //         res.send({
  //           status: 200,
  //           data: [parcels],
  //         });
  //       } else {
  //         const filteredParcel = parcels.filter(item => item.weight === weight);
  //         if (filteredParcel.length > 0) {
  //           res.send({
  //             status: 200,
  //             data: [filteredParcel],
  //           });
  //         } else {
  //           res.status(404).send({
  //             status: 404,
  //             data: [{
  //               message: 'No parcel found',
  //             }],
  //           });
  //         }
  //       }
  //     }
  //   });
  // }

  // /**
  // * Hanlder Method to get a parcel order by ID
  // * @method
  // * @param  {obj} req The HTTP request
  // * @param  {obj} res The HTTP response
  // * @returns {obj}
  // */
  // static getParcel(req, res) {
  //   const id = req.params.parcelId;

  //   model.findParcel(id).then((parcel) => {
  //     res.send({
  //       status: 200,
  //       data: [parcel],
  //     });
  //   }).catch((error) => {
  //     res.status(404).send({
  //       status: 404,
  //       data: [{
  //         message: error,
  //       }],
  //     });
  //   });
  // }

  // /**
  // * Handler Method to update a parcel order
  // * @method
  // * @param  {obj} req The HTTP request
  // * @param  {obj} res The HTTP response
  // * @returns {obj}
  // */
  // static updateParcel(req, res) {
  //   const id = req.params.parcelId;
  //   const value = req.body;
  //   model.updateParcel(id, value).then(() => {
  //     res.send({
  //       status: 200,
  //       data: [{
  //         id,
  //         message: 'Sucessfully updated Parcel',
  //       }],
  //     });
  //   }).catch((error) => {
  //     res.status(400).send({
  //       status: 400,
  //       data: [{
  //         id,
  //         message: error,
  //       }],
  //     });
  //   });
  // }

  // /**
  // * Handler Method to cancel a parcel order
  // * @method
  // * @param  {obj} req The HTTP request
  // * @param  {obj} res The HTTP response
  // * @returns {obj}
  // */
  // static cancelParcel(req, res) {
  //   const id = req.params.parcelId;
  //   model.cancelParcel(id).then(() => {
  //     res.send({
  //       status: 200,
  //       data: [{
  //         id,
  //         message: 'Order Canceled',
  //       }],
  //     });
  //   }).catch((error) => {
  //     res.status(400).send({
  //       status: 400,
  //       data: [{
  //         message: error,
  //       }],
  //     });
  //   });
  // }
}

export default Parcel;
