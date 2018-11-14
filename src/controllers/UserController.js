/**
* @fileOverview Controller reusable module with user route handler functions.
*
* @exports User
* @requires ParcelModel
* @requires path
*/

import path from 'path';
import ParcelModel from '../models/ParcelModel';

const model = new ParcelModel(path.join(__dirname, '../files/parcels.json'));

/**
* @class
  @classdesc User class with handler methods.
*/
class User {
  /**
  * Method to get all Parcel orders by a particular user
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  * @returns {obj}
  */
  static getUserParcel(req, res) {
    const id = req.params.userId;
    model.findUserParcel(id).then((parcel) => {
      res.send({
        status: 200,
        data: [parcel],
      });
    }).catch((error) => {
      res.status(404).send({
        status: 404,
        data: [{
          message: error,
        }],
      });
    });
  }
}

export default User;
