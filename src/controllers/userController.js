/**
* @fileOverview Controller reusable module with user route handler methods.
*
* @exports User
* @requires userModel
*/

import userModel from '../models/usermodel';

const model = userModel;

/**
* @class
* @classdesc User class with handler methods
*/
class User {
  /**
  * Handler Method to create new Users
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  * @returns {obj}
  */
  static createUsers(req, res) {
    model.createUser(req).then((rows) => {
      res.status(201).send({
        status: 201,
        data: [{
          id: rows.id,
          message: 'User Created',
        }],
      });
    }).catch((error) => {
      res.status(400).send({
        message: error,
      });
    });
  }
}
export default User;
